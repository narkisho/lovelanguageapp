import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

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
    const { preferences } = await req.json()
    console.log('Received preferences:', preferences)

    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set')
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Generate a relationship-building activity based on these preferences:
            - Relationship Level: ${preferences.relationship_level}
            - Duration: ${preferences.activity_duration} minutes
            - Location: ${preferences.location}
            
            Return as JSON with format: {
              title: string,
              description: string,
              category: string,
              stage: string,
              duration: number,
              difficulty_level: number (1-5),
              location: string
            }
            
            Make it engaging, appropriate for the relationship level, and focused on building emotional connection.`
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Anthropic API error:', errorData)
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Anthropic response:', data)

    const activity = JSON.parse(data.content[0].text)
    console.log('Parsed activity:', activity)

    return new Response(JSON.stringify(activity), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-closer-activity:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate activity' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})