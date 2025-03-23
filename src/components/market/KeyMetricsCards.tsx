
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight, Target, Users } from 'lucide-react';
import { MarketData } from '@/utils/marketDataUtils';

interface KeyMetricsCardsProps {
  marketData: MarketData;
}

const KeyMetricsCards: React.FC<KeyMetricsCardsProps> = ({ marketData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900/50">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Market Size</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{marketData.marketSize}</p>
        </CardContent>
      </Card>
      
      <Card className="border border-indigo-100 dark:border-indigo-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900/50">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mb-2">
            <ArrowUpRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{marketData.growthRate}</p>
        </CardContent>
      </Card>
      
      <Card className="border border-blue-100 dark:border-blue-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/50">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mb-2">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Competitors</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{marketData.competitors}</p>
        </CardContent>
      </Card>
      
      <Card className="border border-sky-100 dark:border-sky-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/20 dark:to-gray-900/50">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-sky-100 dark:bg-sky-900/30 p-2 rounded-full mb-2">
            <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
          <p className="text-lg font-bold text-sky-600 dark:text-sky-400">{marketData.targetCustomers}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetricsCards;
