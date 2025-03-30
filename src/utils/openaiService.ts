
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
    
    // Even longer timeout of 180 seconds for complex generations
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timed out after 180 seconds')), 180000);
    });
    
    // Enhanced request with optimized parameters and more detailed instructions
    const responsePromise = supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 1500, // Increased token limit
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
    
    // Verify the response quality
    if (!response.data.text || response.data.text.length < 50) {
      console.warn('OpenAI returned an unusually short response:', response.data.text);
      return {
        text: "The AI service returned an incomplete response. Please try again.",
        success: false,
        error: 'Response too short'
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
        text: "The AI service is currently experiencing high demand. Please try again in a few moments or try with a shorter business description.",
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
