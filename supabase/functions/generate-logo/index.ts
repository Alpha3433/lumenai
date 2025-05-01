
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      brandName, 
      adjectives, 
      audience, 
      industry, 
      emotions, 
      logoStyle, 
      colorPreference, 
      usageContext, 
      inspiration 
    } = await req.json();
    
    if (!brandName) {
      return new Response(
        JSON.stringify({ error: 'Brand name is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build dynamic prompt using provided information
    const enhancedPrompt = `Create a high-quality logo for a brand called ${brandName}. The brand's core identity can be described as ${adjectives || 'modern, professional'}.

The target audience is ${audience || 'general consumers'}, and the brand operates in the ${industry || 'business'} space.

The logo should evoke ${emotions || 'trust and reliability'}.

The preferred style is ${logoStyle || 'a balanced combination of symbol and text'}, and the visual direction should take inspiration from ${inspiration || 'contemporary design trends'}.

Please use a ${colorPreference || 'professional color palette that conveys trust'}.

The logo should work well on both light and dark backgrounds, and be versatile enough for ${usageContext || 'website headers, social media, and business materials'}.

Create a clean, professional, high-quality logo design with good contrast that looks great at different sizes.`;
    
    console.log('Prompt:', enhancedPrompt);
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard" // Changed from "hd" to "standard" which is a valid value
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'Error generating image');
    }

    return new Response(
      JSON.stringify({ 
        imageUrl: data.data[0].url,
        prompt: enhancedPrompt,
        brandName: brandName 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating logo:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate logo' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
