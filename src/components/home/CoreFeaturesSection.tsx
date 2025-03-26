
import React from 'react';
import { Search, BarChart3, Target, Clock, CheckCircle, XCircle } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { motion } from 'framer-motion';

const CoreFeaturesSection = () => {
  // Core features data
  const coreFeatures = [
    {
      title: "Niche Discovery",
      description: "Identify rising niches with +200% search growth using data from Google Trends, Reddit, and Shopify to find high-potential markets.",
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Competitor Gap Analysis",
      description: "Analyze top competitors and highlight underserved customer pain points to find your competitive edge and unique positioning.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "AI Report Generation",
      description: "Get a comprehensive summary with market demand, competition score, and actionable steps to enter the market successfully.",
      icon: <BarChart3 className="h-6 w-6" />
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium"
          >
            The Solution
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            From Idea to Validated Business Plan in Minutes
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Our AI platform eliminates guesswork with data-driven insights and actionable strategies
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold">Without Visionary Plans</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>Months of market research with questionable data</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>Hours spent analyzing competitors without clear insights</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>Expensive consultants with generic advice</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>High risk of launching in saturated markets</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>No clear path to finding your competitive advantage</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">With Visionary Plans</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Complete market analysis in 30 seconds with real-time data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Instant competitor analysis with actionable weaknesses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>AI-powered strategic recommendations customized to your idea</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>92% success rate in identifying viable market opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Clear roadmap with prioritized action steps for implementation</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
