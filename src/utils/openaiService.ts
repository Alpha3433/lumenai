
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
    
    // Set a longer timeout of 120 seconds for more complex generations
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timed out after 120 seconds')), 120000);
    });
    
    // Enhanced request with optimized parameters
    const responsePromise = supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model, // Allow using gpt-4o-mini for faster responses
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 800,
        isAuthenticated: params.isAuthenticated,
        priority: params.isAuthenticated ? 'high' : 'normal' // Prioritize authenticated users
      }
    });
    
    // Race the API call against the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]);
    
    if (response.error) {
      console.error('Error calling OpenAI through Supabase:', response.error);
      throw new Error(response.error.message || 'Error calling OpenAI');
    }

    console.log('OpenAI response received, success:', response.data?.success);
    
    return {
      text: response.data.text,
      success: true
    };
  } catch (error) {
    console.error('Error in OpenAI call:', error);
    
    // If it's a timeout error, provide a more helpful error message
    if (error.message && error.message.includes('timed out')) {
      // Fallback to a simple response for timeout errors
      return {
        text: "The AI service is currently experiencing high demand. Please try again in a few moments.",
        success: false,
        error: error.message || 'Request timed out'
      };
    }
    
    return {
      text: '',
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
