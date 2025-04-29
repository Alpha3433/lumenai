
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

// Feature categories with their corresponding items
const swotData = {
  strengths: [
    "Complete market analysis in 30 seconds with real-time data",
    "Instant competitor analysis with actionable weaknesses",
    "AI-powered strategic recommendations customized to your idea",
    "92% success rate in identifying viable market opportunities"
  ],
  weaknesses: [
    "Targeted demographic insights may require refining for niche markets",
    "Some industries may need additional specialized analysis",
    "Early-stage technologies may have limited historical data",
    "Complex business models might need human expert review"
  ],
  opportunities: [
    "Expand market reach by identifying underserved niches",
    "Leverage emerging trends before they become mainstream",
    "Find strategic partnership possibilities with complementary businesses",
    "Discover innovative revenue models for your industry"
  ],
  threats: [
    "Established competitors with significant market share",
    "Rapidly changing consumer preferences and behaviors",
    "Emerging technologies that could disrupt your space",
    "Regulatory changes that might affect market entry"
  ]
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 mb-4">
            SWOT Analysis
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="text-blue-600 dark:text-blue-400">Validate Your Idea</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our comprehensive SWOT analysis helps entrepreneurs understand their strategic position and make informed decisions
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-4 inline-block">
            Strategic position assessment
          </div>
        </motion.div>

        {/* SWOT Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-green-200 dark:border-green-900/50"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-200 dark:bg-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Strengths</h3>
            </div>
            <div className="p-5 space-y-3">
              {swotData.strengths.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-red-200 dark:border-red-900/50"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-200 dark:bg-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">Weaknesses</h3>
            </div>
            <div className="p-5 space-y-3">
              {swotData.weaknesses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-blue-200 dark:border-blue-900/50"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-200 dark:bg-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Opportunities</h3>
            </div>
            <div className="p-5 space-y-3">
              {swotData.opportunities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Threats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-amber-200 dark:border-amber-900/50"
          >
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-200 dark:bg-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400">Threats</h3>
            </div>
            <div className="p-5 space-y-3">
              {swotData.threats.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Showcase Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-center"
        >
          <img 
            src="/lovable-uploads/7964ca29-0497-47f8-8ab8-48c35b4bc2a0.png" 
            alt="SWOT Analysis Example" 
            className="w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          />
        </motion.div>
        
        {/* Additional Features - Platform Benefits */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/50 mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Platform Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Our analysis platform provides key advantages over traditional methods
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Time-Saving Analysis",
                description: "Get comprehensive insights in minutes instead of weeks of manual research",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Data-Driven Insights",
                description: "Access real-time market data and competitor analysis for informed decisions",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Action Plan Generation",
                description: "Receive customized strategies and next steps based on your SWOT analysis",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-blue-50 dark:border-blue-900/30"
              >
                <div className="bg-blue-100 dark:bg-blue-800/40 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
              Join our waiting list today and be the first to access our SWOT analysis platform when we launch
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md h-12 px-8 text-md font-medium transition-all shadow-md hover:shadow-lg"
            >
              Join the Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
