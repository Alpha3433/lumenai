
import React from 'react';
import { Activity } from 'lucide-react';

const MarketingSectionHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
        <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold">Marketing Plan</h2>
    </div>
  );
};

export default MarketingSectionHeader;
