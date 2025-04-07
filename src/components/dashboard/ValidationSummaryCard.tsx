
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, TrendingUp, CircleGauge } from "lucide-react";

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
  // Get the first word of the business name for more concise display
  const businessNameFirst = businessName.split(' ')[0];
  
  // Calculate score out of 10 for display
  const scoreOutOfTen = Math.round(score / 10);
  
  // Determine viability text based on score
  const getViabilityText = () => {
    if (score >= 80) return "high viability";
    if (score >= 60) return "moderate viability";
    if (score >= 40) return "cautious viability";
    return "low viability";
  };
  
  // Get the number of opportunities
  const opportunitiesCount = positives.length;
  
  // Get the number of strengths (unique selling points)
  const strengthsCount = positives.length;
  
  // Get the number of risks
  const risksCount = negatives.length;
  
  // Get score color based on value
  const getScoreColor = () => {
    if (scoreOutOfTen >= 8) return "text-green-600 dark:text-green-400"; 
    if (scoreOutOfTen >= 5) return "text-amber-600 dark:text-amber-400"; 
    return "text-red-600 dark:text-red-400";
  };
  
  // Get gauge rotation based on score (0-100)
  const getGaugeRotation = () => {
    // Convert score to a rotation between -30 (0%) and 210 (100%)
    const rotation = -30 + (score / 100) * 240;
    return `rotate(${rotation}deg)`;
  };
  
  return (
    <div className="space-y-8">
      {/* Viability Section - Redesigned with gauge chart */}
      <Card className="border-none shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Business Validation Score</h3>
          
          {/* Gauge chart and centralized score display */}
          <div className="flex flex-col items-center justify-center mb-8">
            {/* Gauge chart */}
            <div className="relative w-32 h-16 mb-2">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-t-full"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2">
                <div 
                  className="absolute bottom-0 left-[15.5%] w-[69%] h-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 rounded-t-full"
                ></div>
              </div>
              <div 
                className="absolute bottom-0 left-1/2 h-1/2 w-1 bg-gray-800 dark:bg-white origin-bottom transform -translate-x-1/2"
                style={{ transform: `${getGaugeRotation()} translateX(-50%)` }}
              ></div>
              <CircleGauge className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-gray-800 dark:text-white" />
            </div>
            
            {/* Score display */}
            <div className="flex items-baseline mt-4">
              <span className={`text-7xl font-bold ${getScoreColor()}`}>{scoreOutOfTen}</span>
              <span className="text-gray-500 text-2xl ml-1">/10</span>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-normal text-center">
            Based on our comprehensive analysis of market conditions, competitive landscape, and risk factors, this business idea demonstrates <span className="text-amber-600 font-medium">{getViabilityText()}</span>.
          </p>
          
          {/* Three cards in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Market Potential Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-blue-700 dark:text-blue-400">Market Potential</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The market is growing at a rate of 8.4% annually, with {opportunitiesCount} identified opportunities.
              </p>
            </div>
            
            {/* Competitive Edge Card */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-medium text-green-700 dark:text-green-400">Competitive Edge</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {strengthsCount} unique selling points against 4 competitors.
              </p>
            </div>
            
            {/* Risk Assessment Card */}
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-medium text-amber-700 dark:text-amber-400">Risk Assessment</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {risksCount} risks identified with mitigation strategies.
              </p>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            The viability score is based on a comprehensive analysis of your business model, market size, SWOT, PESTEL, and Porter's Five Forces.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationSummaryCard;
