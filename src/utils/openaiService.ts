
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestParams {
  prompt: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  isAuthenticated?: boolean;
  forceLiveResponse?: boolean; // Parameter to force live API response
}

interface OpenAIResponse {
  text: string;
  success: boolean;
  error?: string;
}

export const callOpenAI = async (params: OpenAIRequestParams): Promise<OpenAIResponse> => {
  try {
    console.log(`Calling OpenAI with model: ${params.model}, prompt length: ${params.prompt.length} chars`);
    console.log(`User authenticated: ${params.isAuthenticated ? 'Yes' : 'No'}`);
    console.log(`Force live response: ${params.forceLiveResponse ? 'Yes' : 'No'}`);
    
    // Always use live responses, never use mock data
    console.log('Using live OpenAI response for all requests');
    
    // Increased timeout from 30 seconds to 120 seconds (2 minutes)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timed out after 120 seconds')), 120000);
    });
    
    // Call Supabase Edge Function for OpenAI
    const responsePromise = supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 800,
        isAuthenticated: params.isAuthenticated // Pass authentication status to edge function
      }
    });
    
    // Race the API call against the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]);
    
    if (response.error) {
      console.error('Error calling OpenAI through Supabase:', response.error);
      throw new Error(response.error.message || 'Error calling OpenAI');
    }

    // Add logging to debug the response
    console.log('OpenAI response received, success:', response.data?.success);
    
    return {
      text: response.data.text,
      success: true
    };
  } catch (error) {
    console.error('Error in OpenAI call:', error);
    
    // Never fall back to mock data, just return the error
    return {
      text: '',
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
