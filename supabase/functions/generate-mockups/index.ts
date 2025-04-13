
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle requests to the edge function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the OpenAI API key from environment variables
    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }
    
    // Parse request body
    const body = await req.json();
    const { imageBase64, mockupStyle, prompt } = body;
    
    if (!imageBase64 || !mockupStyle) {
      throw new Error("Missing required parameters: imageBase64 and mockupStyle");
    }
    
    // Prepare the prompt for OpenAI
    const basePrompt = prompt || "Create a professional mockup of this image";
    const fullPrompt = `${basePrompt} in a ${mockupStyle} style. The mockup should be clean, professional, and showcase the image in an appealing context. Do not alter the main image content, just place it in a mockup context.`;
    
    console.log(`Generating mockup in ${mockupStyle} style...`);
    
    // Call OpenAI API to generate the mockup
    const openAiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: fullPrompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      })
    });
    
    if (!openAiResponse.ok) {
      const error = await openAiResponse.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
    }
    
    const data = await openAiResponse.json();
    
    // Return the generated mockup URL
    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: data.data[0].url,
        createdAt: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error generating mockup:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
