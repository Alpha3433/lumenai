
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw } from 'lucide-react';
import { formatLastUpdated } from '@/utils/marketTrendsData';

interface MarketTrendHeaderProps {
  lastUpdated: Date;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const MarketTrendHeader: React.FC<MarketTrendHeaderProps> = ({ 
  lastUpdated, 
  isRefreshing, 
  onRefresh 
}) => {
  return (
    <div className="flex justify-between items-center mb-6 mt-10 pt-4">
      <h1 className="text-2xl font-bold">Market Trends Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          <Clock className="inline-block mr-1 h-4 w-4" />
          Last updated: {formatLastUpdated(lastUpdated)}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <RefreshCw className={`h-4 w-4 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-blue-600">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </Button>
      </div>
    </div>
  );
};

export default MarketTrendHeader;
