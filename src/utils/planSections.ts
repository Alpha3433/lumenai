
import { callOpenAI } from "./openaiService";
import { BusinessFormData } from "./planGenerator";

// Generate a section of the business plan using OpenAI
export async function generateSection(section: string, formData: BusinessFormData): Promise<string> {
  try {
    console.log(`Generating ${section} with prompt...`);
    
    const prompt = createPromptForSection(section, formData);
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
    
The market analysis should include ALL of these elements in your response:
1. Industry overview with current market size as a SPECIFIC dollar amount (e.g., $4.5 billion, $250 million)
2. Target demographic details with specific age ranges (e.g., 25-45)
3. Market growth trends with percentage figures (e.g., 12.5% annual growth)
4. Key competitors - identify at least 3 REAL company names in this industry
5. Market segments with descriptions and estimated percentage breakdown

MAKE SURE to include REAL COMPETITOR INFORMATION about these companies:
- Actual company names (not generic placeholders)
- Approximate market share percentage for each competitor
- Year each company was founded
- Estimated annual revenue with $ amounts
- Key strengths and weaknesses for each

Format this as a professional, detailed analysis with specific facts and figures throughout. Include actual numbers, percentages, and named companies to give the analysis credibility.`,

    'industry overview': `Generate a detailed industry overview for this business description:${baseContext}
    
IMPORTANT: Write a comprehensive industry overview with AT LEAST 6-8 sentences that covers:
1. Current market size in specific dollar amounts (e.g., $4.5 billion)
2. Compound annual growth rate as a percentage
3. Key technological trends affecting the industry
4. Regulatory considerations or changes
5. Consumer behavior patterns and changes
6. Major industry challenges or disruptions
7. Emerging opportunities 
8. Industry consolidation or fragmentation patterns

DO NOT include any headings or labels like "Industry Overview" in your response. Just write the content directly in paragraph form. Use specific figures, percentages, and data points throughout to make the overview substantive and credible.`,

    'business model': `Describe the business model for a company with these details:${baseContext}
    
The business model section should explain how the business will generate revenue, pricing strategy, cost structure, distribution channels, and key partnerships. Focus on sustainability and profitability.

Include the following details in your response:
- Primary revenue streams with percentage breakdown (e.g., Product sales: 60%, Services: 40%)
- Pricing model with specific price points or ranges
- Cost structure breakdown (fixed vs variable costs)
- Distribution channels and their relative importance
- Key partnerships and strategic relationships`,

    'marketing plan': `Develop a comprehensive marketing plan for a business with these characteristics:${baseContext}
    
The marketing plan should outline target audience segmentation, positioning strategy, marketing channels, promotional activities, and customer acquisition strategies. Include digital and traditional approaches as appropriate.`,

    'financial and idea validation': `Provide a critical evaluation of this business idea, with the following details:${baseContext}
    
IMPORTANT: I need a detailed evaluation of the business idea that includes BOTH positives AND negatives. Structure your response with the following elements:

1. Overall viability score (a number from 1-100) with brief explanation
2. Market need assessment (score 1-100) - How urgent is the problem being solved?
3. Profitability potential (score 1-100) - What are the revenue and margin potentials?
4. Competitive landscape (score 1-100) - How crowded is the space? What's the barrier to entry?
5. Time to market (score 1-100) - How quickly can this be launched?
6. Scalability (score 1-100) - How well can this business grow?

For each category, provide a short explanation justifying the score.

Then include:
- Key strengths (list 4 specific positives about the business idea)
- Key challenges (list 4 specific weaknesses or obstacles)
- Recommendations (list 4 specific actions to improve viability)

Be specific, realistic, and honest in your evaluation. Include numbers, percentages, and factual market information where possible. The goal is to provide a balanced assessment that highlights both the potential and the pitfalls of this business idea.`,

    'risk assessment': `Perform a risk assessment for a business with these factors:${baseContext}
    
The risk assessment should identify potential internal and external risks, their likelihood and impact, and mitigation strategies. Consider market, operational, financial, and regulatory risks.

ALSO INCLUDE COMPETITOR ANALYSIS: For the top 3 actual competitors in this industry, identify:
- Real company names (not generic placeholders)
- Their approximate market share
- Annual revenue figures
- Key strengths and weaknesses
- Year founded
- Any potential threats they pose to the new business

Format the competitor information in a way that can be easily extracted, for example:
"Company: [Name], Market Share: [Percentage], Founded: [Year], Revenue: [Amount], Strength: [Description], Weakness: [Description]"`,

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
