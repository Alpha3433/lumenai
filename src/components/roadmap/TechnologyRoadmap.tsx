
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Code, Laptop } from 'lucide-react';

interface TechnologyRoadmapProps {
  businessName: string;
  businessDescription: string;
}

const TechnologyRoadmap: React.FC<TechnologyRoadmapProps> = ({
  businessName,
  businessDescription
}) => {
  const roadmap = generateRoadmapData(businessName, businessDescription);
  
  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Technology Roadmap
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Future development planning
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Q1 Roadmap */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Q1 {new Date().getFullYear()}</h3>
            </div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">{roadmap.q1.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{roadmap.q1.description}</p>
            <div className="space-y-2">
              {roadmap.q1.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <Laptop className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Q3 Roadmap */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Q3 {new Date().getFullYear()}</h3>
            </div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">{roadmap.q3.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{roadmap.q3.description}</p>
            <div className="space-y-2">
              {roadmap.q3.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <Laptop className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            {roadmap.q3.dependencies && (
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                Dependencies: {roadmap.q3.dependencies}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Future Year Roadmap */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">{new Date().getFullYear() + 1}</h3>
            </div>
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">{roadmap.future.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{roadmap.future.description}</p>
            <div className="space-y-2">
              {roadmap.future.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <Laptop className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generateRoadmapData(businessName: string, businessDescription: string) {
  // This function would ideally use AI to generate roadmap data based on the business description
  // For now, we'll use some basic logic based on the business description
  
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

export default TechnologyRoadmap;
