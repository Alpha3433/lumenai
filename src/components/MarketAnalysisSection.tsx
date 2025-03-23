
import React, { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { extractMarketData, getChartConfig } from '@/utils/marketDataUtils';
import KeyMetricsCards from './market/KeyMetricsCards';
import AnalysisTextCard from './market/AnalysisTextCard';
import MarketTrendChart from './market/MarketTrendChart';
import GrowthRateChart from './market/GrowthRateChart';
import SegmentChart from './market/SegmentChart';
import SegmentTable from './market/SegmentTable';

interface MarketAnalysisSectionProps {
  analysisText: string;
}

const MarketAnalysisSection: React.FC<MarketAnalysisSectionProps> = ({ analysisText }) => {
  // Extract market data from analysis text
  const marketData = useMemo(() => extractMarketData(analysisText), [analysisText]);
  const chartConfig = getChartConfig();

  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-purple-500" />
          Market Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          Data extracted from AI analysis
        </div>
      </div>

      {/* Key Metrics Cards - Top Row */}
      <KeyMetricsCards marketData={marketData} />

      {/* Main Content Grid - Analysis Text and Market Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisTextCard analysisText={analysisText} />
        <MarketTrendChart trends={marketData.trends} chartConfig={chartConfig} />
      </div>

      {/* Chart Comparison Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthRateChart trends={marketData.trends} chartConfig={chartConfig} />
        <SegmentChart segments={marketData.segments} chartConfig={chartConfig} />
      </div>

      {/* Market Segments Table - Full Width */}
      <SegmentTable segments={marketData.segments} />
    </section>
  );
};

export default MarketAnalysisSection;
