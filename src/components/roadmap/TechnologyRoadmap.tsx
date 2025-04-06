
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

interface TechnologyRoadmapProps {
  businessName: string;
  businessDescription: string;
}

const TechnologyRoadmap: React.FC<TechnologyRoadmapProps> = ({
  businessName,
  businessDescription
}) => {
  // Generate roadmap milestones based on business description
  const roadmap = generateRoadmap(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Technology Roadmap
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Future development planning
        </div>
      </div>

      <Card className="border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-8">
            {roadmap.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-24 flex-shrink-0">
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-800 dark:text-blue-300 text-sm font-medium text-center">
                    {milestone.timeline}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{milestone.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {milestone.features.map((feature, i) => (
                      <div key={i} className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded text-sm border border-gray-200 dark:border-gray-800">
                        {feature}
                      </div>
                    ))}
                  </div>
                  {milestone.dependencies && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dependencies: {milestone.dependencies}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

function generateRoadmap(businessName: string, businessDescription: string) {
  // Identify industry/domain from business description
  const description = businessDescription.toLowerCase();
  let industry = "general";
  
  if (description.includes('health') || description.includes('fitness') || description.includes('wellness')) {
    industry = "health";
  } else if (description.includes('finance') || description.includes('banking') || description.includes('invest')) {
    industry = "finance";
  } else if (description.includes('education') || description.includes('learning') || description.includes('teach')) {
    industry = "education";
  } else if (description.includes('ecommerce') || description.includes('shop') || description.includes('retail')) {
    industry = "ecommerce";
  } else if (description.includes('food') || description.includes('restaurant') || description.includes('delivery')) {
    industry = "food";
  } else if (description.includes('tech') || description.includes('software') || description.includes('app')) {
    industry = "tech";
  }

  // Define roadmap features based on industry
  const industryRoadmaps = {
    "health": [
      {
        timeline: "Q1 2024",
        title: "Foundational Health Platform",
        description: "Establish core health tracking functionality with essential integrations.",
        features: [
          "Wearable Device Integration",
          "Health Metrics Dashboard",
          "HIPAA-Compliant Data Storage",
          "Basic Telehealth Features"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Personalized Health Insights",
        description: "Implement AI-driven health analysis and personalization features.",
        features: [
          "AI Health Assistant",
          "Personalized Workout Recommendations",
          "Nutrition Analysis",
          "Mental Wellbeing Tracking",
          "Healthcare Provider Portal"
        ],
        dependencies: "Requires Q1 Health Metrics Dashboard"
      },
      {
        timeline: "2025",
        title: "Comprehensive Health Ecosystem",
        description: "Expand into a full-featured health management platform.",
        features: [
          "Prescription Management",
          "Medical Records Integration",
          "Family Health Profiles",
          "Research Participation Platform",
          "Insurance Integration",
          "Health Community Features"
        ]
      }
    ],
    "finance": [
      {
        timeline: "Q1 2024",
        title: "Financial Management Core",
        description: "Deliver essential financial tracking and analysis capabilities.",
        features: [
          "Multi-Account Dashboard",
          "Spending Analytics",
          "Secure Banking Connections",
          "Basic Budget Tools"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Intelligent Financial Planning",
        description: "Add predictive capabilities and advanced planning tools.",
        features: [
          "AI Financial Advisor",
          "Goal-Based Savings",
          "Investment Portfolio Analysis",
          "Tax Optimization Suggestions",
          "Retirement Planning"
        ],
        dependencies: "Requires Q1 Spending Analytics"
      },
      {
        timeline: "2025",
        title: "Comprehensive Financial Suite",
        description: "Transform into a holistic financial management platform.",
        features: [
          "Wealth Management Tools",
          "Estate Planning",
          "Business Finance Integration",
          "Real Estate Investment Analysis",
          "International Currency Support",
          "Financial Education Platform"
        ]
      }
    ],
    "education": [
      {
        timeline: "Q1 2024",
        title: "Learning Platform Foundation",
        description: "Create core educational content delivery and progress tracking.",
        features: [
          "Course Management System",
          "Learning Path Creator",
          "Assessment Engine",
          "Basic Progress Analytics"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Adaptive Learning Experience",
        description: "Integrate personalized learning and advanced assessment capabilities.",
        features: [
          "AI Learning Assistant",
          "Personalized Curriculum",
          "Interactive Content Tools",
          "Peer Collaboration Features",
          "Certification System"
        ],
        dependencies: "Requires Q1 Assessment Engine"
      },
      {
        timeline: "2025",
        title: "Complete Education Ecosystem",
        description: "Expand into a comprehensive platform for lifelong learning.",
        features: [
          "Virtual Classroom Environment",
          "Industry Skills Alignment",
          "Employer Partnership Portal",
          "Advanced Analytics Dashboard",
          "Research Tools Integration",
          "Global Learning Communities"
        ]
      }
    ],
    "ecommerce": [
      {
        timeline: "Q1 2024",
        title: "Commerce Platform Core",
        description: "Establish fundamental online shopping experience and business tools.",
        features: [
          "Product Catalog Management",
          "Payment Processing Integration",
          "Order Fulfillment Workflow",
          "Customer Account System"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Enhanced Shopping Experience",
        description: "Implement advanced merchandising and customer engagement features.",
        features: [
          "AI Product Recommendations",
          "Personalized Shopping",
          "Customer Loyalty Program",
          "Advanced Search Capabilities",
          "Omnichannel Integration"
        ],
        dependencies: "Requires Q1 Customer Account System"
      },
      {
        timeline: "2025",
        title: "Complete Commerce Ecosystem",
        description: "Transform into a comprehensive retail management platform.",
        features: [
          "Marketplace Expansion",
          "Subscription Commerce Tools",
          "Advanced Inventory Forecasting",
          "Global Logistics Integration",
          "AR/VR Shopping Experience",
          "Enterprise Retail Analytics"
        ]
      }
    ],
    "food": [
      {
        timeline: "Q1 2024",
        title: "Food Service Essentials",
        description: "Develop core ordering and delivery management functionality.",
        features: [
          "Menu Management System",
          "Order Processing Workflow",
          "Delivery Tracking",
          "Customer Preference Profiles"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Enhanced Culinary Experience",
        description: "Implement personalization and operational optimization features.",
        features: [
          "AI Menu Recommendations",
          "Dietary Restriction Tools",
          "Restaurant Analytics Suite",
          "Loyalty & Rewards Program",
          "Kitchen Operations Dashboard"
        ],
        dependencies: "Requires Q1 Customer Preference Profiles"
      },
      {
        timeline: "2025",
        title: "Complete Food Service Platform",
        description: "Expand into a comprehensive food industry solution.",
        features: [
          "Inventory & Supply Chain Management",
          "Meal Planning Services",
          "Ghost Kitchen Integration",
          "Food Quality Monitoring",
          "Sustainability Metrics",
          "Food Industry Marketplace"
        ]
      }
    ],
    "tech": [
      {
        timeline: "Q1 2024",
        title: "Technology Platform Foundation",
        description: "Build core infrastructure and developer tools.",
        features: [
          "API Framework",
          "Developer Documentation",
          "Authentication System",
          "Performance Monitoring"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Advanced Technical Capabilities",
        description: "Implement sophisticated functionality and integration options.",
        features: [
          "Machine Learning Pipeline",
          "Advanced Analytics Suite",
          "Integration Marketplace",
          "Customization Framework",
          "Enterprise Control Center"
        ],
        dependencies: "Requires Q1 API Framework"
      },
      {
        timeline: "2025",
        title: "Technology Ecosystem Expansion",
        description: "Create a comprehensive platform with cutting-edge capabilities.",
        features: [
          "Industry-specific Solutions",
          "Edge Computing Support",
          "Blockchain Integration",
          "Advanced Security Framework",
          "IoT Device Management",
          "Digital Twin Capabilities"
        ]
      }
    ],
    "general": [
      {
        timeline: "Q1 2024",
        title: "Core Platform Enhancements",
        description: "Focus on improving the foundation of our platform with essential integrations and features.",
        features: [
          "API Improvements",
          "Wearable Device Integration",
          "Performance Optimization",
          "Enhanced Mobile App"
        ]
      },
      {
        timeline: "Q3 2024",
        title: "Advanced User Experience",
        description: "Elevate the user experience with specialized features addressing advanced use cases.",
        features: [
          "AI-Driven Recommendations",
          "Mental Health Modules",
          "Comprehensive Analytics",
          "Customization Options",
          "White-Label Solutions"
        ],
        dependencies: "Requires Q1 API improvements"
      },
      {
        timeline: "2025",
        title: "Ecosystem Expansion",
        description: "Transform the platform into a comprehensive ecosystem with extended capabilities.",
        features: [
          "Marketplace Integration",
          "AI-Driven Grocery List Generator",
          "Partner Platform",
          "Enterprise Solutions",
          "International Localization",
          "Advanced Data Analytics"
        ]
      }
    ]
  };
  
  return industryRoadmaps[industry];
}

export default TechnologyRoadmap;
