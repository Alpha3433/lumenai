
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet, BarChart } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
      ]
    };

    // Try to extract real numbers from the text
    try {
      // Find revenue numbers
      const revenueMatch = text.match(/\$\s?(\d{1,3}(,\d{3})*(\.\d+)?)\s?(thousand|million|billion|k|m|b)?/gi);
      if (revenueMatch && revenueMatch.length >= 3) {
        for (let i = 0; i < Math.min(3, revenueMatch.length); i++) {
          data.revenue[i].amount = parseFinancialValue(revenueMatch[i]);
        }
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
    const match = cleaned.match(/(\d+(\.\d+)?)\s*(thousand|million|billion|k|m|b)?/i);
    
    if (!match) return 0;
    
    let value = parseFloat(match[1]);
    const multiplier = match[3]?.toLowerCase();
    
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

  return (
    <div className="space-y-6 mt-4">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Period</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialData.revenue.map((item, index) => (
              <TableRow key={item.year}>
                <TableCell className="font-medium">{item.year}</TableCell>
                <TableCell className="text-green-600">
                  ${item.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-red-600">
                  ${financialData.expenses[index].amount.toLocaleString()}
                </TableCell>
                <TableCell className={financialData.profit[index].amount >= 0 ? "text-green-600" : "text-red-600"}>
                  ${financialData.profit[index].amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="h-80 mt-6">
        <ChartContainer 
          config={{
            Revenue: { color: "#22c55e" },
            Expenses: { color: "#ef4444" },
            Profit: { color: "#3b82f6" }
          }}
        >
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Revenue" fill="#22c55e" name="Revenue" />
            <Bar dataKey="Expenses" fill="#ef4444" name="Expenses" />
            <Bar dataKey="Profit" fill="#3b82f6" name="Profit" />
          </RechartsBarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default FinancialTable;
