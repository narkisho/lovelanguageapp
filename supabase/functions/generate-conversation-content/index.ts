import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type } = await req.json()
    console.log('Generating content type:', type)

    let prompt = ''
    if (type === 'topic') {
      prompt = 'Generate a conversation topic for couples with 3 discussion questions. Return as JSON with format: { title: string, questions: string[] }. Make it engaging and meaningful for relationship growth.'
    } else if (type === 'exercise') {
      prompt = 'Generate a deep connection exercise for couples. Return as JSON with format: { title: string, description: string, duration: string }. Make it meaningful and interactive.'
    } else {
      throw new Error('Invalid content type')
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
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      console.error('Anthropic API error:', await response.text())
      throw new Error('Failed to generate content')
    }

    const data = await response.json()
    console.log('Generated content:', data)
    
    const content = JSON.parse(data.content[0].text)
    console.log('Parsed content:', content)

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate content' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})