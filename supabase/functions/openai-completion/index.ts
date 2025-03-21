
// Follow this setup guide to integrate the Deno runtime:
// https://docs.supabase.com/guides/functions/deno-runtime
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// This function handles OpenAI API calls securely from the backend
serve(async (req) => {
  try {
    const { prompt, model, temperature, max_tokens } = await req.json();
    
    // Get the OpenAI API key from environment variables
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        prompt: prompt,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await openAIResponse.json();
    const text = data.choices?.[0]?.text || '';
    
    return new Response(
      JSON.stringify({ text, success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
