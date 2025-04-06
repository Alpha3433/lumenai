import { callOpenAI } from '../openaiService';
import { BusinessFormData } from '../planGenerator';

export interface RoadmapPhase {
  title: string;
  description: string;
  items: string[];
  dependencies?: string;
}

export interface TechnologyRoadmap {
  q1: RoadmapPhase;
  q3: RoadmapPhase;
  future: RoadmapPhase;
}

/**
 * Generate technology roadmap using OpenAI based on business info
 */
export const generateTechnologyRoadmap = async (formData: BusinessFormData): Promise<TechnologyRoadmap> => {
  try {
    const prompt = createRoadmapPrompt(formData);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1000
    });
    
    if (!response.success) {
      console.error('Error generating technology roadmap:', response.error);
      return getDefaultRoadmap(formData.businessName, formData.businessDescription);
    }
    
    try {
      // Try to parse the response as JSON
      const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || 
                        response.text.match(/```([\s\S]*?)```/) ||
                        [null, response.text];
      
      const jsonStr = jsonMatch[1] || response.text;
      const data = JSON.parse(jsonStr);
      
      return {
        q1: data.q1 || getDefaultRoadmap(formData.businessName, formData.businessDescription).q1,
        q3: data.q3 || getDefaultRoadmap(formData.businessName, formData.businessDescription).q3,
        future: data.future || getDefaultRoadmap(formData.businessName, formData.businessDescription).future
      };
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return getDefaultRoadmap(formData.businessName, formData.businessDescription);
    }
  } catch (error) {
    console.error('Error in generateTechnologyRoadmap:', error);
    return getDefaultRoadmap(formData.businessName, formData.businessDescription);
  }
};

/**
 * Create a prompt for OpenAI to generate technology roadmap
 */
function createRoadmapPrompt(formData: BusinessFormData): string {
  const currentYear = new Date().getFullYear();
  
  return `
Generate a detailed technology roadmap for a business with the following details:
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

Based on the business type and industry, create a comprehensive technology roadmap with the following phases:
1. Q1 ${currentYear}: Near-term technical priorities
2. Q3 ${currentYear}: Mid-term technical development
3. ${currentYear + 1}: Long-term technical vision

For each phase, provide:
- A concise title describing the focus of that phase
- A brief description of the overall goal
- 4-5 specific technical features or capabilities to be developed
- For Q3, include any dependencies on Q1 deliverables

Return ONLY a JSON object with the following structure (and nothing else):
{
  "q1": {
    "title": "Short title for Q1 focus",
    "description": "Brief description of Q1 focus",
    "items": [
      "First technical feature",
      "Second technical feature",
      "Third technical feature",
      "Fourth technical feature"
    ]
  },
  "q3": {
    "title": "Short title for Q3 focus",
    "description": "Brief description of Q3 focus",
    "items": [
      "First technical feature",
      "Second technical feature",
      "Third technical feature",
      "Fourth technical feature"
    ],
    "dependencies": "Brief description of Q1 dependencies"
  },
  "future": {
    "title": "Short title for ${currentYear + 1} focus",
    "description": "Brief description of ${currentYear + 1} focus",
    "items": [
      "First technical feature",
      "Second technical feature",
      "Third technical feature",
      "Fourth technical feature",
      "Fifth technical feature"
    ]
  }
}
`;
}

/**
 * Generate default roadmap when OpenAI fails or is not available
 */
function getDefaultRoadmap(businessName: string, businessDescription: string): TechnologyRoadmap {
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');
  
  const isTechBusiness = businessDescription.toLowerCase().includes('tech') || 
                       businessDescription.toLowerCase().includes('software') || 
                       businessDescription.toLowerCase().includes('app');
  
  const isEducationBusiness = businessDescription.toLowerCase().includes('education') || 
                            businessDescription.toLowerCase().includes('learning') || 
                            businessDescription.toLowerCase().includes('teaching');

  // Generate roadmap based on business type
  if (isHealthBusiness) {
    return {
      q1: {
        title: "Core Health Platform",
        description: "Focus on building essential health tracking features and integrations.",
        items: [
          "Wearable device integration",
          "Health metrics dashboard",
          "User profile creation",
          "Basic data visualization"
        ]
      },
      q3: {
        title: "Advanced Health Features",
        description: "Develop specialized health monitoring and analytics capabilities.",
        items: [
          "AI-driven health recommendations",
          "Mental wellness modules",
          "Telehealth integration",
          "Custom health reports"
        ],
        dependencies: "Requires Q1 health metrics foundation"
      },
      future: {
        title: "Health Ecosystem",
        description: "Create a comprehensive health management platform with extended capabilities.",
        items: [
          "Healthcare provider network",
          "Insurance integration",
          "Personalized health programs",
          "Community wellness features",
          "Machine learning health predictions"
        ]
      }
    };
  } else if (isTechBusiness) {
    return {
      q1: {
        title: "Technology Foundation",
        description: "Build core infrastructure and development frameworks.",
        items: [
          "API framework implementation",
          "User authentication system",
          "Core feature development",
          "Performance optimization"
        ]
      },
      q3: {
        title: "Advanced Tech Capabilities",
        description: "Implement sophisticated functionality and integration options.",
        items: [
          "Machine learning pipeline",
          "Third-party API integrations",
          "Advanced analytics suite",
          "Developer portal and documentation"
        ],
        dependencies: "Requires Q1 API framework"
      },
      future: {
        title: "Tech Ecosystem Expansion",
        description: "Create a comprehensive platform with cutting-edge capabilities.",
        items: [
          "AI-powered automation",
          "Blockchain integration options",
          "IoT device connectivity",
          "Enterprise control center",
          "Advanced security framework"
        ]
      }
    };
  } else if (isEducationBusiness) {
    return {
      q1: {
        title: "Learning Platform Foundation",
        description: "Develop core educational tools and content management system.",
        items: [
          "Course creation tools",
          "Student management system",
          "Basic assessment features",
          "Content library structure"
        ]
      },
      q3: {
        title: "Advanced Educational Features",
        description: "Implement specialized learning tools and analytics.",
        items: [
          "AI-powered learning paths",
          "Interactive assessment tools",
          "Progress tracking analytics",
          "Virtual classroom features"
        ],
        dependencies: "Requires Q1 content management system"
      },
      future: {
        title: "Education Ecosystem",
        description: "Build a comprehensive platform for diverse learning needs.",
        items: [
          "AR/VR learning experiences",
          "Career development integration",
          "Industry certification paths",
          "Global learning community",
          "Enterprise learning management"
        ]
      }
    };
  } else {
    // Default roadmap for other business types
    return {
      q1: {
        title: "Core Platform Development",
        description: "Focus on building essential features and establishing the foundation.",
        items: [
          "User onboarding flow",
          "Core functionality development",
          "Basic analytics dashboard",
          "Mobile responsiveness"
        ]
      },
      q3: {
        title: "Advanced Features & Integration",
        description: "Expand capabilities and integrate with complementary services.",
        items: [
          "Advanced user customization",
          "Third-party integrations",
          "Enhanced reporting features",
          "Automation capabilities"
        ],
        dependencies: "Requires Q1 core functionality"
      },
      future: {
        title: "Platform Ecosystem Growth",
        description: "Transform into a comprehensive solution with expanded capabilities.",
        items: [
          "AI-powered recommendations",
          "Enterprise-grade features",
          "Marketplace development",
          "Advanced automation",
          "Global expansion features"
        ]
      }
    };
  }
}
