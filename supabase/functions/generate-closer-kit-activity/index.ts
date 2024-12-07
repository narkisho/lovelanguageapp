import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { ChatAnthropic } from "npm:@anthropic-ai/sdk"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!Deno.env.get('ANTHROPIC_API_KEY')) {
      console.error('ANTHROPIC_API_KEY is not set');
      throw new Error('ANTHROPIC_API_KEY is not set')
    }

    const anthropic = new ChatAnthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
    });

    const { type, answers } = await req.json()
    console.log('Generating activity with preferences:', answers)

    const relationshipStage = answers?.relationshipStage || 'any'
    const intimacyLevel = answers?.intimacyLevel || 'moderate'
    const activityDuration = answers?.duration || '30-60 minutes'
    const location = answers?.location || 'indoor'

    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate an intimate activity for couples with these preferences:
          - Relationship Stage: ${relationshipStage}
          - Intimacy Level: ${intimacyLevel}
          - Duration: ${activityDuration}
          - Location: ${location}
          
          Format as JSON with fields: 
          - title (string, max 100 chars)
          - description (string, max 500 chars)
          - category (one of: emotional, physical, communication, sensory, creative)
          - stage (one of: discovery, deepening, commitment)
          
          Keep it tasteful and respectful.`
      }]
    });

    console.log('AI Response:', message.content[0].text);

    const generatedContent = JSON.parse(message.content[0].text);
    console.log('Parsed activity:', generatedContent);

    return new Response(
      JSON.stringify(generatedContent),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      },
    )
  }
})