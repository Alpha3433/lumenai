
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ValidationScore {
  category: string;
  score: number;
  label: string;
  description: string;
}

interface BusinessValidationScoreProps {
  businessName: string;
  overallScore: number;
  scores: ValidationScore[];
  strengths: string[];
  weaknesses: string[];
}

const NewBusinessValidationScore: React.FC<BusinessValidationScoreProps> = ({
  businessName,
  overallScore,
  scores,
  strengths,
  weaknesses
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    if (score >= 60) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Score Overview */}
          <div className="flex-shrink-0 w-full lg:w-64 space-y-4">
            <div className="relative aspect-square w-48 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                    {overallScore}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Overall Score
                  </div>
                </div>
              </div>
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-gray-100 dark:text-gray-800"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * overallScore) / 100}
                  className={`${getScoreColor(overallScore)} transition-all duration-1000 ease-out`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Badge className={`w-full justify-center py-2 ${getScoreBadge(overallScore)}`}>
              {overallScore >= 80 ? "Strong Potential" : 
               overallScore >= 60 ? "Promising" : "Needs Work"}
            </Badge>
          </div>

          {/* Detailed Scores */}
          <div className="flex-1 space-y-6">
            <div className="grid gap-4">
              {scores.map((score, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{score.label}</span>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-sm font-semibold">{score.score}%</span>
                  </div>
                  <Progress 
                    value={score.score} 
                    className="h-2" 
                    indicatorClassName={getScoreColor(score.score)} 
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {score.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mt-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span>Key Strengths</span>
            </h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Areas for Improvement</span>
            </h3>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewBusinessValidationScore;
