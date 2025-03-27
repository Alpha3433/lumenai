
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import { BusinessIdeaSuggestion } from '@/utils/businessIdeaGenerator';

interface GeneratedIdeaDisplayProps {
  generatedIdea: BusinessIdeaSuggestion;
  onRegenerateIdea: () => void;
  onUseIdea: () => void;
}

const GeneratedIdeaDisplay: React.FC<GeneratedIdeaDisplayProps> = ({
  generatedIdea,
  onRegenerateIdea,
  onUseIdea
}) => {
  // Take only the first 2 reasons from the whyItWorks array
  const limitedReasons = generatedIdea.whyItWorks.slice(0, 2);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-5 border-l-4 border-blue-500">
        <h3 className="font-bold text-lg mb-2">{generatedIdea.businessName}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-5">{generatedIdea.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm">
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Target Market</h4>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.targetMarket}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm">
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Revenue Model</h4>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.revenueModel}</p>
          </div>
        </div>
        
        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Why This Could Work</h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {limitedReasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex-shrink-0 text-xs flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          className="flex-1 flex items-center justify-center gap-2" 
          onClick={onRegenerateIdea}
        >
          <RefreshCw className="h-4 w-4" />
          Generate Another Idea
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={onUseIdea}
        >
          Use This Idea
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GeneratedIdeaDisplay;
