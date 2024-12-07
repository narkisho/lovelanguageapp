import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID')
const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET')
const PAYPAL_API_URL = Deno.env.get('PAYPAL_MODE') === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, subscriptionId, userId } = await req.json()
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get PayPal access token
    const tokenResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    })
    const { access_token } = await tokenResponse.json()

    if (action === 'create_subscription') {
      // Create PayPal subscription
      const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          plan_id: 'P-XXXX', // Replace with your PayPal plan ID
          subscriber: {
            name: {
              given_name: 'SparkRevive',
              surname: 'User',
            },
          },
          application_context: {
            return_url: `${req.headers.get('origin')}/dashboard?success=true`,
            cancel_url: `${req.headers.get('origin')}/dashboard?success=false`,
          },
        }),
      })

      const data = await response.json()
      console.log('PayPal subscription created:', data)

      // Create subscription record in Supabase
      const { error: dbError } = await supabaseClient
        .from('subscriptions')
        .insert({
          user_id: userId,
          paypal_subscription_id: data.id,
          status: 'pending',
          plan_type: 'premium',
        })

      if (dbError) throw dbError

      return new Response(
        JSON.stringify({ url: data.links.find((link: any) => link.rel === 'approve').href }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'verify_subscription') {
      // Verify subscription with PayPal
      const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })

      const data = await response.json()
      console.log('PayPal subscription verified:', data)

      // Update subscription status in Supabase
      const { error: dbError } = await supabaseClient
        .from('subscriptions')
        .update({
          status: data.status === 'ACTIVE' ? 'active' : 'inactive',
          current_period_start: new Date(data.start_time),
          current_period_end: new Date(data.billing_info.next_billing_time),
        })
        .eq('paypal_subscription_id', subscriptionId)

      if (dbError) throw dbError

      return new Response(
        JSON.stringify({ status: data.status }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})