
import React from 'react';
import { BarChart3, Sparkles, Target, Users, LineChart, ShieldCheck, Zap, Globe } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms analyze your inputs and market data to generate comprehensive business plans tailored to your specific needs."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Market Analysis",
      description: "Get real-time insights into your target market, including trends, competitor analysis, and customer demographics."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Planning",
      description: "Develop clear business objectives, mission statements, and implementation timelines to guide your business journey."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Insights",
      description: "Identify your target audience, understand their needs, and create strategies to acquire and retain customers."
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Financial Projections",
      description: "Generate realistic financial forecasts, including profit and loss statements, cash flow analysis, and break-even points."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Risk Assessment",
      description: "Identify potential risks and challenges, and develop mitigation strategies to protect your business."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Implementation Roadmap",
      description: "Get a step-by-step action plan for launching and scaling your business with clear milestones and goals."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-language Support",
      description: "Generate business plans in multiple languages to reach global audiences and international investors."
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to create an exceptional business plan</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform streamlines the business planning process with data-driven insights and customizable templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
