
import { callOpenAI } from '../openaiService';
import { extractPestelData } from './index';
import { PestelData } from './types';

/**
 * Generates PESTEL analysis using OpenAI based on business description
 */
export const generatePestelDataWithAI = async (
  businessName: string,
  businessDescription: string
): Promise<PestelData | null> => {
  try {
    const prompt = `
Generate a detailed PESTEL analysis for a business with these details:
- Business name: ${businessName}
- Business description: ${businessDescription}

IMPORTANT: Structure your response with EXACTLY the following sections:

1. Political Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

2. Economic Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

3. Social Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

4. Technological Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

5. Environmental Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

6. Legal Factors
• Bullet point 1 specific to this business
• Bullet point 2 specific to this business
• Bullet point 3 specific to this business

Each section should have EXACTLY three bullet points with the bullet symbol "•" (not numbers or dashes).
Each bullet point should be HIGHLY SPECIFIC to this business and its industry, containing precise details.
`;

    const response = await callOpenAI({
      prompt,
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000
    });

    if (!response.success) {
      console.error('Failed to generate PESTEL analysis:', response.error);
      return null;
    }

    // Use the existing extraction utility to parse the OpenAI response
    const data = extractPestelData(response.text);
    return data;
  } catch (error) {
    console.error('Error generating PESTEL analysis:', error);
    return null;
  }
};
