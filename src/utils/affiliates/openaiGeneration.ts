
import { callOpenAI } from '../openaiService';
import { BusinessFormData } from '../planGenerator';

export interface AffiliatePartnerTier {
  name: string;
  description: string;
  color: string;
}

export interface AffiliateProgram {
  commissionRate: string;
  commissionDescription: string;
  partnerTiers: AffiliatePartnerTier[];
  coBrandingOpportunities: string[];
}

/**
 * Generate affiliate program details using OpenAI based on business info
 */
export const generateAffiliateProgram = async (formData: BusinessFormData): Promise<AffiliateProgram> => {
  try {
    const prompt = createAffiliatePrompt(formData);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 800
    });
    
    if (!response.success) {
      console.error('Error generating affiliate program:', response.error);
      return getDefaultAffiliateProgram(formData.businessName, formData.businessDescription);
    }
    
    try {
      // Try to parse the response as JSON
      // OpenAI sometimes returns markdown, so we need to extract the JSON
      const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || 
                        response.text.match(/```([\s\S]*?)```/) ||
                        [null, response.text];
      
      const jsonStr = jsonMatch[1] || response.text;
      const data = JSON.parse(jsonStr);
      
      return {
        commissionRate: data.commissionRate || "20%",
        commissionDescription: data.commissionDescription || `Partners earn 20% of referred user revenue for the first year of subscription.`,
        partnerTiers: data.partnerTiers || getDefaultPartnerTiers(formData.businessName, formData.businessDescription),
        coBrandingOpportunities: data.coBrandingOpportunities || getDefaultCoBrandingOpportunities(formData.businessName)
      };
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return getDefaultAffiliateProgram(formData.businessName, formData.businessDescription);
    }
  } catch (error) {
    console.error('Error in generateAffiliateProgram:', error);
    return getDefaultAffiliateProgram(formData.businessName, formData.businessDescription);
  }
};

/**
 * Create a prompt for OpenAI to generate affiliate program details
 */
function createAffiliatePrompt(formData: BusinessFormData): string {
  return `
Generate a detailed affiliate and partnership program for a business with the following details:
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business type and industry, create a comprehensive affiliate program with the following elements:
1. Commission Rate: A percentage that partners would earn (e.g., 15%, 20%, 25%)
2. Commission Description: A brief explanation of the commission structure
3. Partner Tiers: Three tiers (Bronze, Silver, Gold) with descriptions of what type of partners fit each tier
4. Co-Branding Opportunities: Three specific co-branding ideas that would work well for this business

Return ONLY a JSON object with the following structure (and nothing else):
{
  "commissionRate": "XX%",
  "commissionDescription": "Brief description of the commission structure",
  "partnerTiers": [
    {
      "name": "Bronze",
      "description": "Description of bronze-level partners",
      "color": "#CD7F32"
    },
    {
      "name": "Silver",
      "description": "Description of silver-level partners",
      "color": "#C0C0C0"
    },
    {
      "name": "Gold",
      "description": "Description of gold-level partners",
      "color": "#FFD700"
    }
  ],
  "coBrandingOpportunities": [
    "First co-branding opportunity with a specific company name",
    "Second co-branding opportunity with a specific company name",
    "Third co-branding opportunity with a specific company name"
  ]
}
`;
}

/**
 * Generate default affiliate program when OpenAI fails or is not available
 */
function getDefaultAffiliateProgram(businessName: string, businessDescription: string): AffiliateProgram {
  return {
    commissionRate: "20%",
    commissionDescription: `Partners earn 20% of referred user revenue for the first year of subscription.`,
    partnerTiers: getDefaultPartnerTiers(businessName, businessDescription),
    coBrandingOpportunities: getDefaultCoBrandingOpportunities(businessName)
  };
}

/**
 * Generate default partner tiers based on business type
 */
function getDefaultPartnerTiers(businessName: string, businessDescription: string): AffiliatePartnerTier[] {
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');

  const isTechBusiness = businessDescription.toLowerCase().includes('tech') || 
                       businessDescription.toLowerCase().includes('software') || 
                       businessDescription.toLowerCase().includes('app');

  const isEducationBusiness = businessDescription.toLowerCase().includes('education') || 
                            businessDescription.toLowerCase().includes('learning') || 
                            businessDescription.toLowerCase().includes('teaching');

  return [
    {
      name: "Bronze",
      description: isHealthBusiness ? "Fitness Bloggers & Influencers" : 
                   isTechBusiness ? "Tech Reviewers & Bloggers" : 
                   isEducationBusiness ? "Educational Content Creators" : "Content Creators",
      color: "#CD7F32"
    },
    {
      name: "Silver", 
      description: isHealthBusiness ? "Personal Trainers & Coaches" : 
                   isTechBusiness ? "Software Developers & Agencies" : 
                   isEducationBusiness ? "Teachers & Educational Institutions" : "Business Partners",
      color: "#C0C0C0"
    },
    {
      name: "Gold",
      description: isHealthBusiness ? "Clinics & Healthcare Providers" : 
                   isTechBusiness ? "Enterprise Partners & Platforms" : 
                   isEducationBusiness ? "Universities & EdTech Companies" : "Premium Partners",
      color: "#FFD700"
    }
  ];
}

/**
 * Generate default co-branding opportunities
 */
function getDefaultCoBrandingOpportunities(businessName: string): string[] {
  return [
    `${businessName} x Market Leader joint promotion`,
    `${businessName} branded merchandise and products`,
    `Co-hosted events with industry influencers`
  ];
}
