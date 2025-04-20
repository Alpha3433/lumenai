
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from 'lucide-react';

interface ScoreOverviewProps {
  score: number;
  previousScore?: number;
  industryAverage: number;
  topCompetitor: number;
  businessName: string;
  category: string;
  businessDescription: string;
}

const ScoreOverview = ({ 
  score, 
  previousScore, 
  industryAverage, 
  topCompetitor,
  businessName,
  category,
  businessDescription
}: ScoreOverviewProps) => {
  const scoreDifference = previousScore ? score - previousScore : 0;
  
  return (
    <Card className="p-6 bg-white dark:bg-gray-800/50">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{businessName}</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {category}
        </Badge>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Circular progress visualization */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-500 dark:text-blue-400"
            strokeWidth="8"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (score / 100) * 251.2}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{score}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">out of 100</span>
        </div>
      </div>

      {scoreDifference !== 0 && (
        <div className="flex items-center justify-center gap-1 mb-6">
          <TrendingUp className={`h-4 w-4 ${scoreDifference > 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-sm font-medium ${
            scoreDifference > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {scoreDifference > 0 ? '+' : ''}{Math.abs(scoreDifference)} pts since last review
          </span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Industry Average</span>
            <span className="font-medium">{industryAverage}</span>
          </div>
          <Progress value={industryAverage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Top Competitor</span>
            <span className="font-medium">{topCompetitor}</span>
          </div>
          <Progress value={topCompetitor} className="h-2" />
        </div>
      </div>
    </Card>
  );
};

export default ScoreOverview;
