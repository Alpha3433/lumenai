
import React from 'react';
import { cn } from '@/lib/utils';
import { extractSwotData } from '@/utils/swotUtils';
import SwotTable from './swot/SwotTable';
import SwotCards from './swot/SwotCards';
import SwotFallback from './swot/SwotFallback';
import ProblemPriorityMatrix from './swot/ProblemPriorityMatrix';
import HighThreatCompetitors from './swot/HighThreatCompetitors';
import { CheckCircle } from 'lucide-react';

interface SwotAnalysisProps {
  swotText: string;
  marketAnalysis?: string;
}

const SwotAnalysis = ({ swotText, marketAnalysis = '' }: SwotAnalysisProps) => {
  // Extract SWOT components from the text
  const swotData = extractSwotData(swotText);
  
  // Function to calculate whether we have enough data for the table view
  const hasEnoughDataForTable = () => {
    return swotData.strengths.length > 0 && swotData.weaknesses.length > 0 && 
           swotData.opportunities.length > 0 && swotData.threats.length > 0;
  };

  // Check if swotText is actually parsed properly
  const hasStructuredData = swotData.strengths.length > 0 || swotData.weaknesses.length > 0 || 
                            swotData.opportunities.length > 0 || swotData.threats.length > 0;

  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <CheckCircle className="h-5 w-5 text-purple-500" />
          </div>
          SWOT Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Strategic position assessment
        </div>
      </div>

      <div className="space-y-6">
        {hasEnoughDataForTable() && <div className="hidden md:block"><SwotTable swotData={swotData} /></div>}
        <div className={cn(hasEnoughDataForTable() ? "md:hidden" : "")}>
          {hasStructuredData ? <SwotCards swotData={swotData} /> : <SwotFallback swotText={swotText} />}
        </div>
        
        {/* Only show the Problem Priority Matrix if we have weaknesses or threats */}
        {hasStructuredData && (swotData.weaknesses.length > 0 || swotData.threats.length > 0) && (
          <ProblemPriorityMatrix swotData={swotData} />
        )}
        
        {/* Add the High Threat Competitors section - pass marketAnalysis to it */}
        {marketAnalysis && <HighThreatCompetitors marketAnalysis={marketAnalysis} />}
      </div>
    </section>
  );
};

export default SwotAnalysis;
