
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Star, 
  Megaphone, 
  Calendar, 
  Activity, 
  ArrowRight, 
  Target,
  BarChart,
  Presentation,
  Globe,
  HeartHandshake,
  ChevronRight
} from 'lucide-react';

interface MarketingRoadmapVisualizerProps {
  businessName: string;
  marketingPlanText: string;
}

interface RoadmapStage {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const MarketingRoadmapVisualizer = ({ businessName, marketingPlanText }: MarketingRoadmapVisualizerProps) => {
  // Generate custom roadmap based on business type
  const generateCustomRoadmap = (text: string, businessName: string): RoadmapStage[] => {
    // Extract business type from marketing text
    const businessType = extractBusinessType(text, businessName);
    
    // Default roadmap stages
    const defaultStages: RoadmapStage[] = [
      { 
        title: "Market Research", 
        icon: <Target className="h-5 w-5" />,
        description: "Understand target audience and market needs",
        color: "blue-500"
      },
      { 
        title: "Brand Positioning", 
        icon: <Star className="h-5 w-5" />,
        description: "Establish unique market position and messaging",
        color: "amber-500"
      },
      { 
        title: "Channel Strategy", 
        icon: <Megaphone className="h-5 w-5" />,
        description: "Develop presence across key marketing channels",
        color: "indigo-500"
      },
      { 
        title: "Campaign Launch", 
        icon: <Calendar className="h-5 w-5" />,
        description: "Execute promotional activities and campaigns",
        color: "green-500"
      },
      { 
        title: "Growth & Scaling", 
        icon: <Activity className="h-5 w-5" />,
        description: "Optimize acquisition for sustainable growth",
        color: "red-500"
      }
    ];
    
    // Customize roadmap based on business type
    if (businessType.includes('ecommerce') || businessType.includes('retail')) {
      return [
        { 
          title: "Market Analysis", 
          icon: <BarChart className="h-5 w-5" />,
          description: "Identify target customers and competition",
          color: "blue-500"
        },
        { 
          title: "Brand Differentiation", 
          icon: <Star className="h-5 w-5" />,
          description: "Establish unique value proposition",
          color: "purple-500"
        },
        { 
          title: "Digital Presence", 
          icon: <Globe className="h-5 w-5" />,
          description: "Build website and social media platforms",
          color: "indigo-500"
        },
        { 
          title: "Customer Acquisition", 
          icon: <Users className="h-5 w-5" />,
          description: "Launch ads and promotional campaigns",
          color: "green-500"
        },
        { 
          title: "Retention Strategy", 
          icon: <HeartHandshake className="h-5 w-5" />,
          description: "Implement loyalty programs and follow-ups",
          color: "red-500"
        }
      ];
    } 
    else if (businessType.includes('tech') || businessType.includes('app') || businessType.includes('software')) {
      return [
        { 
          title: "User Research", 
          icon: <Users className="h-5 w-5" />,
          description: "Identify target users and their needs",
          color: "blue-500"
        },
        { 
          title: "Product Positioning", 
          icon: <Presentation className="h-5 w-5" />,
          description: "Define unique value proposition",
          color: "purple-500"
        },
        { 
          title: "User Acquisition", 
          icon: <Target className="h-5 w-5" />,
          description: "Implement growth marketing strategies",
          color: "indigo-500"
        },
        { 
          title: "Engagement Loops", 
          icon: <Activity className="h-5 w-5" />,
          description: "Create features that drive regular usage",
          color: "green-500"
        },
        { 
          title: "Monetization", 
          icon: <BarChart className="h-5 w-5" />,
          description: "Optimize revenue streams and conversions",
          color: "red-500"
        }
      ];
    }
    
    return defaultStages;
  };
  
  // Helper function to extract business type
  const extractBusinessType = (text: string, businessName: string): string => {
    const lowerText = text.toLowerCase();
    const lowerBusinessName = businessName.toLowerCase();
    
    if (lowerText.includes('ecommerce') || lowerText.includes('online store') || 
        lowerText.includes('shop') || lowerText.includes('retail')) {
      return 'ecommerce';
    } 
    else if (lowerText.includes('app') || lowerText.includes('software') || 
             lowerText.includes('platform') || lowerText.includes('tech')) {
      return 'tech';
    }
    else if (lowerText.includes('food') || lowerText.includes('restaurant') || 
             lowerText.includes('catering')) {
      return 'food';
    }
    else if (lowerText.includes('service') || lowerText.includes('consulting')) {
      return 'service';
    }
    
    return 'general';
  };
  
  const roadmapStages = generateCustomRoadmap(marketingPlanText, businessName);
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-md mb-8 bg-card/95 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 py-2 px-4 border-b border-indigo-100 dark:border-indigo-800/30">
          <h3 className="font-medium text-sm">Marketing Roadmap</h3>
        </div>
        <div className="py-6 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between overflow-x-auto relative">
            {roadmapStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center p-2 min-w-[140px]">
                  <div className={`rounded-full p-3 mb-3 bg-${stage.color}/10 text-${stage.color} shadow-sm`}>
                    {stage.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{stage.title}</h3>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>
                </div>
                {index < roadmapStages.length - 1 && (
                  <div className="mx-0 my-4 md:my-0 md:mx-1 text-muted-foreground">
                    <ChevronRight className="h-5 w-5 md:rotate-0 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingRoadmapVisualizer;
