
import { callOpenAI } from '../openaiService';
import { extractPorterFiveForcesData } from './extraction';
import { PorterFiveForcesData } from './types';

/**
 * Generates Porter's Five Forces analysis using OpenAI based on business description
 */
export const generatePorterFiveForcesWithAI = async (
  businessName: string,
  businessDescription: string
): Promise<PorterFiveForcesData | undefined> => {
  try {
    const prompt = `
Generate a detailed Porter's Five Forces analysis for a business with these details:
- Business name: ${businessName}
- Business description: ${businessDescription}

IMPORTANT: Structure your response with EXACTLY the following sections:

1. Threat of New Entrants (HIGH/MEDIUM/LOW)
- Bullet point 1 specific to this business
- Bullet point 2 specific to this business
- Bullet point 3 specific to this business

2. Threat of Substitution (HIGH/MEDIUM/LOW)
- Bullet point 1 specific to this business
- Bullet point 2 specific to this business
- Bullet point 3 specific to this business

3. Bargaining Power of Suppliers (HIGH/MEDIUM/LOW)
- Bullet point 1 specific to this business
- Bullet point 2 specific to this business
- Bullet point 3 specific to this business

4. Bargaining Power of Buyers (HIGH/MEDIUM/LOW)
- Bullet point 1 specific to this business
- Bullet point 2 specific to this business
- Bullet point 3 specific to this business

5. Competitive Rivalry (HIGH/MEDIUM/LOW)
- Bullet point 1 specific to this business
- Bullet point 2 specific to this business
- Bullet point 3 specific to this business

For each force, the level (HIGH/MEDIUM/LOW) should be followed by EXACTLY three bullet points that are HIGHLY SPECIFIC to this business. Each bullet point should contain precise details related to the industry, market conditions, and business model described.
`;

    const response = await callOpenAI({
      prompt,
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000
    });

    if (!response.success) {
      console.error('Failed to generate Porter\'s Five Forces analysis:', response.error);
      return undefined;
    }

    // Use the existing extraction utility to parse the OpenAI response
    const data = extractPorterFiveForcesData(response.text);
    return data;
  } catch (error) {
    console.error('Error generating Porter\'s Five Forces analysis:', error);
    return undefined;
  }
};
