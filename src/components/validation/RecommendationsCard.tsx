
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { getRecommendation } from '@/utils/businessValidation';

interface RecommendationsCardProps {
  score: number;
}

const RecommendationsCard = ({ score }: RecommendationsCardProps) => {
  return (
    <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold">Recommendation Summary</h3>
        </div>
        
        <div className="bg-blue-50/70 dark:bg-blue-950/40 p-4 rounded-xl">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
            {getRecommendation(score)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
