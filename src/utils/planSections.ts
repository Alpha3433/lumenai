
import { callOpenAI } from "./openaiService";
import { BusinessFormData } from "./planGenerator";

// Generate a section of the business plan using OpenAI
export async function generateSection(section: string, formData: BusinessFormData): Promise<string> {
  const prompt = createPromptForSection(section, formData);
  
  const response = await callOpenAI({
    prompt,
    model: "text-davinci-003", // You can use a different model if preferred
    temperature: 0.7,
    maxTokens: 500
  });
  
  if (!response.success) {
    console.error(`Error generating ${section}:`, response.error);
    throw new Error(`Failed to generate ${section}`);
  }
  
  return response.text;
}

// Create a specific prompt for each section
export function createPromptForSection(section: string, formData: BusinessFormData): string {
  const basePrompt = `Create a detailed ${section} for a business plan with the following information:
  
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}
Industry: ${formData.industry}
Target Market: ${formData.targetMarket}
Business Goals: ${formData.businessGoals || "Not specified"}
Competitor Information: ${formData.competitorInfo || "Not specified"}
Expected Revenue: ${formData.revenue || "Not specified"}
Time Period: ${formData.timePeriod || "1-year"}

The ${section} should be professional, detailed, and realistic.`;

  return basePrompt;
}
