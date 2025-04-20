
import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ScoreOverviewProps {
  score: number;
  previousScore?: number;
  industryAverage: number;
  topCompetitor: number;
}

const ScoreOverview = ({ 
  score, 
  previousScore,
  industryAverage, 
  topCompetitor,
}: ScoreOverviewProps) => {
  const scoreDifference = previousScore ? score - previousScore : 0;
  
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Score Overview</h3>
        
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                className="text-blue-100 dark:text-blue-950"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * score) / 100}
                className="text-blue-500 dark:text-blue-400 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">{score}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">out of 100</span>
            </div>
          </div>
          
          {scoreDifference > 0 && (
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                +{scoreDifference} pts since last review
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Industry Average</span>
              <span className="text-sm font-medium">{industryAverage}</span>
            </div>
            <Progress value={industryAverage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Top Competitor</span>
              <span className="text-sm font-medium">{topCompetitor}</span>
            </div>
            <Progress value={topCompetitor} className="h-2" indicatorClassName="bg-violet-500" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScoreOverview;
