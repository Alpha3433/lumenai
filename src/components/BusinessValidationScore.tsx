
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, TrendingUp, Target, Users, Coins, Calendar, HelpCircle } from 'lucide-react';

interface BusinessValidationScoreProps {
  businessText: string;
}

const BusinessValidationScore = ({ businessText }: BusinessValidationScoreProps) => {
  // Extract key points from business description text
  const extractValidationData = (text: string) => {
    // Default scoring structure
    const validationData = {
      overallScore: 72,
      categories: [
        { name: 'Market Need', score: 75, icon: Users, color: 'text-blue-600' },
        { name: 'Profitability', score: 65, icon: Coins, color: 'text-green-600' },
        { name: 'Competition', score: 60, icon: Target, color: 'text-purple-600' },
        { name: 'Time to Market', score: 80, icon: Calendar, color: 'text-amber-600' },
        { name: 'Scalability', score: 70, icon: TrendingUp, color: 'text-indigo-600' },
      ],
      positives: [
        "Addresses a clear market need",
        "Low initial capital required",
        "Attractive target demographic",
        "Strong revenue potential"
      ],
      negatives: [
        "Crowded competitive landscape",
        "Low barriers to entry",
        "Requires strong marketing strategy",
        "Seasonal demand fluctuations"
      ],
      recommendations: [
        "Focus on unique selling proposition",
        "Develop strong brand identity",
        "Partner with established players",
        "Build scalable systems from the start"
      ]
    };

    // Try to extract real insights from the text
    try {
      // Extract points based on keywords
      const marketMatch = text.match(/market.{1,30}(strong|positive|good|potential|opportunity|need|demand|large|growing|niche)/gi);
      const profitMatch = text.match(/(profit|revenue|monetization|margin).{1,30}(high|good|strong|potential)/gi);
      const competitionMatch = text.match(/(competition|competitive|competitor|market share).{1,50}/gi);
      const scaleMatch = text.match(/(scale|growth|expand).{1,40}/gi);
      
      // Adjust scores based on text analysis
      if (marketMatch && marketMatch.length > 2) {
        validationData.categories[0].score = Math.min(95, validationData.categories[0].score + 20);
      } else if (text.match(/market.{1,30}(weak|saturated|difficult|challenging)/gi)) {
        validationData.categories[0].score = Math.max(30, validationData.categories[0].score - 15);
      }
      
      if (profitMatch && profitMatch.length > 1) {
        validationData.categories[1].score = Math.min(95, validationData.categories[1].score + 15);
      } else if (text.match(/(profit|revenue|monetization).{1,30}(low|challenging|difficult|unclear)/gi)) {
        validationData.categories[1].score = Math.max(25, validationData.categories[1].score - 20);
      }
      
      if (competitionMatch && text.match(/(low|minimal|little) competition/gi)) {
        validationData.categories[2].score = Math.min(95, validationData.categories[2].score + 20);
      } else if (text.match(/(high|strong|fierce) competition/gi)) {
        validationData.categories[2].score = Math.max(30, validationData.categories[2].score - 15);
      }
      
      if (scaleMatch && scaleMatch.length > 1) {
        validationData.categories[4].score = Math.min(95, validationData.categories[4].score + 10);
      }
      
      // Extract positives and negatives
      const positivePhrases = [
        /unique (selling point|value proposition)/i,
        /first mover advantage/i,
        /proprietary technology/i,
        /strong team/i,
        /clear revenue model/i,
        /growing market/i,
        /high margins/i,
        /recurring revenue/i,
        /network effects/i,
        /proven concept/i
      ];
      
      const negativePhrases = [
        /high (competition|competitive)/i,
        /regulatory (challenges|hurdles|issues)/i,
        /high customer acquisition cost/i,
        /low margins/i,
        /limited (scalability|scaling)/i,
        /high capital requirements/i,
        /long sales cycle/i,
        /seasonal business/i,
        /pricing pressure/i,
        /uncertain demand/i
      ];
      
      // Find positives
      const foundPositives = [];
      positivePhrases.forEach(phrase => {
        const match = text.match(phrase);
        if (match) {
          foundPositives.push(match[0].charAt(0).toUpperCase() + match[0].slice(1));
        }
      });
      
      // Find negatives
      const foundNegatives = [];
      negativePhrases.forEach(phrase => {
        const match = text.match(phrase);
        if (match) {
          foundNegatives.push(match[0].charAt(0).toUpperCase() + match[0].slice(1));
        }
      });
      
      // Use found insights if available
      if (foundPositives.length > 0) {
        validationData.positives = foundPositives.slice(0, 4);
      }
      
      if (foundNegatives.length > 0) {
        validationData.negatives = foundNegatives.slice(0, 4);
      }
      
      // Calculate overall score (weighted average)
      const weights = [0.25, 0.2, 0.15, 0.15, 0.25]; // Weights for each category
      const weightedScore = validationData.categories.reduce((sum, category, index) => {
        return sum + (category.score * weights[index]);
      }, 0);
      
      validationData.overallScore = Math.round(weightedScore);
      
      return validationData;
    } catch (e) {
      console.log("Error parsing validation data:", e);
      return validationData;
    }
  };

  const validationData = extractValidationData(businessText);
  
  // Get colored badge for overall score
  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (score >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };
  
  // Get recommendation based on score
  const getRecommendation = (score: number) => {
    if (score >= 80) return "This business idea shows strong potential for success.";
    if (score >= 60) return "This business idea has merit but requires refinement.";
    return "This business concept needs significant rethinking before proceeding.";
  };
  
  return (
    <div className="space-y-6">
      {/* Overall score card */}
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
            {validationData.categories.map((category, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <category.icon className={`h-4 w-4 ${category.color}`} />
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
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Pros and cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Positives */}
        <Card className="border border-green-100 dark:border-green-900/30 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {validationData.positives.map((positive, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                  <span className="text-sm">{positive}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Negatives */}
        <Card className="border border-red-100 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 to-white dark:from-red-950/20 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold">Challenges</h3>
            </div>
            <ul className="space-y-2">
              {validationData.negatives.map((negative, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                  <span className="text-sm">{negative}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommendations */}
      <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold">Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {getRecommendation(validationData.overallScore)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {validationData.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessValidationScore;
