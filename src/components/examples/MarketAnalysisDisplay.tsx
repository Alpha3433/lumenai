
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface MarketAnalysisDisplayProps {
  company: any;
}

const MarketAnalysisDisplay: React.FC<MarketAnalysisDisplayProps> = ({ company }) => {
  const marketData = company.marketAnalysis || {
    industrySize: `$${(Math.random() * 900 + 100).toFixed(1)} Billion`,
    growthRate: `${(Math.random() * 15 + 5).toFixed(1)}%`,
    marketShare: (Math.random() * 25 + 5).toFixed(1),
    competitorAnalysis: [
      { name: "Competitor A", marketShare: (Math.random() * 20 + 5).toFixed(1) },
      { name: "Competitor B", marketShare: (Math.random() * 15 + 5).toFixed(1) },
      { name: "Competitor C", marketShare: (Math.random() * 10 + 5).toFixed(1) },
      { name: "Others", marketShare: (Math.random() * 40 + 30).toFixed(1) }
    ],
    trends: [
      "Increased adoption of digital solutions",
      "Growing focus on sustainability",
      "Rising consumer demand for personalized experiences",
      "Shift towards subscription-based business models"
    ],
    challenges: [
      "Intense competition from established players",
      "Rapidly evolving technology landscape",
      "Changing regulatory requirements",
      "Consumer privacy concerns"
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Market Analysis</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        An in-depth analysis of the {company.industry} industry, market trends, and {company.name}'s competitive position.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Industry Size</div>
            <div className="text-2xl font-bold">{marketData.industrySize}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Growth Rate</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-500">{marketData.growthRate}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{company.name}'s Share</div>
            <div className="text-2xl font-bold">{marketData.marketShare}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Competitors</div>
            <div className="text-2xl font-bold">{marketData.competitorAnalysis.length - 1}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Market Share Analysis</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{company.name}</span>
            <span className="text-sm font-bold">{marketData.marketShare}%</span>
          </div>
          <Progress value={parseFloat(marketData.marketShare)} className="h-2" />
          
          {marketData.competitorAnalysis.filter(comp => comp.name !== "Others").map((competitor, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{competitor.name}</span>
                <span className="text-sm font-bold">{competitor.marketShare}%</span>
              </div>
              <Progress value={parseFloat(competitor.marketShare)} className="h-2 bg-gray-200 dark:bg-gray-700" />
            </React.Fragment>
          ))}
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Others</span>
            <span className="text-sm font-bold">
              {marketData.competitorAnalysis.find(comp => comp.name === "Others")?.marketShare || "35.5"}%
            </span>
          </div>
          <Progress value={parseFloat(marketData.competitorAnalysis.find(comp => comp.name === "Others")?.marketShare || "35.5")} className="h-2 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      
      <Separator />
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Key Market Trends</h3>
          <ul className="space-y-2">
            {marketData.trends.map((trend, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-500 font-bold">•</span>
                <span className="text-gray-700 dark:text-gray-300">{trend}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Market Challenges</h3>
          <ul className="space-y-2">
            {marketData.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisDisplay;
