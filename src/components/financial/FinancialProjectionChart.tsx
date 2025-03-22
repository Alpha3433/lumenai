
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import type { FinancialData } from '@/utils/financialUtils';

interface FinancialProjectionChartProps {
  financialData: FinancialData;
}

const FinancialProjectionChart: React.FC<FinancialProjectionChartProps> = ({ financialData }) => {
  // Prepare data for chart
  const chartData = financialData.revenue.map((item, index) => ({
    name: item.year,
    Revenue: item.amount,
    Expenses: financialData.expenses[index].amount,
    Profit: financialData.profit[index].amount
  }));

  return (
    <Card className="border border-gray-200 dark:border-gray-800 mt-8">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Revenue, Expenses & Profit Projection
        </h3>
        
        <div className="h-80">
          <ChartContainer 
            className="h-full"
            config={{
              Revenue: { color: "#22c55e" },
              Expenses: { color: "#ef4444" },
              Profit: { color: "#3b82f6" }
            }}
          >
            <RechartsBarChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#d4d4d8' }}
                axisLine={{ stroke: '#d4d4d8' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#d4d4d8' }}
                axisLine={{ stroke: '#d4d4d8' }}
                tickFormatter={(value) => `$${value >= 1000 ? `${Math.round(value/1000)}k` : value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderColor: '#d4d4d8',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar dataKey="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
              <Bar dataKey="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Profit" />
            </RechartsBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialProjectionChart;
