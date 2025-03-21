
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

interface RequestBody {
  prompt: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

serve(async (req) => {
  try {
    // Get the request body
    const { prompt, model, temperature = 0.7, maxTokens = 500 } = await req.json() as RequestBody;
    
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    
    // Get the OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
    
    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model,
        prompt,
        temperature,
        max_tokens: maxTokens,
      }),
    });
    
    const data = await openaiResponse.json();
    
    if (!openaiResponse.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message || "Error calling OpenAI API" }),
        { headers: { "Content-Type": "application/json" }, status: openaiResponse.status }
      );
    }
    
    // Return the OpenAI response
    return new Response(
      JSON.stringify({ 
        text: data.choices[0].text,
        success: true
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
