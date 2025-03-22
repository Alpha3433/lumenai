
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, PiggyBank, TrendingUp, Wallet } from 'lucide-react';

interface FinancialSummaryCardsProps {
  totalRevenue: number;
  totalProfit: number;
  avgMargin: number;
  breakEven: string;
}

const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({
  totalRevenue,
  totalProfit,
  avgMargin,
  breakEven
}) => {
  return (
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
            {breakEven}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummaryCards;
