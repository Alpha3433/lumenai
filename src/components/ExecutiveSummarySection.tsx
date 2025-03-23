
import React from 'react';
import { Separator } from "@/components/ui/separator";
import BusinessSummarySection from './business/BusinessSummarySection';
import IndustryOverviewSection from './industry/IndustryOverviewSection';

interface ExecutiveSummarySectionProps {
  summaryText: string;
  businessName: string;
  marketAnalysis?: string;
}

const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ 
  summaryText, 
  businessName, 
  marketAnalysis 
}) => {
  return (
    <section className="mb-12 max-w-3xl mx-auto space-y-8">
      {/* Business Summary */}
      <BusinessSummarySection 
        businessName={businessName}
        summaryText={summaryText}
      />
      
      <Separator className="my-8" />
      
      {/* Industry Overview */}
      <IndustryOverviewSection 
        businessName={businessName}
        marketAnalysis={marketAnalysis}
      />
    </section>
  );
};

export default ExecutiveSummarySection;
