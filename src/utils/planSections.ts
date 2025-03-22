
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
    'executive summary': `Write a concise and compelling executive summary for a business plan with the following details:${baseContext}
    
IMPORTANT: The executive summary must be EXACTLY TWO PARAGRAPHS MAXIMUM. DO NOT include a heading or title in your response.
Paragraph 1: Introduce the business concept, value proposition, and target market.
Paragraph 2: Highlight the market opportunity, business model, and competitive advantage.
Keep it under 150 words total. Do not use bullet points or headings.`,

    'market analysis': `Create a detailed market analysis for a business plan with the following information:${baseContext}
    
The market analysis should focus on the following aspects:
- Industry overview including current market size (provide a specific dollar amount)
- Target demographic details with specific age ranges
- Market growth trends with percentage figures
- Key competitors (mention how many main competitors exist)
- Market opportunities and challenges
- Segment breakdown with their relative importance

Write this as a coherent, detailed paragraph without subheadings or bullet points. Include specific numbers and metrics where possible to make the analysis data-rich and credible. Keep the tone professional and objective.`,

    'business model': `Describe the business model for a company with these details:${baseContext}
    
The business model section should explain how the business will generate revenue, pricing strategy, cost structure, distribution channels, and key partnerships. Focus on sustainability and profitability.`,

    'marketing plan': `Develop a comprehensive marketing plan for a business with these characteristics:${baseContext}
    
The marketing plan should outline target audience segmentation, positioning strategy, marketing channels, promotional activities, and customer acquisition strategies. Include digital and traditional approaches as appropriate.`,

    'financial projections': `Create realistic financial projections for a business with the following parameters:${baseContext}
    
The financial projections should include specific numbers for anticipated revenue, expenses and profits for the first 3 years. Include startup costs, operational expenses, and monthly revenue estimates. Format the information clearly with specific dollar amounts for Year 1, Year 2, and Year 3 revenue, expenses and profit projections.`,

    'risk assessment': `Perform a risk assessment for a business with these factors:${baseContext}
    
The risk assessment should identify potential internal and external risks, their likelihood and impact, and mitigation strategies. Consider market, operational, financial, and regulatory risks.`,

    'implementation timeline': `Create a phased implementation timeline for launching and growing this business:${baseContext}
    
The implementation timeline should outline specific phases (such as Planning Phase, Setup Phase, Launch Phase, and Growth Phase) with key milestones, deadlines, and specific action items for each phase. Include timeframes for each phase (e.g., Months 1-2, Months 3-4, etc.). Structure the response as a clear timeline with phases and bullet points for tasks in each phase.`,

    'swot analysis': `Conduct a SWOT analysis for a business with these characteristics:${baseContext}
    
IMPORTANT: For the SWOT analysis, identify EXACTLY the 4 BEST Strengths, 4 BEST Weaknesses, 4 BEST Opportunities, and 4 BEST Threats based on the provided business information.

Format your response as follows:

**Strengths**
• [Strength 1]
• [Strength 2]
• [Strength 3]
• [Strength 4]

**Weaknesses**
• [Weakness 1]
• [Weakness 2]
• [Weakness 3]
• [Weakness 4]

**Opportunities**
• [Opportunity 1]
• [Opportunity 2]
• [Opportunity 3]
• [Opportunity 4]

**Threats**
• [Threat 1]
• [Threat 2]
• [Threat 3]
• [Threat 4]

Do not include any other text, explanations, or additional formatting. Only include the bold headings and bullet points as shown above.`
  };

  return sectionPrompts[section] || 
    `Create a detailed ${section} for a business plan with the following information:${baseContext}
    
    The ${section} should be professional, detailed, and realistic.`;
}
