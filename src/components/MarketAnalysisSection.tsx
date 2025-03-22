
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, ArrowUpRight, Layers, TrendingUp, Users } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface MarketAnalysisSectionProps {
  analysisText: string;
}

const MarketAnalysisSection: React.FC<MarketAnalysisSectionProps> = ({ analysisText }) => {
  // Extract market data from analysis text
  const marketData = useMemo(() => {
    // Mock data - in a real app, this would parse the AI-generated text
    return {
      marketSize: "$4.5B",
      growthRate: "12.6%",
      competitors: 7,
      targetCustomers: "18-45 professionals",
      segments: [
        { name: 'Segment A', value: 45 },
        { name: 'Segment B', value: 30 },
        { name: 'Segment C', value: 15 },
        { name: 'Segment D', value: 10 },
      ],
      trends: [
        { year: '2022', value: 65 },
        { year: '2023', value: 78 },
        { year: '2024', value: 87 },
        { year: '2025', value: 96 },
        { year: '2026', value: 120 },
      ]
    };
  }, []);

  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];
  const chartConfig = {
    trend: { color: '#8B5CF6' },
  };

  return (
    <section className="mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-purple-500" />
        Market Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
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
                <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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

        {/* Growth Trend Chart */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Market Growth Trend</h3>
            <div className="h-[200px]">
              <ChartContainer className="h-full" config={chartConfig}>
                <BarChart data={marketData.trends} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Market Value" fill="var(--color-trend)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Segments Chart */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Market Segments</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData.segments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {marketData.segments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Market Analysis</h3>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <p className="leading-relaxed">{analysisText}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MarketAnalysisSection;
