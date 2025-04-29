
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedIdeaProps {
  onRegenerateClick: () => void;
}

const GeneratedIdea: React.FC<GeneratedIdeaProps> = ({ onRegenerateClick }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-grow flex flex-col"
    >
      <motion.div
        variants={itemVariants} 
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-5 space-y-4 border border-blue-100 dark:border-blue-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Your Business Idea</h4>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -z-10 top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-300/5 to-purple-300/5 blur-xl"
          />
        </div>
        
        <motion.p variants={itemVariants} className="font-medium text-gray-800 dark:text-gray-200 text-lg">
          Sustainable meal prep subscription service with AI-personalized nutrition
        </motion.p>
        
        <div className="space-y-3">
          <motion.div variants={itemVariants} className="flex items-start gap-2">
            <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Market Need:</span> Growing demand for convenient, healthy eating options with personalized nutritional guidance
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-start gap-2">
            <Users className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Target Audience:</span> Health-conscious professionals with limited time and specialized dietary requirements
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-start gap-2">
            <DollarSign className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Revenue Model:</span> Weekly subscription + premium personalized meal plans and nutrition coaching
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="pt-4 mt-auto"
        >
          <Button 
            onClick={onRegenerateClick}
            variant="outline" 
            className="w-full border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Generate Another Idea
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <p>After generating an idea you like, start validating it with our 4-step process!</p>
      </motion.div>
    </motion.div>
  );
};

export default GeneratedIdea;
