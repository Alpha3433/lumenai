
import { BusinessFormData, GenerationOptions, SectionGenerationResult } from "./types";
import { callOpenAI } from "@/utils/openaiService";
import { createPromptForSection, getSystemPromptForSection } from "@/utils/planSections";
import { getFallbackContent } from "./fallbackContent";

/**
 * Generates a single section of the business plan
 */
export const generateSection = async (
  sectionName: string, 
  formData: BusinessFormData,
  retryCount = 0,
  maxRetries = 2
): Promise<SectionGenerationResult> => {
  try {
    // Use the improved prompt templates
    const promptTemplate = createPromptForSection(sectionName, formData);
    const systemPrompt = getSystemPromptForSection(sectionName);
    
    // Set model based on user preference
    const model = formData.useAIV2 ? 'gpt-4o' : 'gpt-4o-mini';
    
    // Adjust token limits based on section complexity
    const maxTokens = sectionName.includes('financial') ? 2000 : 
                     sectionName.includes('swot') ? 1500 : 
                     sectionName.includes('market') ? 2000 : 1500;
    
    console.log(`Generating ${sectionName} with ${model}`);
    
    const response = await callOpenAI({
      prompt: promptTemplate,
      systemPrompt,
      model,
      temperature: 0.7,
      maxTokens,
      forceLiveResponse: true,
      isAuthenticated: formData.isAuthenticated
    });
    
    // Accept any non-empty response
    if (response.success && response.text) {
      console.log(`Successfully generated ${sectionName} (${response.text.length} chars)`);
      return {
        content: response.text,
        success: true
      };
    } else {
      console.warn(`Failed to generate content: ${response.error}`);
      throw new Error(response.error || `Failed to generate ${sectionName}`);
    }
  } catch (error: any) {
    console.error(`Failed to generate ${sectionName} (attempt ${retryCount + 1}):`, error);
    
    // If we haven't reached max retries, try again
    if (retryCount < maxRetries) {
      // Wait briefly before retrying to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateSection(sectionName, formData, retryCount + 1, maxRetries);
    }
    
    // Return fallback content on final failure
    return {
      content: getFallbackContent(sectionName, formData),
      success: false,
      error: error.message || `Failed to generate ${sectionName} after ${maxRetries} attempts`
    };
  }
};
