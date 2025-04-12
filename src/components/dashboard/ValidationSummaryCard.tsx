
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, AlertCircle } from 'lucide-react';

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
  // Determine score color based on value
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  // Calculate circumference and offset for circular progress
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <Card className="border border-blue-100 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle 
                cx="60" 
                cy="60" 
                r={radius} 
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <circle 
                cx="60" 
                cy="60" 
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                className={`${getScoreColor()} transform -rotate-90 origin-center transition-all duration-1000 ease-out`}
              />
              {/* Score text */}
              <text 
                x="60" 
                y="60" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className={`font-bold text-3xl ${getScoreColor()}`}
              >
                {score}
              </text>
              {/* Out of 100 label */}
              <text 
                x="60" 
                y="78" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="text-xs text-gray-500 dark:text-gray-400 font-medium"
              >
                out of 100
              </text>
            </svg>
          </div>
          
          {/* Summary content */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3 text-foreground">
              Business Validation Score
            </h2>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{businessName}</h3>
            
            <div className="space-y-4">
              {/* Positives */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Key Strengths:</h4>
                <ul className="space-y-1">
                  {positives.map((positive, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CircleCheckBig className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{positive}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Negatives */}
              {negatives.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Areas for Improvement:</h4>
                  <ul className="space-y-1">
                    {negatives.map((negative, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{negative}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationSummaryCard;
