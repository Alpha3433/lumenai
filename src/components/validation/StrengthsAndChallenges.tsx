
import React from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StrengthsAndChallengesProps {
  positives: string[];
  negatives: string[];
}

const StrengthsAndChallenges = ({ positives, negatives }: StrengthsAndChallengesProps) => {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800/50">
      <div className="space-y-8">
        {/* Key Strengths */}
        <div>
          <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 uppercase tracking-wider">
            Key Strengths
          </h3>
          <div className="space-y-4">
            {positives.map((positive, i) => (
              <div key={`strength-${i}`} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{positive} <span className="text-emerald-600">+12%</span></h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">12% above industry average</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div>
          <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-4 uppercase tracking-wider">
            Areas for Improvement
          </h3>
          <div className="space-y-4">
            {negatives.map((negative, i) => (
              <div key={`improvement-${i}`} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{negative} <span className="text-amber-600">+34%</span></h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">34% market growth in competitors</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StrengthsAndChallenges;
