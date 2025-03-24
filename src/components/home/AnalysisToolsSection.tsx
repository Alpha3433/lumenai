
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, LightbulbIcon, BarChart3, Target, Users, TrendingUp, Globe } from 'lucide-react';

const AnalysisToolsSection = () => {
  // Analysis tools data
  const analysisTools = [
    {
      title: "Idea Viability Score",
      description: "Evaluate your idea's chances of success with a clear, actionable score based on market data and competitive analysis.",
      icon: <LightbulbIcon className="h-6 w-6" />,
      features: ["Market size assessment", "Competition intensity score", "Profit potential calculation"]
    },
    {
      title: "Key Market Metrics",
      description: "Get critical data to understand demand, competition, and opportunities with real-time metrics and trend analysis.",
      icon: <BarChart3 className="h-6 w-6" />,
      features: ["Search volume trends", "Growth rate projections", "Seasonal demand patterns"]
    },
    {
      title: "Competitor Analysis",
      description: "Analyze competitors to identify opportunities and refine your strategy with detailed strengths and weaknesses assessment.",
      icon: <Target className="h-6 w-6" />,
      features: ["Pricing strategy comparison", "Feature gap identification", "Market positioning map"]
    },
    {
      title: "Customer Pain Points",
      description: "Identify the challenges your audience faces to craft better solutions and create products that truly resonate.",
      icon: <Users className="h-6 w-6" />,
      features: ["Social media sentiment analysis", "Review mining insights", "Customer journey friction points"]
    },
    {
      title: "Growth Strategy",
      description: "Get tailored strategies to grow your business effectively with stage-appropriate tactics and milestones.",
      icon: <TrendingUp className="h-6 w-6" />,
      features: ["Revenue projection models", "Marketing channel recommendations", "Scaling timeline roadmap"]
    },
    {
      title: "Trending SEO Keywords",
      description: "Discover keywords to improve search rankings and attract the right audience with volume and competition data.",
      icon: <Globe className="h-6 w-6" />,
      features: ["Low-competition keyword opportunities", "Rising search trend alerts", "Content gap suggestions"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive Analysis Tools</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to validate, launch, and grow your business idea
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisTools.map((tool, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                  <ul className="mt-4 space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalysisToolsSection;
