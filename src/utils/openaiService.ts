
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
    
    // Use the improved endpoint to call OpenAI via our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 1500,
        isAuthenticated: params.isAuthenticated,
        forceLiveResponse: params.forceLiveResponse
      }
    });
    
    if (error) {
      console.error('Error calling OpenAI via edge function:', error);
      throw new Error(error.message || 'Error calling OpenAI service');
    }
    
    if (!data || !data.text) {
      console.error('No data returned from OpenAI service');
      throw new Error('No content generated');
    }
    
    console.log(`Successfully generated content (${data.text.length} chars)`);
    return {
      text: data.text,
      success: true
    };
  } catch (error: any) {
    console.error('Error in OpenAI call:', error);
    
    // Improved error handling
    if (error.message && error.message.includes('timed out')) {
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
