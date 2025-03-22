
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import FinancialSummaryCards from './financial/FinancialSummaryCards';
import FinancialProjectionChart from './financial/FinancialProjectionChart';
import { extractFinancialData } from '@/utils/financialUtils';

interface FinancialTableProps {
  financialText: string;
}

const FinancialTable = ({ financialText }: FinancialTableProps) => {
  const financialData = extractFinancialData(financialText);
  
  // Calculate financial metrics
  const totalRevenue = financialData.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalProfit = financialData.profit.reduce((sum, item) => sum + item.amount, 0);
  const avgMargin = Math.round((totalProfit / totalRevenue) * 100);

  return (
    <div className="space-y-6">
      {/* Financial summary cards */}
      <FinancialSummaryCards 
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
        avgMargin={avgMargin}
        breakEven={financialData.breakEven}
      />

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

      {/* Financial Projection Chart */}
      <FinancialProjectionChart financialData={financialData} />
    </div>
  );
};

export default FinancialTable;
