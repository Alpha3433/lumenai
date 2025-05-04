
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StrengthsAndChallengesProps {
  positives: string[];
  negatives: string[];
}

const StrengthsAndChallenges = ({ positives, negatives }: StrengthsAndChallengesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Strengths */}
      <Card className="border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
        <CardContent className="pt-6">
          <h3 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5" />
            Key Strengths
          </h3>
          <div className="space-y-5">
            {positives.map((positive, i) => (
              <div key={`strength-${i}`} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{positive}</h4>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Advantage
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {i === 0 && "Strong potential for stable recurring revenue streams"}
                    {i === 1 && "Significant consumer base seeking fitness solutions"}
                    {i === 2 && "AI-driven features create unique value proposition"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Overall strength assessment</span>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">Strong</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card className="border border-amber-100 dark:border-amber-900/30 shadow-sm">
        <CardContent className="pt-6">
          <h3 className="text-base font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5" />
            Areas for Improvement
          </h3>
          <div className="space-y-5">
            {negatives.map((negative, i) => (
              <div key={`improvement-${i}`} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{negative}</h4>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      Challenge
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {i === 0 && "Market saturation requires strong differentiation strategy"}
                    {i === 1 && "Current average CAC in fitness tech is $60-80 per user"}
                    {i === 2 && "Industry average retention rate is only 29% after 90 days"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Market challenge level</span>
              <span className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded">Moderate</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsAndChallenges;
