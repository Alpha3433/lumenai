
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, FileText, CheckCircle, BarChart, Target, RefreshCw, Zap } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    title: "Market Analysis",
    description: "Get detailed insights into market size, growth potential, and competitive landscape."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Target Audience",
    description: "Identify your ideal customers, their needs, pain points, and buying behavior."
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Business Model",
    description: "Discover the most effective revenue models and pricing strategies for your idea."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    title: "Validation Score",
    description: "Get a clear, data-driven score that tells you if your idea is worth pursuing."
  },
  {
    icon: <BarChart className="w-6 h-6 text-purple-600" />,
    title: "Financial Projections",
    description: "Generate realistic financial forecasts based on market data and industry benchmarks."
  },
  {
    icon: <Target className="w-6 h-6 text-purple-600" />,
    title: "Competitive Analysis",
    description: "Identify key competitors, their strengths, weaknesses, and your unique advantages."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
    title: "Pivot Suggestions",
    description: "Get AI-powered recommendations on how to pivot your idea for better market fit."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Investor Readiness",
    description: "Prepare compelling materials that will appeal to potential investors and partners."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Validate Your Idea
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform helps entrepreneurs validate their ideas and avoid building products that won't succeed
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="mb-4 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 flex-grow text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to validate your startup idea?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our waiting list today and be the first to access our platform when we launch
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg">
              Join the Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
