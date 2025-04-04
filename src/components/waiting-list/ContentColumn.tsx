
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EmailForm from './EmailForm';
import FeaturesList from './FeaturesList';

const ContentColumn = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-1/2 max-w-xl"
    >
      <div className="mb-2 flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-md mr-2">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Coming Soon
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        AI-Powered Business Plans For Your Next Venture
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
        Join our waiting list to be among the first to access our revolutionary AI business plan builder. Get early access and exclusive benefits.
      </p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded mb-8">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">The Problem We're Solving:</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Creating comprehensive business plans is time-consuming, requires specialized knowledge, and is often a barrier for aspiring entrepreneurs. Our AI solution will transform this process, allowing anyone to develop investor-ready business plans in minutes instead of weeks.
        </p>
      </div>
      
      <EmailForm />
      <FeaturesList />
    </motion.div>
  );
};

export default ContentColumn;
