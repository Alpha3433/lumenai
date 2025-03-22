
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from 'lucide-react';

interface FinancialOutlookCardProps {
  revenue?: {
    year1: string;
    year3: string;
  } | null;
  className?: string;
}

const FinancialOutlookCard: React.FC<FinancialOutlookCardProps> = ({ revenue, className = '' }) => {
  return (
    <Card className={`border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-muted-foreground">Financial Outlook</h3>
          <DollarSign className="h-4 w-4 text-green-500" />
        </div>
        <div className="mt-3">
          <p className="text-base font-medium">
            {revenue?.year1 || "Revenue Projections Pending"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {revenue?.year1 ? "Projected First-Year Revenue" : "Comprehensive Analysis Pending"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialOutlookCard;
