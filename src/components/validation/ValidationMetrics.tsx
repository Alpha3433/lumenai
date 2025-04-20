
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ValidationMetricsProps {
  positives: string[];
  negatives: string[];
}

const ValidationMetrics = ({ positives, negatives }: ValidationMetricsProps) => {
  return (
    <div className="space-y-6">
      {/* Key Strengths */}
      <div>
        <h3 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4">
          Key Strengths
        </h3>
        <div className="space-y-4">
          {positives.map((positive, i) => (
            <div key={`strength-${i}`} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{positive}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  12% above industry average
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  +12%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas for Improvement */}
      <div>
        <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-4">
          Areas for Improvement
        </h3>
        <div className="space-y-4">
          {negatives.map((negative, i) => (
            <div key={`improvement-${i}`} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{negative}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  34% market growth in competitors
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  +34%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationMetrics;
