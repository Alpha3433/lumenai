
import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BusinessModelsPremiumCTAProps {
  onUpgrade: () => void;
}

const BusinessModelsPremiumCTA: React.FC<BusinessModelsPremiumCTAProps> = ({ onUpgrade }) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm"></div>
      
      <div className="relative z-10 py-10 px-8 text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-full mb-5">
          <Globe className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        </div>
        
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">Unlock Web Business Models</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Discover the most optimal web-based business models for your concept with AI analysis. Includes fit scores, implementation complexity, and key benefits.
        </p>
        
        <Button 
          onClick={onUpgrade}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
        >
          Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessModelsPremiumCTA;
