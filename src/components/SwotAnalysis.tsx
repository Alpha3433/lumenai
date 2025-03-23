
import React from 'react';
import { cn } from '@/lib/utils';
import { extractSwotComponents } from '@/utils/swotUtils';
import SwotTable from './swot/SwotTable';
import SwotCards from './swot/SwotCards';
import SwotFallback from './swot/SwotFallback';
import ProblemPriorityMatrix from './swot/ProblemPriorityMatrix';
import HighThreatCompetitors from './swot/HighThreatCompetitors';
import { Card, CardContent } from '@/components/ui/card';

interface SwotAnalysisProps {
  swotText: string;
  marketAnalysis?: string;
}

const SwotAnalysis = ({ swotText, marketAnalysis = '' }: SwotAnalysisProps) => {
  // Extract SWOT components from the text
  const swotData = extractSwotComponents(swotText);
  
  // Function to calculate whether we have enough data for the table view
  const hasEnoughDataForTable = () => {
    return swotData.strengths.length > 0 && swotData.weaknesses.length > 0 && 
           swotData.opportunities.length > 0 && swotData.threats.length > 0;
  };

  // Check if swotText is actually parsed properly
  const hasStructuredData = swotData.strengths.length > 0 || swotData.weaknesses.length > 0 || 
                            swotData.opportunities.length > 0 || swotData.threats.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-medium">SWOT Analysis</h3>
        </div>
        <CardContent className="p-6">
          {hasEnoughDataForTable() && <div className="hidden md:block"><SwotTable swotData={swotData} /></div>}
          <div className={cn(hasEnoughDataForTable() ? "md:hidden" : "")}>
            {hasStructuredData ? <SwotCards swotData={swotData} /> : <SwotFallback swotText={swotText} />}
          </div>
        </CardContent>
      </Card>
      
      {/* Only show the Problem Priority Matrix if we have weaknesses or threats */}
      {hasStructuredData && (swotData.weaknesses.length > 0 || swotData.threats.length > 0) && (
        <ProblemPriorityMatrix swotData={swotData} />
      )}
      
      {/* Add the High Threat Competitors section - pass marketAnalysis to it */}
      {marketAnalysis && <HighThreatCompetitors marketAnalysis={marketAnalysis} />}
    </div>
  );
};

export default SwotAnalysis;
