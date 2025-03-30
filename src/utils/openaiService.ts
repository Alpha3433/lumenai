
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestParams {
  prompt: string;
  model: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  isAuthenticated?: boolean;
  forceLiveResponse?: boolean; // Added missing property
}

interface OpenAIResponse {
  text: string;
  success: boolean;
  error?: string;
}

export const callOpenAI = async (params: OpenAIRequestParams): Promise<OpenAIResponse> => {
  try {
    console.log(`Calling OpenAI with model: ${params.model}, prompt length: ${params.prompt.length} chars`);
    
    // Call OpenAI via our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('openai-completion', {
      body: {
        prompt: params.prompt,
        model: params.model,
        systemPrompt: params.systemPrompt,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 2000,
        isAuthenticated: params.isAuthenticated,
        forceLiveResponse: params.forceLiveResponse // Pass the new property to the edge function
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
    
    return {
      text: '',
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
