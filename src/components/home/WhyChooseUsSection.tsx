
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Box, Zap } from 'lucide-react';

const WhyChooseUsSection = () => {
  // Stats data
  const stats = [
    {
      value: "92%",
      label: "Prediction Accuracy",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      value: "30s",
      label: "Report Generation",
      icon: <Clock className="h-6 w-6" />
    },
    {
      value: "3x",
      label: "More Data Sources",
      icon: <Box className="h-6 w-6" />
    },
    {
      value: "87%",
      label: "Success Rate",
      icon: <Zap className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our advanced algorithm outperforms competitors across key metrics
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 mt-8">
          <h3 className="text-2xl font-bold mb-4">Superior Prediction Accuracy</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our algorithm delivers 92% accuracy in predicting profitable niches, compared to the industry average of 67%. 
            Our multi-source data analysis combines trends from Google, Reddit, and e-commerce platforms for unmatched precision.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>92% accuracy in trend prediction</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Multi-source data validation</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Advanced pattern recognition</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
