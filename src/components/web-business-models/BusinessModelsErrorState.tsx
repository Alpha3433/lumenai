
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BusinessModelsErrorStateProps {
  error: string;
  onRetry: () => void;
}

const BusinessModelsErrorState: React.FC<BusinessModelsErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Card className="border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
      <CardContent className="p-6 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessModelsErrorState;
