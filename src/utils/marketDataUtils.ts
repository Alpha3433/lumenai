
// Helper functions for market data extraction and processing

export interface MarketSegment {
  name: string;
  percent: number;
  revenue: number;
}

export interface MarketTrend {
  year: string;
  value: number;
  growth: number;
}

export interface MarketData {
  marketSize: string;
  growthRate: string;
  competitors: number;
  targetCustomers: string;
  segments: MarketSegment[];
  trends: MarketTrend[];
}

export const extractMarketData = (analysisText: string): MarketData => {
  // In a real implementation, we would parse the analysisText to extract this data
  // For now, we'll return mock data that looks realistic
  
  // Try to extract market size using regex
  const marketSizeMatch = analysisText.match(/\$\d+(\.\d+)?\s*(billion|million|B|M)/i);
  const marketSize = marketSizeMatch ? marketSizeMatch[0] : "$4.5B";
  
  // Try to extract growth rate using regex
  const growthRateMatch = analysisText.match(/(\d+(\.\d+)?%)/);
  const growthRate = growthRateMatch ? growthRateMatch[0] : "12.6%";
  
  // Count competitors mentioned
  const competitorsCount = (analysisText.match(/competitor/gi) || []).length;
  const competitors = competitorsCount > 0 ? competitorsCount : 7;
  
  // Extract demographic info
  const targetCustomersMatch = analysisText.match(/ages?\s+(\d+)[-–](\d+)/i);
  const targetCustomers = targetCustomersMatch 
    ? `Ages ${targetCustomersMatch[1]}-${targetCustomersMatch[2]}` 
    : "18-45 professionals";
  
  return {
    marketSize,
    growthRate,
    competitors,
    targetCustomers,
    segments: [
      { name: 'Segment A', percent: 45, revenue: 2.1 },
      { name: 'Segment B', percent: 30, revenue: 1.4 },
      { name: 'Segment C', percent: 15, revenue: 0.7 },
      { name: 'Segment D', percent: 10, revenue: 0.3 },
    ],
    trends: [
      { year: '2022', value: 65, growth: 4.2 },
      { year: '2023', value: 78, growth: 5.6 },
      { year: '2024', value: 87, growth: 7.1 },
      { year: '2025', value: 96, growth: 9.5 },
      { year: '2026', value: 120, growth: 12.0 },
    ]
  };
};

export const getChartConfig = () => ({
  trend: { color: '#8B5CF6' },
  growth: { color: '#10B981' },
  segment: { color: '#9333EA' }
});
