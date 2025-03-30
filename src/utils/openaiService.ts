
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestParams {
  prompt: string;
  model: string;
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
    console.log(`Calling OpenAI with model: ${params.model}, prompt length: ${params.prompt.length} chars`);
    console.log(`User authenticated: ${params.isAuthenticated ? 'Yes' : 'No'}`);
    
    // Extend timeout to 5 minutes for complex generations
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timed out after 300 seconds')), 300000);
    });
    
    // Enhanced request with optimized parameters
    const responsePromise = supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model || 'gpt-4o',
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 2000, // Increased token limit
        isAuthenticated: params.isAuthenticated,
        priority: params.isAuthenticated ? 'high' : 'normal', // Prioritize authenticated users
        forceLiveResponse: true // Always use live responses
      }
    });
    
    // Race the API call against the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]);
    
    if (response.error) {
      console.error('Error calling OpenAI through Supabase:', response.error);
      throw new Error(response.error.message || 'Error calling OpenAI');
    }

    console.log('OpenAI response received, success:', response.data?.success);
    
    // More lenient response validation - only check if text exists
    if (!response.data?.text) {
      console.warn('OpenAI returned an empty response');
      return {
        text: "The AI service returned an empty response. Please try again.",
        success: false,
        error: 'Empty response'
      };
    }
    
    return {
      text: response.data.text,
      success: true
    };
  } catch (error) {
    console.error('Error in OpenAI call:', error);
    
    // Improved handling for different error types
    if (error.message && error.message.includes('timed out')) {
      // Better user-friendly message for timeout errors
      return {
        text: "The AI service is taking longer than expected. Please try again with a shorter business description.",
        success: false,
        error: error.message || 'Request timed out'
      };
    } else if (error.message && error.message.includes('rate limit')) {
      return {
        text: "We've reached our API rate limit. Please wait a minute before trying again.",
        success: false,
        error: error.message || 'Rate limit exceeded'
      };
    }
    
    return {
      text: '',
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
