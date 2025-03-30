
import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

const MarketingSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
        <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold">Marketing Plan</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Strategic approach to reach target audience and achieve business growth
      </p>
    </div>
  );
};

export default MarketingSectionHeader;
