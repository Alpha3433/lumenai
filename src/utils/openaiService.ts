
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
    console.log(`Calling OpenAI with model: ${params.model}, prompt length: ${params.prompt.length} chars`);
    console.log(`User authenticated: ${params.isAuthenticated ? 'Yes' : 'No'}`);
    
    const requestStartTime = Date.now();
    
    // Call OpenAI via our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('openai-completion', {
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
    
    const requestDuration = Date.now() - requestStartTime;
    console.log(`OpenAI request completed in ${requestDuration}ms`);
    
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
    
    // Improved error handling with specific error messages
    if (error.message && error.message.includes('timed out')) {
      return {
        text: "The AI service is taking longer than expected. Please try again with a shorter description.",
        success: false,
        error: 'Request timed out'
      };
    } else if (error.message && error.message.includes('rate limit')) {
      return {
        text: "We've reached our API rate limit. Please wait a minute before trying again.",
        success: false,
        error: 'Rate limit exceeded'
      };
    } else if (error.message && error.message.includes('API key')) {
      return {
        text: "There was an issue with the API configuration. Our team has been notified.",
        success: false,
        error: 'API configuration error'
      };
    }
    
    return {
      text: '',
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
