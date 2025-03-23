
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
  // Mock data - in a real app, this would parse the AI-generated text
  return {
    marketSize: "$4.5B",
    growthRate: "12.6%",
    competitors: 7,
    targetCustomers: "18-45 professionals",
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
