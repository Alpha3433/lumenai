
import { callOpenAI } from '../openaiService';
import { BusinessFormData } from '../planGenerator';

export interface InfluencerTarget {
  name: string;
  platform: string;
  audience: string;
}

export interface HealthcareProviderTarget {
  name: string;
  status: string;
  timeline: string;
  value: string;
}

export interface InsuranceProgram {
  name: string;
  description: string;
  timeline: string;
  impact: string;
}

export interface PartnerTier {
  name: string;
  description: string;
}

export interface PartnershipData {
  influencers: {
    description: string;
    targets: InfluencerTarget[];
  };
  healthcareProviders: {
    description: string;
    targets: HealthcareProviderTarget[];
  };
  insuranceCompanies: {
    description: string;
    programs: InsuranceProgram[];
  };
  affiliateProgram: {
    description: string;
    commissionRate: string;
    commissionDetails: string;
    partnerTiers: PartnerTier[];
    coBranding: string[];
  };
}

/**
 * Generate partnership data using OpenAI based on business info
 */
export const generatePartnershipData = async (formData: BusinessFormData): Promise<PartnershipData> => {
  try {
    const prompt = createPartnershipPrompt(formData);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1200
    });
    
    if (!response.success) {
      console.error('Error generating partnership data:', response.error);
      return getDefaultPartnershipData(formData.businessName, formData.businessDescription);
    }
    
    try {
      // Try to parse the response as JSON
      const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || 
                        response.text.match(/```([\s\S]*?)```/) ||
                        [null, response.text];
      
      const jsonStr = jsonMatch[1] || response.text;
      const data = JSON.parse(jsonStr);
      
      return {
        influencers: data.influencers || getDefaultPartnershipData(formData.businessName, formData.businessDescription).influencers,
        healthcareProviders: data.healthcareProviders || getDefaultPartnershipData(formData.businessName, formData.businessDescription).healthcareProviders,
        insuranceCompanies: data.insuranceCompanies || getDefaultPartnershipData(formData.businessName, formData.businessDescription).insuranceCompanies,
        affiliateProgram: data.affiliateProgram || getDefaultPartnershipData(formData.businessName, formData.businessDescription).affiliateProgram
      };
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return getDefaultPartnershipData(formData.businessName, formData.businessDescription);
    }
  } catch (error) {
    console.error('Error in generatePartnershipData:', error);
    return getDefaultPartnershipData(formData.businessName, formData.businessDescription);
  }
};

/**
 * Create a prompt for OpenAI to generate partnership data
 */
function createPartnershipPrompt(formData: BusinessFormData): string {
  return `
Generate a detailed partnership strategy for a business with the following details:
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business type and industry, create a comprehensive partnership plan with the following sections:

1. Influencer Partnerships: 6 types of influencers that would be good partners
2. Institutional Partnerships: 4 types of institutions/organizations that would be good partners
3. Strategic Alliance Programs: 4 types of strategic alliance programs
4. Affiliate Program: Details about commission structure, partner tiers, and co-branding opportunities

Return ONLY a JSON object with the following structure (and nothing else):
{
  "influencers": {
    "description": "A brief description of why influencer partnerships make sense for this business",
    "targets": [
      {
        "name": "Influencer category 1",
        "platform": "Platform(s) where they are active",
        "audience": "Description of their audience"
      },
      // 5 more similar objects
    ]
  },
  "healthcareProviders": {
    "description": "A brief description of institutional partnerships for this business (rename this field as appropriate for the business)",
    "targets": [
      {
        "name": "Institution type 1",
        "status": "Contacted/Negotiating/Scheduled/Pending",
        "timeline": "Q1/Q2/Q3/Q4 2024",
        "value": "High/Medium/Very High/Low"
      },
      // 3 more similar objects
    ]
  },
  "insuranceCompanies": {
    "description": "A brief description of strategic alliances for this business (rename this field as appropriate for the business)",
    "programs": [
      {
        "name": "Program 1",
        "description": "Brief description of this program",
        "timeline": "Estimated timeline (e.g., 3-6 months)",
        "impact": "Expected impact (e.g., 10,000+ new users)"
      },
      // 3 more similar objects
    ]
  },
  "affiliateProgram": {
    "description": "A brief description of the affiliate program for this business",
    "commissionRate": "XX%",
    "commissionDetails": "Brief explanation of the commission structure",
    "partnerTiers": [
      {
        "name": "Bronze",
        "description": "Description of bronze-tier partners"
      },
      {
        "name": "Silver",
        "description": "Description of silver-tier partners"
      },
      {
        "name": "Gold",
        "description": "Description of gold-tier partners"
      }
    ],
    "coBranding": [
      "Co-branding opportunity 1 with specific company name",
      "Co-branding opportunity 2 with specific company name",
      "Co-branding opportunity 3 with specific company name"
    ]
  }
}

Customize the names and content based on the business type. For example, if it's a health business, use "Healthcare Providers" instead of "Institutional Partners" if appropriate.
`;
}

/**
 * Generate default partnership data when OpenAI fails
 */
function getDefaultPartnershipData(businessName: string, businessDescription: string): PartnershipData {
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');
  
  const isTechBusiness = businessDescription.toLowerCase().includes('tech') || 
                       businessDescription.toLowerCase().includes('software') || 
                       businessDescription.toLowerCase().includes('app');
  
  const isEducationBusiness = businessDescription.toLowerCase().includes('education') || 
                            businessDescription.toLowerCase().includes('learning') || 
                            businessDescription.toLowerCase().includes('teaching');
                            
  const isFinanceBusiness = businessDescription.toLowerCase().includes('finance') || 
                          businessDescription.toLowerCase().includes('payment') || 
                          businessDescription.toLowerCase().includes('banking');

  // Default data that will be customized based on business type
  return {
    // Influencer partnerships
    influencers: {
      description: `Collaborate with relevant influencers who can authentically promote ${businessName} to their engaged audiences.`,
      targets: [
        {
          name: isHealthBusiness ? "Health & Wellness" : 
                isTechBusiness ? "Tech Reviewers" :
                isEducationBusiness ? "EdTech Influencers" :
                isFinanceBusiness ? "Finance Experts" : "Industry Leaders",
          platform: isHealthBusiness ? "Instagram/YouTube" :
                    isTechBusiness ? "YouTube/Twitter" :
                    isEducationBusiness ? "YouTube/LinkedIn" :
                    isFinanceBusiness ? "LinkedIn/Twitter" : "Multiple Platforms",
          audience: "1M+ followers"
        },
        {
          name: isHealthBusiness ? "Medical Professionals" :
                isTechBusiness ? "Developer Advocates" :
                isEducationBusiness ? "Education Thought Leaders" :
                isFinanceBusiness ? "Financial Advisors" : "Professional Network",
          platform: "LinkedIn/Twitter",
          audience: "Industry respect"
        },
        {
          name: isHealthBusiness ? "Transformation Stories" :
                isTechBusiness ? "Tech Early Adopters" :
                isEducationBusiness ? "Student Creators" :
                isFinanceBusiness ? "Personal Finance" : "Success Stories",
          platform: "TikTok/Instagram",
          audience: "Authentic journeys"
        },
        {
          name: isHealthBusiness ? "Corporate Wellness" :
                isTechBusiness ? "Tech Entrepreneurs" :
                isEducationBusiness ? "School Administrators" :
                isFinanceBusiness ? "Corporate Finance" : "B2B Decision Makers",
          platform: "LinkedIn/Podcasts",
          audience: "B2B decision makers"
        },
        {
          name: isHealthBusiness ? "Fitness Experts" :
                isTechBusiness ? "Product Reviewers" :
                isEducationBusiness ? "Educational Content Creators" :
                isFinanceBusiness ? "Investment Specialists" : "Industry Specialists",
          platform: "YouTube/Instagram",
          audience: "Dedicated followers"
        },
        {
          name: isHealthBusiness ? "Lifestyle Bloggers" :
                isTechBusiness ? "Tech Bloggers" :
                isEducationBusiness ? "Parent Bloggers" :
                isFinanceBusiness ? "Financial Bloggers" : "Lifestyle Content",
          platform: "Blogs/Instagram",
          audience: "High engagement"
        }
      ]
    },
    
    // Healthcare/institutional providers
    healthcareProviders: {
      description: isHealthBusiness ? 
        `Partner with healthcare providers to integrate ${businessName} into patient care protocols and expand reach through medical professional networks.` :
        `Identify key institutional partners that can help ${businessName} reach target audiences and provide credibility in the marketplace.`,
      targets: [
        {
          name: isHealthBusiness ? "Regional Medical Centers" :
                isTechBusiness ? "Tech Incubators" :
                isEducationBusiness ? "School Districts" :
                isFinanceBusiness ? "Financial Institutions" : "Industry Associations",
          status: "Contacted",
          timeline: "Q2 2024",
          value: "High"
        },
        {
          name: isHealthBusiness ? "Private Clinics Network" :
                isTechBusiness ? "Startup Accelerators" :
                isEducationBusiness ? "Universities" :
                isFinanceBusiness ? "Investment Firms" : "Trade Organizations",
          status: "Negotiating",
          timeline: "Q1 2024",
          value: "Medium"
        },
        {
          name: isHealthBusiness ? "University Health Systems" :
                isTechBusiness ? "Tech Conferences" :
                isEducationBusiness ? "Education Departments" :
                isFinanceBusiness ? "Banking Partners" : "Research Institutions",
          status: "Scheduled",
          timeline: "Q3 2024",
          value: "Very High"
        },
        {
          name: isHealthBusiness ? "Specialist Practitioner Groups" :
                isTechBusiness ? "Developer Communities" :
                isEducationBusiness ? "Education Technology Vendors" :
                isFinanceBusiness ? "Financial Advisors Network" : "Industry Leaders",
          status: "Pending",
          timeline: "Q4 2024",
          value: "Medium"
        }
      ]
    },
    
    // Insurance companies/strategic alliances
    insuranceCompanies: {
      description: isHealthBusiness ? 
        `Partner with insurance providers to offer subsidized plans or premium discounts for active ${businessName} users.` :
        `Develop strategic relationships with key industry players to create mutual value and expand market reach.`,
      programs: [
        {
          name: isHealthBusiness ? "Wellness Program Integration" :
                isTechBusiness ? "Technology Partnership Program" :
                isEducationBusiness ? "Education Initiative Sponsorship" :
                isFinanceBusiness ? "Financial Solutions Integration" : "Strategic Alliance",
          description: isHealthBusiness ? 
            `Integrate with existing wellness rewards programs to offer premium discounts for regular ${businessName} users.` :
            `Develop mutually beneficial relationships with key industry partners to expand market reach.`,
          timeline: "6-9 months",
          impact: "Potentially 10,000+ new users"
        },
        {
          name: isHealthBusiness ? "Employer Health Plans" :
                isTechBusiness ? "Enterprise Solution Integration" :
                isEducationBusiness ? "Institution-Wide Licensing" :
                isFinanceBusiness ? "Corporate Financial Services" : "B2B Partnership",
          description: isHealthBusiness ?
            `Partner with corporate health insurance plans to offer ${businessName} as a value-added benefit to employees.` :
            `Create B2B relationships that position ${businessName} as an essential service for partner organizations.`,
          timeline: "3-6 months",
          impact: "Corporate partnerships"
        },
        {
          name: isHealthBusiness ? "Outcome-Based Coverage" :
                isTechBusiness ? "Tech Integration Partners" :
                isEducationBusiness ? "Education Content Partnerships" :
                isFinanceBusiness ? "Financial Product Integration" : "Product Integration",
          description: isHealthBusiness ?
            `Develop metrics-based coverage where user achievements on ${businessName} contribute to reduced premiums.` :
            `Create seamless integrations with complementary products and services to enhance user experience.`,
          timeline: "12+ months",
          impact: isHealthBusiness ? "Healthcare cost reduction data" : "Expanded user base"
        },
        {
          name: isHealthBusiness ? "Prevention Programs" :
                isTechBusiness ? "Technology Research Initiatives" :
                isEducationBusiness ? "Educational Research Programs" :
                isFinanceBusiness ? "Financial Research Partnerships" : "Industry Research",
          description: isHealthBusiness ?
            `Position ${businessName} as a preventive healthcare tool for managing chronic conditions and reducing costs.` :
            `Collaborate with research institutions to validate and improve ${businessName}'s effectiveness.`,
          timeline: "9-12 months",
          impact: isHealthBusiness ? "Medical research opportunities" : "Industry credibility"
        }
      ]
    },
    
    // Affiliate program
    affiliateProgram: {
      description: `Create a robust network of partners who can promote ${businessName} to their audiences while earning commissions and benefits.`,
      commissionRate: "20%",
      commissionDetails: `Partners earn 20% of referred user revenue for the first year of subscription.`,
      partnerTiers: [
        {
          name: "Bronze",
          description: isHealthBusiness ? "Fitness Bloggers & Content Creators" : 
                       isTechBusiness ? "Tech Reviewers & Bloggers" :
                       isEducationBusiness ? "Education Content Creators" :
                       isFinanceBusiness ? "Financial Content Creators" : "Content Creators"
        },
        {
          name: "Silver",
          description: isHealthBusiness ? "Trainers & Fitness Professionals" :
                       isTechBusiness ? "Software Developers & Agencies" :
                       isEducationBusiness ? "Teachers & Educational Organizations" :
                       isFinanceBusiness ? "Financial Advisors & Planners" : "Industry Professionals"
        },
        {
          name: "Gold",
          description: isHealthBusiness ? "Clinics & Health Organizations" :
                       isTechBusiness ? "Enterprise Partners & Platforms" :
                       isEducationBusiness ? "Universities & Educational Institutions" :
                       isFinanceBusiness ? "Financial Institutions" : "Enterprise Partners"
        }
      ],
      coBranding: [
        isHealthBusiness ? `${businessName} x Peloton challenges` :
        isTechBusiness ? `${businessName} x Microsoft integration` :
        isEducationBusiness ? `${businessName} x Khan Academy program` :
        isFinanceBusiness ? `${businessName} x Quickbooks integration` : `${businessName} partner program`,
        
        isHealthBusiness ? `${businessName} branded fitness equipment` :
        isTechBusiness ? `Co-hosted tech webinars` :
        isEducationBusiness ? `Co-branded educational materials` :
        isFinanceBusiness ? `Financial wellness workshops` : `Co-branded promotional campaigns`,
        
        isHealthBusiness ? `Wellness retreat sponsorships` :
        isTechBusiness ? `Technology conference partnerships` :
        isEducationBusiness ? `Educational conference sponsorships` :
        isFinanceBusiness ? `Financial summit sponsorships` : `Industry event collaborations`
      ]
    }
  };
}
