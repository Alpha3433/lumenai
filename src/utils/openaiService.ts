
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestParams {
  prompt: string;
  model: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  isAuthenticated?: boolean;
  forceLiveResponse?: boolean;
}

interface OpenAIResponse {
  text: string;
  success: boolean;
  error?: string;
}

export const callOpenAI = async (params: OpenAIRequestParams): Promise<OpenAIResponse> => {
  try {
    const startTime = Date.now();
    console.log(`🔍 [DIAGNOSIS] OpenAI call started at ${new Date().toISOString()}`);
    console.log(`🔍 [DIAGNOSIS] Calling OpenAI with model: ${params.model}, prompt length: ${params.prompt.length} chars`);
    
    if (params.prompt.length > 10000) {
      console.warn(`⚠️ [DIAGNOSIS] Warning: Large prompt (${params.prompt.length} chars) may cause timeouts`);
    }
    
    // Add additional logging info
    console.log(`🔍 [DIAGNOSIS] Request details:
      - Model: ${params.model}
      - Temperature: ${params.temperature || 0.7}
      - Max tokens: ${params.maxTokens || 2000}
      - System prompt length: ${params.systemPrompt?.length || 0} chars
      - Is authenticated: ${params.isAuthenticated ? 'yes' : 'no'}
      - Force live response: ${params.forceLiveResponse ? 'yes' : 'no'}
    `);
    
    // Call OpenAI via our Supabase Edge Function
    console.log(`🔍 [DIAGNOSIS] Invoking edge function 'openai-completion'`);
    console.time('openai_edge_function_call');
    
    // Set a client-side timeout wrapper around the edge function call
    const edgeFunctionTimeoutMs = 65000; // 65 seconds
    const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Client timeout: Edge function call exceeded ${edgeFunctionTimeoutMs/1000} seconds`));
      }, edgeFunctionTimeoutMs);
    });
    
    // Actual edge function call
    const functionCallPromise = supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model,
        systemPrompt: params.systemPrompt,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 2000,
        isAuthenticated: params.isAuthenticated,
        forceLiveResponse: params.forceLiveResponse
      }
    });
    
    // Race between the function call and the timeout
    const { data, error } = await Promise.race([
      functionCallPromise,
      timeoutPromise
    ]);
    
    console.timeEnd('openai_edge_function_call');
    const callDuration = Date.now() - startTime;
    
    if (error) {
      console.error(`❌ [DIAGNOSIS] Error calling OpenAI via edge function after ${callDuration}ms:`, error);
      console.error(`❌ [DIAGNOSIS] Error details:`, JSON.stringify(error));
      throw new Error(error.message || 'Error calling OpenAI service');
    }
    
    if (!data || !data.text) {
      console.error(`❌ [DIAGNOSIS] No data returned from OpenAI service after ${callDuration}ms`);
      throw new Error('No content generated');
    }
    
    console.log(`🔍 [DIAGNOSIS] Successfully generated content (${data.text.length} chars) in ${callDuration}ms`);
    
    return {
      text: data.text,
      success: true
    };
  } catch (error: any) {
    console.error(`❌ [DIAGNOSIS] Error in OpenAI call:`, error);
    
    // Create detailed error information
    let errorDetails = '';
    if (error instanceof Error) {
      errorDetails = `${error.name}: ${error.message}`;
      console.error(`❌ [DIAGNOSIS] Error name: ${error.name}`);
      console.error(`❌ [DIAGNOSIS] Error message: ${error.message}`);
      if (error.stack) {
        console.error(`❌ [DIAGNOSIS] Error stack:`, error.stack);
      }
      if ('cause' in error) {
        console.error(`❌ [DIAGNOSIS] Error cause:`, error.cause);
      }
    } else {
      errorDetails = String(error);
    }
    
    return {
      text: '',
      success: false,
      error: errorDetails || 'Unknown error occurred'
    };
  }
};
