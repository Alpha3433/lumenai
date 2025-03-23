
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { MarketTrend } from '@/utils/marketDataUtils';

interface GrowthRateChartProps {
  trends: MarketTrend[];
  chartConfig: any;
}

const GrowthRateChart: React.FC<GrowthRateChartProps> = ({ trends, chartConfig }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          Annual Growth Rate (%)
        </h3>
        <div className="h-64">
          <ChartContainer className="h-full" config={chartConfig}>
            <BarChart 
              data={trends}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="growth" 
                name="Growth Rate" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthRateChart;
