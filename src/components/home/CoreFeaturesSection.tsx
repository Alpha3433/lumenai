
import React from 'react';
import { Search, BarChart3, Target } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

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
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Core Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to validate your business</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover profitable niches and validate your business ideas in minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
