
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Activity } from 'lucide-react';
import KeyInsightCard from './KeyInsightCard';

interface InsightsGridProps {
  strengths: string[];
  opportunities: string[];
  className?: string;
}

const InsightsGrid: React.FC<InsightsGridProps> = ({ strengths, opportunities, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {/* Strengths */}
      <KeyInsightCard 
        title="Key Strengths"
        icon={Lightbulb}
        iconColor="text-amber-500"
        insights={strengths}
        prefix="S"
        badgeColors={{
          bg: "bg-amber-50",
          darkBg: "bg-amber-900/20",
          text: "text-amber-700",
          darkText: "text-amber-300",
          border: "border-amber-200",
          darkBorder: "border-amber-800"
        }}
        value="" // Adding an empty value prop to satisfy type checks
      />

      {/* Opportunities */}
      <KeyInsightCard 
        title="Key Opportunities"
        icon={Activity}
        iconColor="text-emerald-500"
        insights={opportunities}
        prefix="O"
        badgeColors={{
          bg: "bg-emerald-50",
          darkBg: "bg-emerald-900/20",
          text: "text-emerald-700",
          darkText: "text-emerald-300",
          border: "border-emerald-200",
          darkBorder: "border-emerald-800"
        }}
        value="" // Adding an empty value prop to satisfy type checks
      />
    </div>
  );
};

export default InsightsGrid;
