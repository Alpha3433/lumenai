
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ValidationData, getScoreBadge } from '@/utils/businessValidationUtils';
import { LucideIcon, Users, Coins, Target, Calendar, TrendingUp } from 'lucide-react';

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
    <Card className="border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-xl font-bold">Business Idea Validation Score</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Analysis of your business idea based on market potential, profitability, competition, and scalability.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-5xl font-bold">{validationData.overallScore}</div>
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
        <div className="grid grid-cols-1 gap-4">
          {validationData.categories.map((category, index) => {
            // Get the correct icon component
            const IconComponent = iconMap[category.icon] || iconMap.TrendingUp;
            
            return (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{category.score}/100</span>
                </div>
                <Progress 
                  value={category.score} 
                  className="h-2" 
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
      </CardContent>
    </Card>
  );
};

export default ValidationScoreCard;
