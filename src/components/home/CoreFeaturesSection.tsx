
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Target } from 'lucide-react';

const CoreFeaturesSection = () => {
  // Core features data
  const coreFeatures = [
    {
      title: "Niche Discovery",
      description: "Identify rising niches with +200% search growth using data from Google Trends, Reddit, and Shopify.",
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Competitor Gap Analysis",
      description: "Analyze top 3 competitors and highlight underserved customer pain points to find your edge.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "AI Report Generation",
      description: "Get a 1-page summary with niche demand, competition score, and 3 actionable steps to enter the market.",
      icon: <BarChart3 className="h-6 w-6" />
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to validate your business idea in minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
