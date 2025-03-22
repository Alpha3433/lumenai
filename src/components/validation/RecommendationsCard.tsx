
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getRecommendation } from '@/utils/businessValidationUtils';

interface RecommendationsCardProps {
  score: number;
}

const RecommendationsCard = ({ score }: RecommendationsCardProps) => {
  return (
    <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="bg-blue-50/70 dark:bg-blue-950/40 p-3 rounded-md mb-4">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            {getRecommendation(score)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
