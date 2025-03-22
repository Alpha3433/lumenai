
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle } from 'lucide-react';

interface StrengthsAndChallengesProps {
  positives: string[];
  negatives: string[];
}

const StrengthsAndChallenges = ({ positives, negatives }: StrengthsAndChallengesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Positives */}
      <Card className="border border-green-100 dark:border-green-900/30 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-lg">Strengths</h3>
          </div>
          
          <div className="space-y-3">
            {positives.map((positive, index) => (
              <div key={index} className="flex items-start gap-2 bg-green-50/70 dark:bg-green-950/30 p-2.5 rounded-md">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{positive}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Negatives */}
      <Card className="border border-red-100 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 to-white dark:from-red-950/20 dark:to-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="font-semibold text-lg">Challenges</h3>
          </div>
          
          <div className="space-y-3">
            {negatives.map((negative, index) => (
              <div key={index} className="flex items-start gap-2 bg-red-50/70 dark:bg-red-950/30 p-2.5 rounded-md">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{negative}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsAndChallenges;
