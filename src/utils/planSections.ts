
import { BusinessFormData } from "@/types/businessPlan";

// Create a specific prompt for each section with better instructions
export function createPromptForSection(section: string, formData: BusinessFormData): string {
  const baseContext = `
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business description, identify the industry, target market, business goals, competitors, and potential revenue model. Then, create a professional and detailed ${section} based on this information.
`;

  const sectionPrompts: Record<string, { prompt: string, systemPrompt?: string }> = {
    'executive summary': {
      prompt: `Write a concise and compelling executive summary for a business plan with the following details:${baseContext}
    
IMPORTANT: The executive summary must be EXACTLY TWO PARAGRAPHS MAXIMUM. DO NOT include a heading or title in your response.
Paragraph 1: Introduce the business concept, value proposition, and target market.
Paragraph 2: Highlight the market opportunity, business model, and competitive advantage.
Keep it under 150 words total. Do not use bullet points or headings.`,
      systemPrompt: `You are a professional business writer creating concise, impactful executive summaries. Create exactly two paragraphs without headings, that are clear, specific, and compelling.`
    },

    'market analysis': {
      prompt: `Create a detailed market analysis for a business plan with the following information:${baseContext}
    
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

ALSO INCLUDE a section titled "Porter's Five Forces Analysis" with subsections for each of the five forces:
- "Threat of New Entrants" - Indicate whether it is HIGH, MEDIUM, or LOW and list 3-4 bullet points explaining why.
- "Threat of Substitution" - Indicate whether it is HIGH, MEDIUM, or LOW and list 3-4 bullet points explaining why.
- "Bargaining Power of Suppliers" - Indicate whether it is HIGH, MEDIUM, or LOW and list 3-4 bullet points explaining why.
- "Bargaining Power of Buyers" - Indicate whether it is HIGH, MEDIUM, or LOW and list 3-4 bullet points explaining why.
- "Competitive Rivalry" - Indicate whether it is HIGH, MEDIUM, or LOW and list 3-4 bullet points explaining why.`,
      systemPrompt: `You are a market research analyst providing detailed market analysis with specific figures, real competitor names, and concrete data points. Always include Porter's Five Forces analysis with clearly labeled HIGH, MEDIUM, or LOW ratings.`
    },

    'business model': {
      prompt: `Describe the business model for a company with these details:${baseContext}
    
The business model section should explain how the business will generate revenue, pricing strategy, cost structure, distribution channels, and key partnerships. Focus on sustainability and profitability.

Include the following details in your response:
- Primary revenue streams with percentage breakdown (e.g., Product sales: 60%, Services: 40%)
- Pricing model with specific price points or ranges
- Cost structure breakdown (fixed vs variable costs)
- Distribution channels and their relative importance
- Key partnerships and strategic relationships`,
      systemPrompt: `You are a business model expert creating detailed, realistic business models with specific revenue streams, pricing strategies, and cost structures. Provide concrete figures and percentages.`
    },

    'marketing plan': {
      prompt: `Develop a comprehensive marketing plan for a business with these characteristics:${baseContext}
    
The marketing plan should outline target audience segmentation, positioning strategy, marketing channels, promotional activities, and customer acquisition strategies. Include digital and traditional approaches as appropriate.`,
      systemPrompt: `You are a marketing strategist creating comprehensive marketing plans with specific audience segments, channels, and tactics. Provide concrete, actionable recommendations.`
    },

    'financial and idea validation': {
      prompt: `Provide a critical evaluation of this business idea, with the following details:${baseContext}
    
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
- Recommendations (list 4 specific actions to improve viability)`,
      systemPrompt: `You are a business validation expert providing balanced, critical evaluations with numerical scores and specific strengths and weaknesses. Always follow the exact format requested with scores from 1-100 for each category.`
    },

    'risk assessment': {
      prompt: `Perform a risk assessment for a business with these factors:${baseContext}
    
The risk assessment should identify potential internal and external risks, their likelihood and impact, and mitigation strategies. Consider market, operational, financial, and regulatory risks.

ALSO INCLUDE COMPETITOR ANALYSIS: For the top 3 actual competitors in this industry, identify:
- Real company names (not generic placeholders)
- Their approximate market share
- Annual revenue figures
- Key strengths and weaknesses
- Year founded
- Any potential threats they pose to the new business`,
      systemPrompt: `You are a risk management consultant identifying specific business risks with likelihood and impact ratings. Always include analysis of real competitors with concrete data points.`
    },

    'swot analysis': {
      prompt: `Conduct a SWOT analysis for a business with these characteristics:${baseContext}
    
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

Do not include any other text, explanations, or additional formatting. Only include the bold headings and bullet points as shown above.`,
      systemPrompt: `You are a SWOT analysis specialist creating balanced analyses with exactly 4 items in each category. Format the output exactly as requested with bullet points and no extraneous text.`
    }
  };

  // Return both the prompt and the systemPrompt
  const sectionInfo = sectionPrompts[section] || {
    prompt: `Create a detailed ${section} for a business plan with the following information:${baseContext}
    
    The ${section} should be professional, detailed, and realistic.`
  };

  return sectionInfo.prompt;
}

// Get the system prompt for a section, if defined
export function getSystemPromptForSection(section: string): string | undefined {
  const sectionPrompts: Record<string, { prompt: string, systemPrompt?: string }> = {
    'executive summary': {
      prompt: ``,
      systemPrompt: `You are a professional business writer creating concise, impactful executive summaries. Create exactly two paragraphs without headings, that are clear, specific, and compelling.`
    },
    'market analysis': {
      prompt: ``,
      systemPrompt: `You are a market research analyst providing detailed market analysis with specific figures, real competitor names, and concrete data points. Always include Porter's Five Forces analysis with clearly labeled HIGH, MEDIUM, or LOW ratings.`
    },
    'business model': {
      prompt: ``,
      systemPrompt: `You are a business model expert creating detailed, realistic business models with specific revenue streams, pricing strategies, and cost structures. Provide concrete figures and percentages.`
    },
    'marketing plan': {
      prompt: ``,
      systemPrompt: `You are a marketing strategist creating comprehensive marketing plans with specific audience segments, channels, and tactics. Provide concrete, actionable recommendations.`
    },
    'financial and idea validation': {
      prompt: ``,
      systemPrompt: `You are a business validation expert providing balanced, critical evaluations with numerical scores and specific strengths and weaknesses. Always follow the exact format requested with scores from 1-100 for each category.`
    },
    'risk assessment': {
      prompt: ``,
      systemPrompt: `You are a risk management consultant identifying specific business risks with likelihood and impact ratings. Always include analysis of real competitors with concrete data points.`
    },
    'swot analysis': {
      prompt: ``,
      systemPrompt: `You are a SWOT analysis specialist creating balanced analyses with exactly 4 items in each category. Format the output exactly as requested with bullet points and no extraneous text.`
    }
  };

  return sectionPrompts[section]?.systemPrompt;
}
