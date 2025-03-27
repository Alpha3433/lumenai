
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border-l-4 border-blue-500">
        <h3 className="font-bold text-lg mb-2">{generatedIdea.businessName}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{generatedIdea.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Target Market</h4>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.targetMarket}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Revenue Model</h4>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.revenueModel}</p>
          </div>
        </div>
        
        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Why This Could Work</h4>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {generatedIdea.whyItWorks.slice(0, 2).map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={onRegenerateIdea}
        >
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
