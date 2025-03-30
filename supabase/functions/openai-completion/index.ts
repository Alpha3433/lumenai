
// Follow this setup guide to integrate the Deno runtime:
// https://docs.supabase.com/guides/functions/deno-runtime
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This function handles OpenAI API calls securely from the backend
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { prompt, model, temperature, max_tokens, isAuthenticated, systemPrompt, forceLiveResponse } = await req.json();
    
    // Get the OpenAI API key from environment variables
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Use the requested model or default to gpt-4o
    const useModel = model || 'gpt-4o';
    
    console.log(`Calling OpenAI API with model: ${useModel}`);
    console.log(`API Key available: ${apiKey ? 'Yes' : 'No'}`);
    console.log(`Force live response: ${forceLiveResponse ? 'Yes' : 'No'}`);
    
    // Create default system message if none provided
    const defaultSystemPrompt = 'You are a helpful business planning assistant that provides thorough, accurate, and detailed responses.';
    
    // Call OpenAI API with provided parameters
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: useModel,
        messages: [
          { role: 'system', content: systemPrompt || defaultSystemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 2000,
      })
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await openAIResponse.json();
    const text = data.choices?.[0]?.message?.content || '';
    
    console.log(`OpenAI response length: ${text.length} characters`);
    
    return new Response(
      JSON.stringify({ text: text, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in openai-completion function:', error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
