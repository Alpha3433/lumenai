
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
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border-l-4 border-blue-500">
        <h3 className="font-bold text-lg">{generatedIdea.businessName}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{generatedIdea.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Target Market</span>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.targetMarket}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Revenue Model</span>
            <p className="text-gray-700 dark:text-gray-300">{generatedIdea.revenueModel}</p>
          </div>
        </div>
        
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Why This Could Work</span>
          <ul className="text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-0.5 list-disc list-inside">
            {generatedIdea.whyItWorks.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1" 
          onClick={onRegenerateIdea}
        >
          Generate Another
        </Button>
        <Button 
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={onUseIdea}
        >
          Use This Idea
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GeneratedIdeaDisplay;
