
import React from 'react';
import { Activity, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface MarketingPlanSectionProps {
  marketingPlanText: string;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({ 
  marketingPlanText, 
  isPremium = true, 
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
      
      <Card className={cn(
        "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
        "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Marketing Plan</h3>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-sm space-y-4">
            {marketingPlanText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MarketingPlanSection;
