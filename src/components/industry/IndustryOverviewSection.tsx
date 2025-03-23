
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building, BarChart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractTargetMarket } from '@/utils/extraction/marketExtraction';
import { getIndustryOverview, splitIntoParagraphs } from '@/utils/extraction/industryExtraction';

interface IndustryOverviewSectionProps {
  businessName: string;
  marketAnalysis?: string;
}

const IndustryOverviewSection: React.FC<IndustryOverviewSectionProps> = ({ 
  businessName, 
  marketAnalysis 
}) => {
  // Extract industry information from market analysis
  // We're only receiving the industry overview portion of the text now
  const marketData = marketAnalysis ? extractTargetMarket(marketAnalysis) : null;
  const industryText = marketAnalysis || getIndustryOverview('', businessName);
  
  // Split industry text into paragraphs for better presentation
  const industryParagraphs = splitIntoParagraphs(industryText);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Building className="h-6 w-6 text-indigo-500" />
        Industry Overview
      </h2>
      
      <Card className={cn(
        "border border-gray-200 dark:border-gray-800 shadow-md",
        "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
      )}>
        <CardContent className="p-8">
          <div className="prose dark:prose-invert max-w-none">
            {industryParagraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-gray-700 dark:text-gray-300 text-base mb-4">
                {paragraph}
              </p>
            ))}
            
            {marketData && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <BarChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Market Size
                    </h3>
                  </div>
                  <p className="text-base font-semibold">{marketData.size}</p>
                </div>
                
                <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Growth Rate
                    </h3>
                  </div>
                  <p className="text-base font-semibold">{marketData.growth}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryOverviewSection;
