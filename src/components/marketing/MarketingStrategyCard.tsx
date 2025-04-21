
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketingStrategyCardProps {
  children: React.ReactNode;
  title?: string;
}

const MarketingStrategyCard: React.FC<MarketingStrategyCardProps> = ({ children, title = "Marketing Strategy" }) => {
  return (
    <Card
      className={cn(
        "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
        "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-300 text-center">
              {title}
            </h2>
          </div>
          <div className="h-1 w-20 rounded bg-indigo-300/60 dark:bg-indigo-700 mt-1 mb-2" />
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default MarketingStrategyCard;
