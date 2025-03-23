
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis } from 'recharts';
import { MarketTrend } from '@/utils/marketDataUtils';

interface MarketTrendChartProps {
  trends: MarketTrend[];
  chartConfig: any;
}

const MarketTrendChart: React.FC<MarketTrendChartProps> = ({ trends, chartConfig }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <BarChart className="h-4 w-4 text-purple-500" />
          Market Growth Trend (5-Year Projection)
        </h3>
        <div className="h-72">
          <ChartContainer className="h-full" config={chartConfig}>
            <AreaChart 
              data={trends}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}M`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                name="Market Value" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrendChart;
