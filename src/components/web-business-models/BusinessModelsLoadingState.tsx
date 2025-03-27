
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BusinessModelsLoadingState: React.FC = () => {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border border-gray-200 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-start">
                <Skeleton className="h-7 w-1/3" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <div className="p-5">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessModelsLoadingState;
