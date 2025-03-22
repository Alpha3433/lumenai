
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { getRecommendation } from '@/utils/businessValidationUtils';

interface RecommendationsCardProps {
  score: number;
  recommendations: string[];
}

const RecommendationsCard = ({ score, recommendations }: RecommendationsCardProps) => {
  return (
    <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold">Recommendations</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {getRecommendation(score)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md">
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <span className="text-sm">{recommendation}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
