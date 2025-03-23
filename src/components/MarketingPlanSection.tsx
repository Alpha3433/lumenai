
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
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Activity className="h-6 w-6 text-indigo-500" />
        Marketing Plan
      </h2>
      
      {isPremium ? (
        <Card className={cn(
          "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
          "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Unlock className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Premium Marketing Plan</h3>
            </div>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <p className="leading-relaxed">{marketingPlanText || "Loading..."}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-8 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-700/10 dark:to-purple-700/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                <Lock className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Unlock our comprehensive Marketing Plan section to get detailed strategies for customer acquisition and brand growth.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={onUpgrade}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-2 shadow-md flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketingPlanSection;
