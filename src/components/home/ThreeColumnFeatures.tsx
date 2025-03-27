
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const ThreeColumnFeatures = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Increase business success with AI-powered planning
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Optimize business planning with our comprehensive analysis platform for up to 30% better outcomes & leveraging AI to make real business growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold">Without Visionary Plans</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {[
                  "Months of market research with questionable data",
                  "Hours spent analyzing competitors without clear insights",
                  "Expensive consultants with generic advice",
                  "High risk of launching in saturated markets",
                  "No clear path to finding your competitive advantage"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">With Visionary Plans</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {[
                  "Complete market analysis in 30 seconds with real-time data",
                  "Instant competitor analysis with actionable weaknesses",
                  "AI-powered strategic recommendations customized to your idea",
                  "92% success rate in identifying viable market opportunities",
                  "Clear roadmap with prioritized action steps for implementation"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThreeColumnFeatures;
