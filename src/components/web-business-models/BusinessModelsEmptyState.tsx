
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BusinessModelsEmptyStateProps {
  onGenerate: () => void;
}

const BusinessModelsEmptyState: React.FC<BusinessModelsEmptyStateProps> = ({ onGenerate }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardContent className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">No business models generated yet.</p>
        <Button onClick={onGenerate}>Generate Business Models</Button>
      </CardContent>
    </Card>
  );
};

export default BusinessModelsEmptyState;
