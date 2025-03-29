
import { callOpenAI } from './openaiService';
import { BusinessIdeaPreferences, BusinessIdeaSuggestion } from './businessIdeas/types';
import { generateMockBusinessIdea } from './businessIdeas';
import { toast } from '@/components/ui/use-toast';

// Function to generate a business idea using OpenAI
export async function generateBusinessIdea(preferences: BusinessIdeaPreferences): Promise<BusinessIdeaSuggestion> {
  try {
    // Create prompt based on user preferences
    const prompt = createBusinessIdeaPrompt(preferences);
    
    console.log('Generating business idea with prompt:', prompt);
    
    // Call OpenAI API
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 800
    });
    
    if (!response.success) {
      console.error('Error generating business idea:', response.error);
      toast({
        title: "Generation Error",
        description: response.error || "Failed to generate business idea. Please try again.",
        variant: "destructive"
      });
      throw new Error('Failed to generate business idea');
    }
    
    // Parse the response
    return parseBusinessIdeaResponse(response.text);
  } catch (error) {
    console.error('Error in generateBusinessIdea:', error);
    
    // Fall back to mock data in development mode
    if (import.meta.env.DEV) {
      console.log('Using mock business idea in development mode');
      return generateMockBusinessIdea(preferences);
    }
    
    throw error;
  }
}

// Create a prompt for the OpenAI API based on user preferences
function createBusinessIdeaPrompt(preferences: BusinessIdeaPreferences): string {
  const { industry, interests } = preferences;
  
  if (interests === 'surprise me' || (!industry && !interests)) {
    return `
      Generate an innovative business idea based on current market trends and opportunities.
      The business idea should be specific, practical, and have clear potential for profitability.
      Make it unique, creative, and different from common business ideas.
      
      Format your response as follows:
      Business Name: [catchy and relevant name]
      Description: [2-3 sentence description of the business concept]
      Target Market: [who this business would serve]
      Revenue Model: [how this business would make money]
      Why It Works: [4 bullet points highlighting market needs, timing, competitive advantages, or trends that make this idea viable]
      
      Make sure the business idea is modern, specific (not generic), and addresses a real market need.
    `;
  }
  
  return `
    Generate an innovative business idea in the ${industry || 'any'} industry.
    ${interests ? `The founder has interests/expertise in: ${interests}` : ''}
    Make it unique, creative, and different from common business ideas.
    
    Format your response as follows:
    Business Name: [catchy and relevant name]
    Description: [2-3 sentence description of the business concept]
    Target Market: [who this business would serve]
    Revenue Model: [how this business would make money]
    Why It Works: [4 bullet points highlighting market needs, timing, competitive advantages, or trends that make this idea viable]
    
    Make sure the business idea is modern, specific (not generic), and addresses a real market need.
    The idea should be practical for a startup or small business to implement.
  `;
}

// Parse the OpenAI response into a structured business idea
function parseBusinessIdeaResponse(text: string): BusinessIdeaSuggestion {
  try {
    // Extract business name
    const businessNameMatch = text.match(/Business Name:?\s*(.+?)(?:\n|$)/);
    const businessName = businessNameMatch ? businessNameMatch[1].trim() : "Innovative Startup";
    
    // Extract description
    const descriptionMatch = text.match(/Description:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const description = descriptionMatch ? descriptionMatch[1].trim() : "A modern business addressing market needs.";
    
    // Extract target market
    const targetMarketMatch = text.match(/Target Market:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const targetMarket = targetMarketMatch ? targetMarketMatch[1].trim() : "Consumers and businesses seeking innovative solutions.";
    
    // Extract revenue model
    const revenueModelMatch = text.match(/Revenue Model:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const revenueModel = revenueModelMatch ? revenueModelMatch[1].trim() : "Subscription-based service with premium features.";
    
    // Extract why it works
    const whyItWorksMatch = text.match(/Why It Works:?\s*(.+?)(?:\n\n|$)/s);
    let whyItWorks: string[] = [];
    
    if (whyItWorksMatch) {
      // Extract bullet points
      const bulletPoints = whyItWorksMatch[1].split(/\n\s*[-•*]\s*/).filter(Boolean);
      whyItWorks = bulletPoints.map(point => point.trim());
    }
    
    // Ensure we have at least one reason if parsing failed
    if (whyItWorks.length === 0) {
      whyItWorks = [
        "Addresses a growing market need",
        "Leverages current technology trends",
        "Has multiple revenue streams",
        "Low startup costs relative to potential returns"
      ];
    }
    
    return {
      businessName,
      description,
      targetMarket,
      revenueModel,
      whyItWorks
    };
  } catch (error) {
    console.error('Error parsing business idea response:', error);
    // Return a fallback structure
    return generateMockBusinessIdea({ industry: "technology" });
  }
}

// Re-export the necessary types from the businessIdeas directory
export type { BusinessIdeaPreferences, BusinessIdeaSuggestion };
