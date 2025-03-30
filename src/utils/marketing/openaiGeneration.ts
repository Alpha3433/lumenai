
import { callOpenAI } from '../openaiService';
import { BusinessFormData } from '../planGenerator';

export interface MarketingPlanData {
  targetAudience: string[];
  positioningStrategy: string[];
  marketingChannels: string[];
  promotionalActivities: string[];
  customerAcquisition: string[];
}

export async function generateMarketingPlan(formData: BusinessFormData): Promise<string> {
  try {
    const prompt = createMarketingPlanPrompt(formData);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1000
    });
    
    if (!response.success) {
      console.error('Error generating marketing plan:', response.error);
      throw new Error('Failed to generate marketing plan');
    }
    
    return response.text;
  } catch (error) {
    console.error('Error in generateMarketingPlan:', error);
    throw error;
  }
}

function createMarketingPlanPrompt(formData: BusinessFormData): string {
  return `
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on this business, create a comprehensive and detailed marketing plan. The marketing plan should be structured and include the following key sections:

1. Target Audience Segmentation
- Identify 3-4 distinct audience segments that would be interested in this business
- For each segment, provide specific demographic and psychographic details
- Format each audience segment as a bullet point starting with "-"

2. Positioning Strategy
- Develop a clear positioning statement for the business
- Explain how the business will differentiate itself from competitors
- Identify the unique value proposition

3. Marketing Channels
- List 4-5 specific marketing channels that would be most effective for this business
- For each channel, explain why it's appropriate for this business
- Format each channel as a bullet point starting with "-"

4. Promotional Activities
- Suggest 4-5 specific promotional activities or campaigns
- Include at least one digital marketing activity and one event/experiential marketing activity
- Format each activity as a bullet point starting with "-"

5. Customer Acquisition Strategies
- Outline 4-5 specific strategies to acquire new customers
- Include specific tactics, potential partners, or methods
- Format each strategy as a bullet point starting with "-"

IMPORTANT FORMATTING INSTRUCTIONS:
- Start each section with a clear heading (e.g., "Target Audience")
- Use bullet points with the "-" character for lists
- Keep the writing style professional but accessible
- Include specific details relevant to this particular business
- Do not use generic marketing advice that could apply to any business
- Make suggestions that are realistic and implementable

The marketing plan should be comprehensive but focused specifically on this business and its unique characteristics.
`;
}

export function extractMarketingPlanData(planText: string): MarketingPlanData {
  const defaultData: MarketingPlanData = {
    targetAudience: [],
    positioningStrategy: [],
    marketingChannels: [],
    promotionalActivities: [],
    customerAcquisition: []
  };
  
  try {
    // Split the text into sections
    const sections = planText.split(/Target Audience|Positioning Strategy|Marketing Channels|Promotional Activities|Customer Acquisition/gi)
      .filter(section => section.trim().length > 0);
    
    // If we don't have enough sections, return the default data
    if (sections.length < 4) return defaultData;
    
    // Extract bullet points from each section
    const extractBulletPoints = (text: string): string[] => {
      const bulletPoints = text.match(/\n-\s+([^\n]+)/g) || [];
      return bulletPoints.map(point => point.replace(/\n-\s+/, '').trim());
    };
    
    // Process each section
    const result: MarketingPlanData = {
      targetAudience: extractBulletPoints(sections[0]),
      positioningStrategy: sections[1].split('\n').filter(line => line.trim().length > 0).map(line => line.trim()),
      marketingChannels: extractBulletPoints(sections[2]),
      promotionalActivities: extractBulletPoints(sections[3]),
      customerAcquisition: extractBulletPoints(sections[4] || '')
    };
    
    return result;
  } catch (error) {
    console.error('Error extracting marketing plan data:', error);
    return defaultData;
  }
}
