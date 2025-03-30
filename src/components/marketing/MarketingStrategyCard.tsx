
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketingStrategyCardProps {
  children: React.ReactNode;
}

const MarketingStrategyCard: React.FC<MarketingStrategyCardProps> = ({ children }) => {
  return (
    <Card className={cn(
      "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
      "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Marketing Strategy</h3>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default MarketingStrategyCard;
