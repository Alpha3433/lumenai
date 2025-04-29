
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedIdeaProps {
  onRegenerateClick: () => void;
}

const GeneratedIdea: React.FC<GeneratedIdeaProps> = ({ onRegenerateClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h4 className="font-semibold text-blue-700">Your Business Idea</h4>
      </div>
      
      <p className="font-medium text-gray-800">
        Sustainable meal prep subscription service with AI-personalized nutrition
      </p>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Market Need:</span> Growing demand for convenient, healthy eating options
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Target Audience:</span> Health-conscious professionals with limited time
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Revenue Model:</span> Weekly subscription + premium add-ons
        </p>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={onRegenerateClick}
          variant="outline" 
          className="text-blue-600 border-blue-200"
        >
          Generate Another Idea
        </Button>
      </div>
    </motion.div>
  );
};

export default GeneratedIdea;
