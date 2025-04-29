
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, TrendingUp, ArrowRight } from 'lucide-react';
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
      className="rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900/60"
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-semibold text-blue-700 dark:text-blue-400">Your Business Idea</h4>
        </div>
        <div className="text-xs bg-blue-200/50 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
          AI Generated
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-5 space-y-4">
        <p className="font-medium text-gray-800 dark:text-gray-200 text-lg">
          Sustainable meal prep subscription service with AI-personalized nutrition
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">Target Audience</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Health-conscious professionals with limited time, aged 25-45, urban areas, mid-to-high income.
            </p>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">Market Potential</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Growing demand for convenient, healthy eating options with 18% YoY growth and $4.2B estimated market size.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Revenue Model</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Weekly subscription + premium add-ons</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Market Entry</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Low barriers, differentiated</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onRegenerateClick}
            variant="outline" 
            className="w-full border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 group"
          >
            Generate Another Idea
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratedIdea;
