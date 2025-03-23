
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getScoreBadge } from '@/utils/businessValidation';
import { BarChart2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface ValidationSummaryCardProps {
  score: number;
  positives: string[];
  negatives: string[];
}

const ValidationSummaryCard: React.FC<ValidationSummaryCardProps> = ({ 
  score, 
  positives, 
  negatives 
}) => {
  // Determine score label based on score value
  const getScoreLabel = (scoreValue: number) => {
    if (scoreValue >= 80) return "Strong Potential";
    if (scoreValue >= 60) return "Promising";
    return "Needs Refinement";
  };

  return (
    <Card className="border-none shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-full">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-black dark:text-white">Business Validity</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {score}
            </div>
            <div className={`text-xs px-2.5 py-1 rounded-full ${getScoreBadge(score)}`}>
              {getScoreLabel(score)}
            </div>
          </div>
        </div>
        
        <Progress 
          value={score} 
          className="h-1.5 mb-6"
          indicatorClassName={
            score >= 80 ? "bg-green-500" : 
            score >= 60 ? "bg-amber-500" : 
            "bg-red-500"
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Positive Points */}
          <div className="bg-gradient-to-br from-green-50/80 to-green-50/30 dark:from-green-900/10 dark:to-green-900/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-800 dark:text-green-300">Key Strengths</span>
            </div>
            <ul className="space-y-1.5">
              {positives.map((positive, index) => (
                <li key={index} className="text-xs text-gray-700 dark:text-gray-300 pl-2 border-l border-green-300 dark:border-green-700">
                  {positive}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Key Negative Points */}
          <div className="bg-gradient-to-br from-amber-50/80 to-amber-50/30 dark:from-amber-900/10 dark:to-amber-900/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Challenges</span>
            </div>
            <ul className="space-y-1.5">
              {negatives.map((negative, index) => (
                <li key={index} className="text-xs text-gray-700 dark:text-gray-300 pl-2 border-l border-amber-300 dark:border-amber-700">
                  {negative}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationSummaryCard;
