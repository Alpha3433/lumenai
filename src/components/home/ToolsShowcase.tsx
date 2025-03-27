
import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, TrendingUpIcon, BarChart3Icon, FileTextIcon } from 'lucide-react';

const ToolsShowcase = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Power your business ideas with AI-generated reports
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md mr-3">
                <LightbulbIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg">Idea Generation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover profitable niches with AI-powered market analysis and business idea generation.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md mr-3">
                <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg">Market Analysis</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get comprehensive market analysis with competition insights and growth opportunities.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md mr-3">
                <FileTextIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg">Business Plans</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Generate complete business plans with financial projections and strategic recommendations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
