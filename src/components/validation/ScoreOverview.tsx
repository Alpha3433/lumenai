
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from 'lucide-react';

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
    <Card className="p-6 bg-white/95 dark:bg-gray-800/50 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-6">Score Overview</h3>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Circular progress visualization */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            className="text-blue-100 dark:text-blue-950"
            strokeWidth="12"
            stroke="currentColor"
            fill="none"
            r="70"
            cx="80"
            cy="80"
          />
          <circle
            className="text-blue-500 dark:text-blue-400"
            strokeWidth="12"
            strokeDasharray={439.6}
            strokeDashoffset={439.6 - (score / 100) * 439.6}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r="70"
            cx="80"
            cy="80"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">{score}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">out of 100</span>
        </div>
      </div>

      {scoreDifference !== 0 && (
        <div className="flex items-center justify-center gap-1 mb-6 text-sm">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            +{Math.abs(scoreDifference)} pts since last review
          </span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Industry Average</span>
            <span className="font-medium">{industryAverage}</span>
          </div>
          <Progress value={industryAverage} className="h-2 bg-blue-100 dark:bg-blue-950" indicatorClassName="bg-blue-500" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Top Competitor</span>
            <span className="font-medium">{topCompetitor}</span>
          </div>
          <Progress value={topCompetitor} className="h-2 bg-violet-100 dark:bg-violet-950" indicatorClassName="bg-violet-500" />
        </div>
      </div>
    </Card>
  );
};

export default ScoreOverview;
