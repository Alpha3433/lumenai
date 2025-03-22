
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ValidationData, getScoreBadge } from '@/utils/businessValidation';
import { LucideIcon, Users, Coins, Target, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

interface ValidationScoreCardProps {
  validationData: ValidationData;
}

const ValidationScoreCard = ({ validationData }: ValidationScoreCardProps) => {
  // Map icon strings to actual Lucide components
  const iconMap: Record<string, LucideIcon> = {
    Users: Users,
    Coins: Coins,
    Target: Target,
    Calendar: Calendar,
    TrendingUp: TrendingUp,
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-foreground">Business Idea Validation Score</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Analysis of your business idea based on market potential, profitability, and scalability.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
            <div className="text-5xl font-bold text-foreground">{validationData.overallScore}</div>
            <div className="flex flex-col items-start">
              <Badge className={getScoreBadge(validationData.overallScore)}>
                {validationData.overallScore >= 80 ? "Strong Potential" : 
                 validationData.overallScore >= 60 ? "Promising" : "Needs Work"}
              </Badge>
              <span className="text-xs text-muted-foreground mt-1">Overall Score</span>
            </div>
          </div>
        </div>
        
        {/* Category scores */}
        <div className="space-y-5 mb-8">
          {validationData.categories.map((category, index) => {
            // Get the correct icon component
            const IconComponent = iconMap[category.icon] || iconMap.TrendingUp;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-full ${
                      category.score >= 70 ? "bg-green-100 dark:bg-green-900/30" : 
                      category.score >= 50 ? "bg-amber-100 dark:bg-amber-900/30" : 
                      "bg-red-100 dark:bg-red-900/30"
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        category.score >= 70 ? "text-green-600 dark:text-green-400" : 
                        category.score >= 50 ? "text-amber-600 dark:text-amber-400" : 
                        "text-red-600 dark:text-red-400"
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{category.score}/100</span>
                </div>
                <Progress 
                  value={category.score} 
                  className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800" 
                  indicatorClassName={
                    category.score >= 70 ? "bg-green-500" : 
                    category.score >= 50 ? "bg-amber-500" : 
                    "bg-red-500"
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Key metrics section with dot points */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl">
          <h4 className="font-medium text-sm mb-3 text-foreground">Key Metrics Explained:</h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium">Market Need</span>: Measures the urgency and size of the problem your business solves
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium">Profitability</span>: Assesses revenue potential and projected margins
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium">Competition</span>: Evaluates the competitive landscape and barriers to entry
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium">Time to Market</span>: Indicates how quickly your business can launch
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium">Scalability</span>: Measures growth potential and ability to expand
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationScoreCard;
