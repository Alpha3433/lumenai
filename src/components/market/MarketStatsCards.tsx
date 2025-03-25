
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { MarketTrendStats } from '@/utils/marketTrendsData';

interface MarketStatsCardsProps {
  marketData: MarketTrendStats;
}

const MarketStatsCards: React.FC<MarketStatsCardsProps> = ({ marketData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Reports Available Card */}
      <Card className="border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-blue-600">{marketData.reportsAvailable.count}</div>
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-sm font-medium mb-1">Reports Available</div>
            <div className="flex items-center text-xs text-blue-600">
              <Clock className="h-3 w-3 mr-1" />
              <span>Available now</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{marketData.reportsAvailable.planType}</div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Products Card */}
      <Card className="border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-green-600">{marketData.sustainableProducts.percentage}</div>
              {marketData.sustainableProducts.trend === 'up' ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div className="text-sm font-medium mb-1">Sustainable products</div>
            <div className="text-xs font-medium text-green-600">{marketData.sustainableProducts.nicheName}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Last 24hrs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Newspapers Card */}
      <Card className="border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-red-600">{marketData.printNewspapers.percentage}</div>
              {marketData.printNewspapers.trend === 'up' ? (
                <TrendingUp className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="text-sm font-medium mb-1">Print newspapers</div>
            <div className="text-xs font-medium text-red-600">{marketData.printNewspapers.nicheName}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Last 24hrs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hot Opportunity Card */}
      <Card className="border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-amber-600">{marketData.hotOpportunity.views}</div>
              <Flame className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-sm font-medium mb-1">Hot Opportunity</div>
            <div className="text-xs font-medium text-amber-600">{marketData.hotOpportunity.name}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${marketData.hotOpportunity.confidenceLevel === 'high' ? 'bg-green-500' : marketData.hotOpportunity.confidenceLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></span> 
                {marketData.hotOpportunity.confidenceLevel.charAt(0).toUpperCase() + marketData.hotOpportunity.confidenceLevel.slice(1)}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${marketData.hotOpportunity.riskLevel === 'high' ? 'bg-red-500' : marketData.hotOpportunity.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                {marketData.hotOpportunity.riskLevel.charAt(0).toUpperCase() + marketData.hotOpportunity.riskLevel.slice(1)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketStatsCards;
