
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
    <section className="mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-purple-500" />
        Market Analysis
      </h2>

      {/* Key Metrics Cards */}
      <KeyMetricsCards marketData={marketData} />

      {/* Market Analysis Text and Market Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnalysisTextCard analysisText={analysisText} />
        <MarketTrendChart trends={marketData.trends} chartConfig={chartConfig} />
      </div>

      {/* Annual Growth Rate and Segment Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GrowthRateChart trends={marketData.trends} chartConfig={chartConfig} />
        <SegmentChart segments={marketData.segments} chartConfig={chartConfig} />
      </div>

      {/* Market Segments Breakdown Table */}
      <SegmentTable segments={marketData.segments} />
    </section>
  );
};

export default MarketAnalysisSection;
