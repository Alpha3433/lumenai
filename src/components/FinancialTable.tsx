
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet, BarChart } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface FinancialTableProps {
  financialText: string;
}

const FinancialTable = ({ financialText }: FinancialTableProps) => {
  // Extract financial data from the text
  const extractFinancialData = (text: string) => {
    // Default data structure
    const data = {
      revenue: [
        { year: 'Year 1', amount: 100000 },
        { year: 'Year 2', amount: 150000 },
        { year: 'Year 3', amount: 225000 }
      ],
      expenses: [
        { year: 'Year 1', amount: 80000 },
        { year: 'Year 2', amount: 110000 },
        { year: 'Year 3', amount: 160000 }
      ],
      profit: [
        { year: 'Year 1', amount: 20000 },
        { year: 'Year 2', amount: 40000 },
        { year: 'Year 3', amount: 65000 }
      ],
      breakEven: "12 months"
    };

    // Try to extract real numbers from the text
    try {
      // Find year 1 revenue
      const year1Match = text.match(/year\s*1.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                         text.match(/first\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
      
      // Find year 2 revenue
      const year2Match = text.match(/year\s*2.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                         text.match(/second\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
      
      // Find year 3 revenue
      const year3Match = text.match(/year\s*3.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                         text.match(/third\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
      
      // Break-even
      const breakEvenMatch = text.match(/break[- ]even.*?(\d+)\s*(month|year|day|week)/i);
      
      if (year1Match && year1Match[1]) {
        data.revenue[0].amount = parseFinancialValue(year1Match[0]);
      }
      
      if (year2Match && year2Match[1]) {
        data.revenue[1].amount = parseFinancialValue(year2Match[0]);
      }
      
      if (year3Match && year3Match[1]) {
        data.revenue[2].amount = parseFinancialValue(year3Match[0]);
      }
      
      if (breakEvenMatch) {
        data.breakEven = `${breakEvenMatch[1]} ${breakEvenMatch[2]}${breakEvenMatch[1] !== '1' ? 's' : ''}`;
      }

      // Calculate reasonable expenses and profits based on the revenue
      data.expenses = data.revenue.map(item => ({
        year: item.year,
        amount: Math.round(item.amount * 0.7) // Assume expenses are 70% of revenue
      }));

      data.profit = data.revenue.map((item, index) => ({
        year: item.year,
        amount: item.amount - data.expenses[index].amount
      }));

      return data;
    } catch (e) {
      console.log("Error parsing financial data:", e);
      return data;
    }
  };

  const parseFinancialValue = (valueString: string): number => {
    // Remove $ and commas
    const cleaned = valueString.replace(/[$,]/g, '');
    
    // Extract the numeric part and potential multiplier (k, m, b)
    const match = cleaned.match(/(\d+(?:\.\d+)?)\s*(?:thousand|million|billion|k|m|b)?/i);
    
    if (!match) return 0;
    
    let value = parseFloat(match[1]);
    const multiplier = match[2]?.toLowerCase();
    
    // Apply multiplier if present
    if (multiplier === 'k' || multiplier === 'thousand') value *= 1000;
    else if (multiplier === 'm' || multiplier === 'million') value *= 1000000;
    else if (multiplier === 'b' || multiplier === 'billion') value *= 1000000000;
    
    return value;
  };

  const financialData = extractFinancialData(financialText);
  
  // Prepare data for chart
  const chartData = financialData.revenue.map((item, index) => ({
    name: item.year,
    Revenue: item.amount,
    Expenses: financialData.expenses[index].amount,
    Profit: financialData.profit[index].amount
  }));

  // Calculate financial metrics
  const totalRevenue = financialData.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalProfit = financialData.profit.reduce((sum, item) => sum + item.amount, 0);
  const avgMargin = Math.round((totalProfit / totalRevenue) * 100);

  return (
    <div className="space-y-6">
      {/* Financial summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-100 dark:border-green-900/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mb-2">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total 3-Year Revenue</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              ${(totalRevenue).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-100 dark:border-blue-900/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mb-2">
              <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total 3-Year Profit</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${(totalProfit).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-100 dark:border-purple-900/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {avgMargin}%
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 border-amber-100 dark:border-amber-900/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mb-2">
              <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Break-even Point</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {financialData.breakEven}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px] font-semibold">Period</TableHead>
              <TableHead className="font-semibold">Revenue</TableHead>
              <TableHead className="font-semibold">Expenses</TableHead>
              <TableHead className="font-semibold">Profit</TableHead>
              <TableHead className="font-semibold text-right">Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialData.revenue.map((item, index) => {
              const margin = Math.round((financialData.profit[index].amount / item.amount) * 100);
              return (
                <TableRow key={item.year} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{item.year}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">
                    ${item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">
                    ${financialData.expenses[index].amount.toLocaleString()}
                  </TableCell>
                  <TableCell className={financialData.profit[index].amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    ${financialData.profit[index].amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={margin > 20 ? "default" : margin > 10 ? "secondary" : "outline"} 
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                    >
                      {margin}%
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

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
    </div>
  );
};

export default FinancialTable;
