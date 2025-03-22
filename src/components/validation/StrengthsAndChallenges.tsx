
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
            <h3 className="font-semibold">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {positives.map((positive, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                <span className="text-sm">{positive}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Negatives */}
      <Card className="border border-red-100 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 to-white dark:from-red-950/20 dark:to-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="font-semibold">Challenges</h3>
          </div>
          <ul className="space-y-2">
            {negatives.map((negative, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                <span className="text-sm">{negative}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsAndChallenges;
