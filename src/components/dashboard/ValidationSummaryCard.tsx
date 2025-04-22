
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle } from 'lucide-react';

interface ValidationSummaryCardProps {
  score: number;
  positives: string[];
  negatives: string[];
  businessName: string;
}

const ValidationSummaryCard: React.FC<ValidationSummaryCardProps> = ({
  score,
  positives,
  negatives,
  businessName
}) => {
  // Calculate circumference for circular progress
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Score Overview */}
          <div className="w-full lg:w-72 space-y-6">
            <h3 className="text-lg font-semibold">Score Overview</h3>
            
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-gray-100 dark:text-gray-800"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * score) / 100}
                  className="text-blue-400 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">{score}</span>
                <span className="text-sm text-gray-500">out of 100</span>
              </div>
            </div>

            {/* Industry Comparisons */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Industry Average</span>
                  <span>62</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Top Competitor</span>
                  <span>78</span>
                </div>
                <Progress value={78} className="h-2" indicatorClassName="bg-violet-500" />
              </div>
            </div>
          </div>

          {/* Right Column - Strengths & Improvements */}
          <div className="flex-1 space-y-6">
            {/* Key Strengths */}
            <div>
              <h4 className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-4">Key Strengths</h4>
              <div className="space-y-4">
                {positives.map((positive, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Check className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{positive}</h4>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                          +12%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        12% above industry average
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div>
              <h4 className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">Areas for Improvement</h4>
              <div className="space-y-4">
                {negatives.map((negative, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{negative}</h4>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          +34%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        34% market growth in competitors
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationSummaryCard;
