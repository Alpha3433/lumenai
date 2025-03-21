
import { callOpenAI } from "./openaiService";
import { BusinessFormData } from "./planGenerator";

// Generate a section of the business plan using OpenAI
export async function generateSection(section: string, formData: BusinessFormData): Promise<string> {
  try {
    const prompt = createPromptForSection(section, formData);
    console.log(`Generating ${section} with prompt...`);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini", // Using gpt-4o-mini for better quality responses
      temperature: 0.7,
      maxTokens: 800 // Increased for more detailed responses
    });
    
    if (!response.success) {
      console.error(`Error generating ${section}:`, response.error);
      throw new Error(`Failed to generate ${section}`);
    }
    
    return response.text;
  } catch (error) {
    console.error(`Error in generateSection for ${section}:`, error);
    throw error;
  }
}

// Create a specific prompt for each section with better instructions
export function createPromptForSection(section: string, formData: BusinessFormData): string {
  const baseContext = `
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business description, identify the industry, target market, business goals, competitors, and potential revenue model. Then, create a professional and detailed ${section} based on this information.
`;

  const sectionPrompts: Record<string, string> = {
    'executive summary': `Write a professional executive summary for a business plan with the following details:${baseContext}
    
The executive summary should be concise, compelling, and highlight the key aspects of the business. Focus on the value proposition, market opportunity, and business goals. Keep it under 300 words.`,

    'market analysis': `Create a detailed market analysis for a business plan with the following information:${baseContext}
    
The market analysis should include industry trends, target market demographics, market size, growth potential, and competitor landscape. Provide specific insights and data points where possible.`,

    'business model': `Describe the business model for a company with these details:${baseContext}
    
The business model section should explain how the business will generate revenue, pricing strategy, cost structure, distribution channels, and key partnerships. Focus on sustainability and profitability.`,

    'marketing plan': `Develop a comprehensive marketing plan for a business with these characteristics:${baseContext}
    
The marketing plan should outline target audience segmentation, positioning strategy, marketing channels, promotional activities, and customer acquisition strategies. Include digital and traditional approaches as appropriate.`,

    'financial projections': `Create realistic financial projections for a business with the following parameters:${baseContext}
    
The financial projections should include anticipated revenue, startup costs, operational expenses, break-even analysis, and profitability timeline. Be realistic and provide both optimistic and conservative scenarios.`,

    'risk assessment': `Perform a risk assessment for a business with these factors:${baseContext}
    
The risk assessment should identify potential internal and external risks, their likelihood and impact, and mitigation strategies. Consider market, operational, financial, and regulatory risks.`,

    'implementation timeline': `Create a phased implementation timeline for launching and growing this business:${baseContext}
    
The implementation timeline should outline key milestones, deadlines, and action items for the first year of operation. Include pre-launch activities, launch phase, and growth phases.`,

    'swot analysis': `Conduct a SWOT analysis for a business with these characteristics:${baseContext}
    
The SWOT analysis should identify Strengths, Weaknesses, Opportunities, and Threats based on the provided information. Each section should have at least 3-5 well-reasoned points with brief explanations.`
  };

  return sectionPrompts[section] || 
    `Create a detailed ${section} for a business plan with the following information:${baseContext}
    
    The ${section} should be professional, detailed, and realistic.`;
}
