
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GeneratedIdeaProps {
  onRegenerateClick: () => void;
}

const GeneratedIdea: React.FC<GeneratedIdeaProps> = ({ onRegenerateClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900/60 shadow-md"
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
          >
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h4 className="font-semibold text-blue-700 dark:text-blue-400">Your Business Idea</h4>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-xs bg-blue-200/50 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
        >
          AI Generated
        </motion.div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-5 space-y-4">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-medium text-gray-800 dark:text-gray-200 text-lg"
        >
          Sustainable meal prep subscription service with AI-personalized nutrition
        </motion.p>
        
        <div className="grid grid-cols-1 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">Target Audience</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Health-conscious professionals with limited time, aged 25-45, urban areas, mid-to-high income.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">Market Potential</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Growing demand for convenient, healthy eating options with 18% YoY growth and $4.2B estimated market size.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md flex flex-col"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">Revenue Model</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Weekly subscription + premium add-ons</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md flex flex-col"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">Market Entry</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Low barriers, differentiated</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-sm">Viability Score</span>
            </div>
            <div className="flex items-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-2 bg-green-500 rounded-full"
              />
              <span className="ml-3 font-medium text-green-700 dark:text-green-400">78/100</span>
            </div>
            <p className="text-xs text-green-700 dark:text-green-400 mt-2">
              High chance of success with proper execution
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-4"
        >
          <Button 
            onClick={onRegenerateClick}
            variant="outline" 
            className="w-full border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 group"
          >
            Generate Another Idea
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GeneratedIdea;
