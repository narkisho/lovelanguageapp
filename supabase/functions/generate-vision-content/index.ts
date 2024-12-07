import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Anthropic } from "https://esm.sh/@anthropic-ai/sdk@0.4.3";

const anthropic = new Anthropic({
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
    const { prompt } = await req.json()
    console.log('Received prompt:', prompt);

    if (!prompt) {
      throw new Error('No prompt provided');
    }

    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: `As a relationship coach, help enhance and expand upon this relationship vision/goal. Make it more specific, actionable, and inspiring while maintaining the original intent: "${prompt}". Focus on practical steps and measurable outcomes.`
      }]
    });

    console.log('AI response received');
    const suggestion = message.content[0].text;

    return new Response(
      JSON.stringify({ suggestion }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    console.error('Error in generate-vision-content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      },
    )
  }
})