
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ValidationMetricsProps {
  positives: string[];
  negatives: string[];
}

const ValidationMetrics = ({ positives, negatives }: ValidationMetricsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-1">
      <div>
        <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-1">
          <CheckCircle className="h-4 w-4" /> Key Strengths
        </h4>
        <ul className="space-y-2">
          {positives.slice(0, 4).map((positive, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">{positive}</span>
            </li>
          ))}
          {positives.length === 0 && (
            <li className="text-xs text-muted-foreground">No notable strengths found.</li>
          )}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3 uppercase tracking-wide flex items-center gap-1">
          <AlertTriangle className="h-4 w-4" /> Areas for Improvement
        </h4>
        <ul className="space-y-2">
          {negatives.slice(0, 4).map((negative, i) => (
            <li key={i} className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm">{negative}</span>
            </li>
          ))}
          {negatives.length === 0 && (
            <li className="text-xs text-muted-foreground">No obvious challenges surfaced.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ValidationMetrics;
