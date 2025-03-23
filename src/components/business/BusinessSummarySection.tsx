
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessSummarySectionProps {
  businessName: string;
  summaryText: string;
}

const BusinessSummarySection: React.FC<BusinessSummarySectionProps> = ({ 
  businessName, 
  summaryText 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FileText className="h-6 w-6 text-blue-500" />
        What is {businessName}?
      </h2>
      
      <Card className={cn(
        "border border-gray-200 dark:border-gray-800 shadow-md",
        "bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent"
      )}>
        <CardContent className="p-8 relative">
          <Quote className="absolute top-4 left-4 h-8 w-8 text-blue-200 dark:text-blue-900/40 -z-10" />
          <Quote className="absolute bottom-4 right-4 h-8 w-8 text-blue-200 dark:text-blue-900/40 transform rotate-180 -z-10" />
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
              {summaryText || "Loading..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSummarySection;
