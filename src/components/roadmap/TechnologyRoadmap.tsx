
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
  const roadmap = generateRoadmap(businessName);

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

function generateRoadmap(businessName: string) {
  return [
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
  ];
}

export default TechnologyRoadmap;
