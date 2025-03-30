
import { callOpenAI } from './openaiService';
import { BusinessIdeaPreferences, BusinessIdeaSuggestion } from './businessIdeas/types';
import { generateMockBusinessIdea } from './businessIdeas';
import { supabase } from '@/integrations/supabase/client';

// Function to generate a business idea using OpenAI
export async function generateBusinessIdea(preferences: BusinessIdeaPreferences): Promise<BusinessIdeaSuggestion> {
  try {
    console.log('Starting business idea generation with preferences:', preferences);
    
    // Check for authentication if needed for RLS
    const { data: sessionData } = await supabase.auth.getSession();
    const isAuthenticated = !!sessionData.session;
    
    console.log('User authentication status:', isAuthenticated ? 'Authenticated' : 'Not authenticated');
    
    // Special handling for "surprise me" mode to avoid potential API issues
    if (preferences.interests === "surprise me") {
      console.log('Generating surprise business idea');
      return generateMockBusinessIdea(preferences);
    }
    
    // Create prompt based on user preferences
    const prompt = createBusinessIdeaPrompt(preferences);
    const systemPrompt = "You are a business idea generator creating innovative, practical, and marketable business concepts with specific details on target market, revenue model, and competitive advantages.";
    
    console.log('Calling OpenAI with business idea prompt');
    
    // Use model based on premium status
    const model = preferences.usePremiumModel ? "gpt-4o" : "gpt-4o-mini";
    
    // Call OpenAI API
    const response = await callOpenAI({
      prompt,
      systemPrompt,
      model,
      temperature: 0.8, // Slightly higher temperature for more creativity
      maxTokens: 1200,
      isAuthenticated,
      forceLiveResponse: true
    });
    
    if (!response.success) {
      console.error('Error from OpenAI service:', response.error);
      throw new Error('Failed to generate business idea');
    }
    
    // Parse the response
    const parsedIdea = parseBusinessIdeaResponse(response.text);
    console.log('Successfully parsed business idea:', parsedIdea.businessName);
    return parsedIdea;
  } catch (error) {
    console.error('Error in generateBusinessIdea:', error);
    
    // Fall back to mock data for better user experience
    console.log('Falling back to mock business idea');
    return generateMockBusinessIdea(preferences);
  }
}

// Create a prompt for the OpenAI API based on user preferences
function createBusinessIdeaPrompt(preferences: BusinessIdeaPreferences): string {
  const { industry, interests } = preferences;
  
  if (interests === 'surprise me') {
    return `
      Generate an innovative business idea based on current market trends and opportunities.
      The business idea should be specific, practical, and have clear potential for profitability.
      Make it unique, creative, and different from common business ideas.
      Provide more depth and nuanced market insights in your response.
      
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
    Include more detailed market insights and business model analysis in your response.
    
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
    console.log('Parsing response text:', text.substring(0, 100) + '...');
    
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
        "Scalable business model",
        "Low startup costs",
        "Clear path to profitability"
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
    console.error('Error parsing business idea response:', error, 'Raw text:', text);
    // Return a fallback response instead of throwing an error
    return {
      businessName: "Fallback Business Idea",
      description: "A modern business addressing current market needs with innovative solutions.",
      targetMarket: "Tech-savvy consumers and businesses looking for efficiency improvements.",
      revenueModel: "Subscription-based service with premium features and add-ons.",
      whyItWorks: [
        "Addresses a growing market need",
        "Scalable business model",
        "Low startup costs",
        "Clear path to profitability"
      ]
    };
  }
}

// Re-export the necessary types from the businessIdeas directory
export type { BusinessIdeaPreferences, BusinessIdeaSuggestion };
