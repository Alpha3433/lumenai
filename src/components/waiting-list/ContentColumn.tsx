
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EmailForm from './EmailForm';
import FeaturesList from './FeaturesList';
const ContentColumn = () => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="w-full md:w-1/2 max-w-xl">
      <div className="mb-2 flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-md mr-2">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Coming Soon
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">The Most Complete AI-Powered Business Solutions</h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        Join our waiting list to be among the first to access our revolutionary AI business plan builder. Get early access and exclusive benefits.
      </p>
      
      <EmailForm />
      <FeaturesList />
    </motion.div>;
};
export default ContentColumn;
