
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planType: "entrepreneur" | "founder" | "partner";
  mode: "subscription" | "payment";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const { planType, mode }: CheckoutRequest = await req.json();
    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    // Configure plan details based on selected plan
    let lineItems;
    let trialPeriodDays = undefined;
    
    switch (planType) {
      case "entrepreneur":
        lineItems = [{
          price_data: {
            currency: "usd",
            product_data: { name: "Entrepreneur Plan" },
            unit_amount: 2999, // $29.99
            recurring: mode === "subscription" ? { interval: "month" } : undefined,
          },
          quantity: 1,
        }];
        break;
      case "founder":
        lineItems = [{
          price_data: {
            currency: "usd",
            product_data: { name: "Founder Plan" },
            unit_amount: 5499, // $54.99
            recurring: mode === "subscription" ? { interval: "month" } : undefined,
          },
          quantity: 1,
        }];
        break;
      case "partner":
        // Revenue sharing model - represented as a free trial initially
        lineItems = [{
          price_data: {
            currency: "usd",
            product_data: { name: "Partner Plan" },
            unit_amount: 29900, // $299 monthly cap
            recurring: { interval: "month" },
          },
          quantity: 1,
        }];
        trialPeriodDays = 30; // Start with a free month for the partner plan
        break;
      default:
        return new Response(JSON.stringify({ error: "Invalid plan type" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      mode: mode === "subscription" ? "subscription" : "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${planType}`,
      cancel_url: `${origin}/payment-canceled`,
      subscription_data: trialPeriodDays ? { trial_period_days: trialPeriodDays } : undefined,
      metadata: {
        user_id: user.id,
        plan_type: planType,
      },
    });

    // Return the session URL for the frontend to redirect to
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
