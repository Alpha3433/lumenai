
import React from 'react';
import { Card } from '@/components/ui/card';

const CompetitorCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 animate-pulse">
      <div className="h-3 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </Card>
  );
};

export default CompetitorCardSkeleton;
