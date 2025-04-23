
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RedditLoadingGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(6).fill(0).map((_, i) => (
      <Card key={i} className="animate-pulse">
        <CardHeader>
          <Skeleton className="h-7 w-[80%] mb-2" />
          <Skeleton className="h-4 w-[90%] mb-1" />
          <Skeleton className="h-4 w-[60%]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 rounded-md" />
            <Skeleton className="h-16 rounded-md" />
            <Skeleton className="h-16 rounded-md" />
            <Skeleton className="h-16 rounded-md" />
          </div>
          <div className="flex justify-between mt-4">
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-6 w-[30%] rounded-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default RedditLoadingGrid;
