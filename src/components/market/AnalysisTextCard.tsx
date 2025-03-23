
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart } from 'lucide-react';

interface AnalysisTextCardProps {
  analysisText: string;
}

const AnalysisTextCard: React.FC<AnalysisTextCardProps> = ({ analysisText }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm h-full">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <LineChart className="h-4 w-4 text-purple-500" />
          Market Analysis
        </h3>
        <div className="prose dark:prose-invert max-w-none text-sm">
          <p className="leading-relaxed mb-4">{analysisText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTextCard;
