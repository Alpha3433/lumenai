
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { MarketSegment } from '@/utils/marketDataUtils';

interface SegmentChartProps {
  segments: MarketSegment[];
  chartConfig: any;
}

const SegmentChart: React.FC<SegmentChartProps> = ({ segments, chartConfig }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-500" />
          Market Segment Distribution
        </h3>
        <div className="h-64">
          <ChartContainer className="h-full" config={chartConfig}>
            <BarChart 
              data={segments}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="percent" 
                name="Market Share (%)" 
                fill="#9333EA" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentChart;
