
import { BusinessFormData, SectionGenerationResult } from "./types";
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
  maxRetries = 1
): Promise<SectionGenerationResult> => {
  try {
    console.log(`🔍 [DIAGNOSIS] generateSection started for ${sectionName}, retry ${retryCount}/${maxRetries}`);
    
    // Use the improved prompt templates
    const promptTemplate = createPromptForSection(sectionName, formData);
    const systemPrompt = getSystemPromptForSection(sectionName);
    
    // Log prompt length for diagnostics
    console.log(`🔍 [DIAGNOSIS] ${sectionName} prompt length: ${promptTemplate.length} chars`);
    console.log(`🔍 [DIAGNOSIS] ${sectionName} system prompt length: ${systemPrompt.length} chars`);
    
    // Set model based on user preference
    const model = formData.useAIV2 ? 'gpt-4o' : 'gpt-4o-mini';
    
    // Adjust token limits based on section complexity
    const maxTokens = sectionName.includes('financial') ? 2000 : 
                     sectionName.includes('swot') ? 1500 : 
                     sectionName.includes('market') ? 2000 : 1500;
    
    console.log(`🔍 [DIAGNOSIS] Generating ${sectionName} with ${model}, max tokens: ${maxTokens}, user is ${formData.isAuthenticated ? 'authenticated' : 'not authenticated'}`);
    
    // Record the start time to measure API response time
    const apiCallStartTime = Date.now();
    
    const response = await callOpenAI({
      prompt: promptTemplate,
      systemPrompt,
      model,
      temperature: 0.7,
      maxTokens,
      isAuthenticated: formData.isAuthenticated,
      forceLiveResponse: sectionName === 'executive summary' // Force live response for executive summary
    });
    
    const apiCallDuration = Date.now() - apiCallStartTime;
    console.log(`🔍 [DIAGNOSIS] OpenAI API call for ${sectionName} completed in ${apiCallDuration}ms`);
    
    // Accept any non-empty response
    if (response.success && response.text) {
      console.log(`🔍 [DIAGNOSIS] Successfully generated ${sectionName} (${response.text.length} chars)`);
      return {
        content: response.text,
        success: true
      };
    } else {
      console.warn(`❌ [DIAGNOSIS] Failed to generate content for ${sectionName}: ${response.error}`);
      throw new Error(response.error || `Failed to generate ${sectionName}`);
    }
  } catch (error: any) {
    console.error(`❌ [DIAGNOSIS] Failed to generate ${sectionName} (attempt ${retryCount + 1}):`, error);
    
    // If we haven't reached max retries, try again
    if (retryCount < maxRetries) {
      // Wait briefly before retrying to avoid rate limits
      console.log(`🔍 [DIAGNOSIS] Retrying ${sectionName} generation after 1000ms delay...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateSection(sectionName, formData, retryCount + 1, maxRetries);
    }
    
    // Return fallback content on final failure
    console.log(`❌ [DIAGNOSIS] Max retries (${maxRetries}) reached for ${sectionName}, using fallback content`);
    return {
      content: getFallbackContent(sectionName, formData),
      success: false,
      error: error.message || `Failed to generate ${sectionName} after ${maxRetries} attempts`
    };
  }
};
