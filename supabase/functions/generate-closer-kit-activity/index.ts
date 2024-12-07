import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { ChatAnthropic } from "npm:@anthropic-ai/sdk"

const anthropic = new ChatAnthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
});

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
    const { type } = await req.json()
    console.log('Generating activity of type:', type)

    const stages = ['discovery', 'deepening', 'commitment']
    const categories = ['emotional', 'physical', 'communication', 'sensory', 'creative']
    
    const stage = stages[Math.floor(Math.random() * stages.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]

    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate an intimate activity for couples in the ${stage} stage of their relationship, focusing on ${category} connection. Include a title and detailed description. Format as JSON with fields: title, description, category, stage. Keep it tasteful and respectful.`
      }]
    });

    const generatedContent = JSON.parse(message.content[0].text);
    console.log('Generated activity:', generatedContent)

    return new Response(
      JSON.stringify(generatedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      },
    )
  }
})