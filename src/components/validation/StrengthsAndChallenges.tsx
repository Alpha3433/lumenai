
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StrengthsAndChallengesProps {
  positives: string[];
  negatives: string[];
}

const StrengthsAndChallenges = ({ positives, negatives }: StrengthsAndChallengesProps) => {
  return (
    <div className="space-y-8">
      {/* Key Strengths */}
      <div>
        <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4">
          Key Strengths
        </h3>
        <div className="space-y-4">
          {positives.map((positive, i) => (
            <div key={`strength-${i}`} className="flex items-start gap-3">
              <div className="mt-1 p-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{positive}</h4>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">+12%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">12% above industry average</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas for Improvement */}
      <div>
        <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-4">
          Areas for Improvement
        </h3>
        <div className="space-y-4">
          {negatives.map((negative, i) => (
            <div key={`improvement-${i}`} className="flex items-start gap-3">
              <div className="mt-1 p-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{negative}</h4>
                  <span className="text-sm text-amber-600 dark:text-amber-400">+34%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">34% market growth in competitors</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrengthsAndChallenges;
