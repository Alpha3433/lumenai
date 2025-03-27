
import React from 'react';
import { Activity, Lock, Sparkles, Unlock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface MarketingPlanSectionProps {
  marketingPlanText: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({ 
  marketingPlanText, 
  isPremium, 
  onUpgrade 
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold">Marketing Plan</h2>
      </div>
      
      {isPremium ? (
        <Card className={cn(
          "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
          "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Unlock className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Premium Marketing Plan</h3>
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-sm space-y-4">
              {marketingPlanText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm"></div>
          
          <div className="relative z-10 py-10 px-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-5">
              <Lock className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Unlock our comprehensive Marketing Plan section to get detailed strategies for customer acquisition and brand growth.
            </p>
            
            <Button 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-2 shadow-md flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketingPlanSection;
