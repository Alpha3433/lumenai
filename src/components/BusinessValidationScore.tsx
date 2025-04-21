
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { extractValidationData } from '@/utils/businessValidation';
import { CircleCheckBig, AlertCircle, Gauge } from 'lucide-react';

interface BusinessValidationScoreProps {
  businessText: string;
  businessName?: string;
  previousScore?: number;
}

const BusinessValidationScore = ({
  businessText,
  businessName = "New Business",
  previousScore
}: BusinessValidationScoreProps) => {
  const validationData = extractValidationData(businessText);
  const overallScore = validationData.overallScore || 0;
  const positives = validationData.positives?.slice(0, 4) || [];
  const negatives = validationData.negatives?.slice(0, 4) || [];
  const scoreColor =
    overallScore >= 80
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      : overallScore >= 60
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <Card className="p-8 md:p-10 bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          {/* Score Visual */}
          <div className="flex flex-col items-center md:items-start min-w-[200px]">
            <div className="flex items-center gap-3">
              <Gauge className="h-8 w-8 text-indigo-500" />
              <span className="text-3xl md:text-4xl font-bold text-foreground">{overallScore}/100</span>
            </div>
            <Badge className={`mt-4 mb-2 text-md px-3 py-2 ${scoreColor}`}>
              {overallScore >= 80
                ? "Strong Potential"
                : overallScore >= 60
                ? "Promising"
                : "Needs Work"}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium mb-2 uppercase bg-slate-100 dark:bg-slate-800 px-2 rounded">
              Validation Score
            </span>
            {validationData.category && (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mt-1">
                {validationData.category}
              </span>
            )}
          </div>

          {/* Positives & Negatives */}
          <div className="flex-1 grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* Positives */}
            <div>
              <h3 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-3 uppercase tracking-wide">
                <CircleCheckBig className="h-5 w-5" /> Key Strengths
              </h3>
              <ul className="space-y-3">
                {positives.length === 0 && (
                  <li className="text-sm text-muted-foreground">No key strengths found.</li>
                )}
                {positives.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1"><CircleCheckBig className="h-4 w-4 text-green-500" /></span>
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negatives */}
            <div>
              <h3 className="text-base font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-3 uppercase tracking-wide">
                <AlertCircle className="h-5 w-5" /> Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {negatives.length === 0 && (
                  <li className="text-sm text-muted-foreground">No challenges identified.</li>
                )}
                {negatives.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1"><AlertCircle className="h-4 w-4 text-amber-500" /></span>
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessValidationScore;
