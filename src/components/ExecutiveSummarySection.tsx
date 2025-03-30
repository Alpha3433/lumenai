
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
  // Check if summaryText is empty or undefined, and provide fallback
  const displaySummary = summaryText && summaryText.trim() !== '' 
    ? summaryText 
    : `${businessName} is a promising business venture with strong growth potential. Our focus on innovation and customer satisfaction positions us well in the competitive landscape.`;

  // Extract only the industry overview content from the market analysis
  // This ensures we're not showing the entire market analysis in the industry section
  const industryOverviewText = marketAnalysis ? extractIndustryOverviewOnly(marketAnalysis) : '';
  
  return (
    <section className="mb-12 max-w-3xl mx-auto space-y-8">
      {/* Business Summary */}
      <BusinessSummarySection 
        businessName={businessName}
        summaryText={displaySummary}
      />
      
      <Separator className="my-8" />
      
      {/* Industry Overview - Only passing the industry-specific content */}
      <IndustryOverviewSection 
        businessName={businessName}
        marketAnalysis={industryOverviewText}
      />
    </section>
  );
};

// Helper function to extract only the industry overview section from the market analysis
const extractIndustryOverviewOnly = (text: string): string => {
  // Look for industry overview section
  const industrySection = text.match(/industry\s+overview[^#]*(?=#|$)/i);
  if (industrySection) return industrySection[0];
  
  // Look for first paragraph that mentions industry
  const industryParagraph = text.match(/(\n|^)[^#\n]*industry[^#\n]*(\n|$)/i);
  if (industryParagraph) return industryParagraph[0];
  
  // If can't find specific industry content, return the first 500 chars
  // This is a fallback to ensure we get relevant content
  return text.substring(0, 500);
};

export default ExecutiveSummarySection;
