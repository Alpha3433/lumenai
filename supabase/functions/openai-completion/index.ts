
// Follow this setup guide to integrate the Deno runtime:
// https://docs.supabase.com/guides/functions/deno-runtime
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Start timing the edge function execution
  const startTime = Date.now();
  console.log(`🔍 [DIAGNOSIS] Edge function 'openai-completion' started at ${new Date().toISOString()}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log(`🔍 [DIAGNOSIS] Parsing request body`);
    const { prompt, model, temperature, max_tokens, systemPrompt, forceLiveResponse, isAuthenticated } = await req.json();
    
    // Log request parameters
    console.log(`🔍 [DIAGNOSIS] Request parameters:
      - Model: ${model || 'Not specified (will use default)'}
      - Prompt length: ${prompt?.length || 0} chars
      - System prompt length: ${systemPrompt?.length || 0} chars
      - Temperature: ${temperature || 0.7}
      - Max tokens: ${max_tokens || 2000}
      - Force live response: ${forceLiveResponse ? 'yes' : 'no'}
      - Is authenticated: ${isAuthenticated ? 'yes' : 'no'}
    `);
    
    // Get the OpenAI API key from environment variables
    const apiKey = "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";
    
    if (!apiKey) {
      console.error('❌ [DIAGNOSIS] OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!prompt) {
      console.error('❌ [DIAGNOSIS] Prompt is required but was not provided');
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Use the requested model or default to gpt-4o-mini
    const useModel = model || 'gpt-4o-mini';
    
    console.log(`🔍 [DIAGNOSIS] Calling OpenAI API with model: ${useModel}`);
    console.log(`🔍 [DIAGNOSIS] Prompt length: ${prompt.length} characters`);
    console.log(`🔍 [DIAGNOSIS] Force live response: ${forceLiveResponse ? 'yes' : 'no'}`);
    
    // Create default system message if none provided
    const defaultSystemPrompt = 'You are a helpful business planning assistant that provides thorough, accurate, and detailed responses.';
    
    // Increased timeout from 60s to 75s - pushing to the limit
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error(`❌ [DIAGNOSIS] Request timeout - aborting after 75 seconds`);
      abortController.abort('Request timeout after 75 seconds');
    }, 75000);
    
    console.time('openai_api_call');
    console.log(`🔍 [DIAGNOSIS] Starting OpenAI API call at ${new Date().toISOString()}`);
    
    // Print the detailed model params for diagnostics
    console.log(`🔍 [DIAGNOSIS] OpenAI request parameters:
      - Model: ${useModel}
      - Temperature: ${temperature || 0.7}
      - Max tokens: ${max_tokens || 2000}
      - System prompt (first 50 chars): ${(systemPrompt || defaultSystemPrompt).substring(0, 50)}...
    `);
    
    // Progress check logging
    const progressCheckId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      console.log(`🔍 [DIAGNOSIS] OpenAI call in progress - ${Math.floor(elapsed/1000)}s elapsed`);
    }, 10000);
    
    try {
      // Call OpenAI API with provided parameters and abort controller
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v1'  // Add latest OpenAI beta features
        },
        body: JSON.stringify({
          model: useModel,
          messages: [
            { role: 'system', content: systemPrompt || defaultSystemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 2000,
        }),
        signal: abortController.signal
      });
      
      // Clear the interval and timeout since we got a response
      clearInterval(progressCheckId);
      clearTimeout(timeoutId);
      
      console.timeEnd('openai_api_call');
      const apiCallDuration = Date.now() - startTime;
      console.log(`🔍 [DIAGNOSIS] OpenAI API response received after ${apiCallDuration}ms`);
      
      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error('❌ [DIAGNOSIS] OpenAI API error:', errorData);
        console.error('❌ [DIAGNOSIS] Status:', openAIResponse.status, openAIResponse.statusText);
        
        // Check for specific error types
        if (openAIResponse.status === 429) {
          console.error('❌ [DIAGNOSIS] Rate limit exceeded or quota reached');
        } else if (openAIResponse.status === 502) {
          console.error('❌ [DIAGNOSIS] Bad gateway - OpenAI API may be having issues');
        } else if (openAIResponse.status >= 500) {
          console.error('❌ [DIAGNOSIS] OpenAI server error');
        } else if (openAIResponse.status === 401) {
          console.error('❌ [DIAGNOSIS] Authentication error - check API key');
        }
        
        throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
      }
      
      // Parse the response
      console.log(`🔍 [DIAGNOSIS] Parsing OpenAI response`);
      const data = await openAIResponse.json();
      const text = data.choices?.[0]?.message?.content || '';
      
      console.log(`🔍 [DIAGNOSIS] OpenAI response received, length: ${text.length} characters`);
      console.log(`🔍 [DIAGNOSIS] Total edge function execution time: ${Date.now() - startTime}ms`);
      
      return new Response(
        JSON.stringify({ text: text, success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (fetchError) {
      clearInterval(progressCheckId);
      clearTimeout(timeoutId);
      throw fetchError; // Rethrow to be caught by outer try/catch
    }
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`❌ [DIAGNOSIS] Error in openai-completion function after ${executionTime}ms:`, error);
    
    // Check if the error was an abort error
    let errorMessage = error.message || 'Unknown error';
    let errorStatus = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timed out after 75 seconds. You should try using a smaller business description or the simpler AI model.';
      errorStatus = 504; // Gateway Timeout
      console.error(`❌ [DIAGNOSIS] Request aborted: ${errorMessage}`);
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: errorStatus }
    );
  }
});
