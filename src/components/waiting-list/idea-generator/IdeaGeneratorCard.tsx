
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import FailureInsight from './FailureInsight';

const IdeaGeneratorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Idea Failure Analysis</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Common Failure Pattern</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400">
                Launching without real-world validation
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Impact</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400">
                Wasted resources on products nobody wants
              </div>
            </div>
          </div>
          
          <div className="py-3 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          
          <FailureInsight
            title="Prioritize Validation Over Building"
            description="Leading founders first test their ideas with real customers through landing pages, interviews, and small-scale tests before investing in full product development."
          />
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Validation success rate: <span className="text-green-500 font-medium">68%</span></span>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Learn validation methods
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaGeneratorCard;
