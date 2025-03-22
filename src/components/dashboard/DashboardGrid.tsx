
import React from 'react';
import MarketInsightCard from './MarketInsightCard';
import FinancialOutlookCard from './FinancialOutlookCard';
import TargetAudienceCard from './TargetAudienceCard';

interface DashboardGridProps {
  targetMarket: {
    demographic: string;
    size: string;
    audience: string;
    growth: string;
  } | null;
  revenue: {
    year1: string;
    year3: string;
  } | null;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ targetMarket, revenue }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Key Market Stats */}
      <MarketInsightCard 
        demographic={targetMarket?.demographic} 
        size={targetMarket?.size} 
      />

      {/* Revenue Projection */}
      <FinancialOutlookCard revenue={revenue} />

      {/* Customer Focus */}
      <TargetAudienceCard 
        audience={targetMarket?.audience} 
        growth={targetMarket?.growth} 
      />
    </div>
  );
};

export default DashboardGrid;
