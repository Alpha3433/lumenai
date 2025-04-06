
import { callOpenAI } from '../openaiService';
import { BusinessFormData } from '../planGenerator';

export interface ComplianceRequirement {
  name: string;
  description: string;
}

export interface ComplianceCategory {
  criticality: "CRITICAL" | "REQUIRED" | "CONDITIONAL" | "OPTIONAL";
  description: string;
  requirements: ComplianceRequirement[];
  resources?: string[];
}

export interface ComplianceData {
  hipaaCompliance: ComplianceCategory;
  gdprCompliance: ComplianceCategory;
  fdaGuidelines: ComplianceCategory;
}

/**
 * Generate regulatory compliance data using OpenAI based on business info
 */
export const generateComplianceData = async (formData: BusinessFormData): Promise<ComplianceData> => {
  try {
    const prompt = createCompliancePrompt(formData);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1000
    });
    
    if (!response.success) {
      console.error('Error generating compliance data:', response.error);
      return getDefaultComplianceData(formData.businessName, formData.businessDescription);
    }
    
    try {
      // Try to parse the response as JSON
      const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || 
                        response.text.match(/```([\s\S]*?)```/) ||
                        [null, response.text];
      
      const jsonStr = jsonMatch[1] || response.text;
      const data = JSON.parse(jsonStr);
      
      return {
        hipaaCompliance: data.hipaaCompliance || getDefaultComplianceData(formData.businessName, formData.businessDescription).hipaaCompliance,
        gdprCompliance: data.gdprCompliance || getDefaultComplianceData(formData.businessName, formData.businessDescription).gdprCompliance,
        fdaGuidelines: data.fdaGuidelines || getDefaultComplianceData(formData.businessName, formData.businessDescription).fdaGuidelines
      };
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return getDefaultComplianceData(formData.businessName, formData.businessDescription);
    }
  } catch (error) {
    console.error('Error in generateComplianceData:', error);
    return getDefaultComplianceData(formData.businessName, formData.businessDescription);
  }
};

/**
 * Create a prompt for OpenAI to generate compliance data
 */
function createCompliancePrompt(formData: BusinessFormData): string {
  return `
Generate regulatory compliance recommendations for a business with the following details:
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business type and industry, analyze what regulatory frameworks would apply. Generate recommendations for each of these compliance categories:

1. HIPAA Compliance (health data privacy): Determine if this is CRITICAL, REQUIRED, CONDITIONAL, or OPTIONAL for the business.
2. GDPR Compliance (EU data protection): Determine if this is CRITICAL, REQUIRED, CONDITIONAL, or OPTIONAL for the business.
3. FDA Guidelines (for health products): Determine if this is CRITICAL, REQUIRED, CONDITIONAL, or OPTIONAL for the business.

For each category, provide:
- A short description of why it matters for this business
- 4 specific requirements or actions needed for compliance
- 2 resources where they can learn more

Return ONLY a JSON object with the following structure (and nothing else):
{
  "hipaaCompliance": {
    "criticality": "CRITICAL|REQUIRED|CONDITIONAL|OPTIONAL",
    "description": "Brief description of why HIPAA matters for this business",
    "requirements": [
      {
        "name": "Requirement 1 Name",
        "description": "Description of requirement 1"
      },
      {
        "name": "Requirement 2 Name",
        "description": "Description of requirement 2"
      },
      {
        "name": "Requirement 3 Name",
        "description": "Description of requirement 3"
      },
      {
        "name": "Requirement 4 Name",
        "description": "Description of requirement 4"
      }
    ],
    "resources": ["Resource 1", "Resource 2"]
  },
  "gdprCompliance": {
    "criticality": "CRITICAL|REQUIRED|CONDITIONAL|OPTIONAL",
    "description": "Brief description of why GDPR matters for this business",
    "requirements": [
      {
        "name": "Requirement 1 Name",
        "description": "Description of requirement 1"
      },
      {
        "name": "Requirement 2 Name",
        "description": "Description of requirement 2"
      },
      {
        "name": "Requirement 3 Name",
        "description": "Description of requirement 3"
      },
      {
        "name": "Requirement 4 Name",
        "description": "Description of requirement 4"
      }
    ],
    "resources": ["Resource 1", "Resource 2"]
  },
  "fdaGuidelines": {
    "criticality": "CRITICAL|REQUIRED|CONDITIONAL|OPTIONAL",
    "description": "Brief description of why FDA guidelines matter for this business",
    "requirements": [
      {
        "name": "Requirement 1 Name",
        "description": "Description of requirement 1"
      },
      {
        "name": "Requirement 2 Name",
        "description": "Description of requirement 2"
      },
      {
        "name": "Requirement 3 Name", 
        "description": "Description of requirement 3"
      },
      {
        "name": "Requirement 4 Name",
        "description": "Description of requirement 4"
      }
    ],
    "resources": ["Resource 1", "Resource 2"]
  }
}
`;
}

/**
 * Generate default compliance data when OpenAI fails
 */
function getDefaultComplianceData(businessName: string, businessDescription: string): ComplianceData {
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');
  
  const isDataBusiness = businessDescription.toLowerCase().includes('data') || 
                       businessDescription.toLowerCase().includes('analytics') || 
                       businessDescription.toLowerCase().includes('information');
  
  const isFinanceBusiness = businessDescription.toLowerCase().includes('finance') || 
                          businessDescription.toLowerCase().includes('payment') || 
                          businessDescription.toLowerCase().includes('banking');

  // HIPAA Compliance
  const hipaaCompliance = {
    criticality: isHealthBusiness ? "CRITICAL" : "CONDITIONAL" as "CRITICAL" | "REQUIRED" | "CONDITIONAL" | "OPTIONAL",
    description: isHealthBusiness 
      ? "Health Insurance Portability and Accountability Act regulations are essential for your health-related business. Strict compliance is required for all health data."
      : "If you collect any health-related information, even indirectly, HIPAA compliance may be required.",
    requirements: [
      {
        name: "Data Encryption",
        description: "All health data must be encrypted at rest and during transmission using industry-standard protocols."
      },
      {
        name: "Access Controls",
        description: "Role-based access controls for staff and limited data access based on necessity."
      },
      {
        name: "Security Audits",
        description: "Regular security audits and vulnerability assessments must be conducted."
      },
      {
        name: "Breach Notification Plan",
        description: "Protocol for notifying users of any data breaches within required timeframes."
      }
    ],
    resources: [
      "HHS.gov HIPAA Guidelines",
      "NIST Security Framework"
    ]
  };
  
  // GDPR Compliance
  const gdprCompliance = {
    criticality: "REQUIRED" as "CRITICAL" | "REQUIRED" | "CONDITIONAL" | "OPTIONAL",
    description: "General Data Protection Regulation requirements for handling EU users' data and privacy. These regulations apply to any business with EU customers.",
    requirements: [
      {
        name: "Cookie Consent",
        description: "Clear consent mechanism for cookie use and data collection."
      },
      {
        name: "EU Data Storage",
        description: isDataBusiness ? "EU user data must be stored on EU-based servers or with appropriate safeguards and legal frameworks." : "EU user data requires special handling and appropriate safeguards."
      },
      {
        name: "Right to be Forgotten",
        description: "Mechanism for users to request deletion of their personal data."
      },
      {
        name: "Privacy Policy",
        description: "Comprehensive privacy policy explaining all data collection and usage."
      }
    ],
    resources: [
      "EU GDPR Portal",
      "ICO Guidelines"
    ]
  };
  
  // FDA Guidelines
  const fdaGuidelines = {
    criticality: isHealthBusiness ? "REQUIRED" : "CONDITIONAL" as "CRITICAL" | "REQUIRED" | "CONDITIONAL" | "OPTIONAL",
    description: isHealthBusiness 
      ? "Food and Drug Administration regulations for health-related applications and services. Compliance is mandatory for your health business."
      : "These guidelines may apply if your product makes health-related claims or could be considered a digital health product.",
    requirements: [
      {
        name: "Medical Advice Disclaimers",
        description: "Clear disclaimers that the app is not providing medical advice."
      },
      {
        name: "Doctor Consultation Prompts",
        description: "Recommendations to consult healthcare providers before following advice."
      },
      {
        name: "Medical Device Classification",
        description: "Ensure app is not classified as a medical device requiring FDA approval, or obtain necessary approvals."
      },
      {
        name: isFinanceBusiness ? "Financial Disclaimers" : "Health Claims Substantiation",
        description: isFinanceBusiness 
          ? "Clear statements regarding financial information and not providing financial advice."
          : "Scientific evidence must back any health-related claims made by the product."
      }
    ],
    resources: [
      "FDA Digital Health Policies",
      "Mobile Medical Applications Guidance"
    ]
  };

  return { hipaaCompliance, gdprCompliance, fdaGuidelines };
}
