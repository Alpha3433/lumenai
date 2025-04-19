
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Score Overview Card */}
      <Card className="p-6 bg-white dark:bg-gray-800/50">
        <h2 className="text-lg font-semibold mb-8">Score Overview</h2>
        
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
            <span className={cn(
              "text-sm font-medium",
              scoreDifference > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {scoreDifference > 0 ? '+' : ''}{scoreDifference} pts since last review
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

      {/* Business Details Card */}
      <Card className="p-6 bg-white dark:bg-gray-800/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{businessName}</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {category}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">{businessDescription}</p>
        
        {/* Strengths Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 uppercase tracking-wider">
            Key Strengths
          </h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`strength-${i}`} className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">High margins <span className="text-emerald-600">+12%</span></h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">12% above industry average</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div>
          <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-4 uppercase tracking-wider">
            Areas for Improvement
          </h3>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`improvement-${i}`} className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">High Competition <span className="text-amber-600">+34%</span></h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">34% market growth in competitors</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScoreOverview;
