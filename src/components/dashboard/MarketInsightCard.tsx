
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from 'lucide-react';

interface MarketInsightCardProps {
  demographic: string | undefined;
  size: string | undefined;
}

const MarketInsightCard: React.FC<MarketInsightCardProps> = ({ demographic, size }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-muted-foreground">Market Insights</h3>
          <PieChart className="h-4 w-4 text-blue-500" />
        </div>
        <div className="mt-3">
          <p className="text-base font-medium">{demographic || "Diverse Demographics"}</p>
          <p className="text-sm text-muted-foreground mt-1">{size || "Market analysis pending"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsightCard;
