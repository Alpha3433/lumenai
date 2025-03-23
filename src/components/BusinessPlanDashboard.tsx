
import React from 'react';
import { Separator } from "@/components/ui/separator";
import InsightsGrid from './dashboard/InsightsGrid';
import ValidationSummaryCard from './dashboard/ValidationSummaryCard';
import { 
  extractTargetMarket, 
  extractRevenue, 
  extractStrengths, 
  extractOpportunities,
  extractCompetitors
} from '@/components/dashboard/DashboardUtils';
import { extractValidationData } from '@/utils/businessValidation';

interface BusinessPlanDashboardProps {
  businessName: string;
  businessPlan: {
    executiveSummary: string;
    marketAnalysis: string;
    businessModel: string;
    swotAnalysis: string;
    financialProjections?: string; 
    riskAssessment?: string;
  };
}

const BusinessPlanDashboard: React.FC<BusinessPlanDashboardProps> = ({ 
  businessName, 
  businessPlan 
}) => {
  // Extract key metrics and insights from the business plan
  const targetMarket = extractTargetMarket(businessPlan.marketAnalysis);
  const revenue = extractRevenue(businessPlan.financialProjections || '');
  const strengths = extractStrengths(businessPlan.swotAnalysis);
  const opportunities = extractOpportunities(businessPlan.swotAnalysis);
  
  // Extract validation data for the summary card
  const validationData = extractValidationData(
    businessPlan.financialProjections || businessPlan.marketAnalysis || businessPlan.swotAnalysis
  );
  
  return (
    <section className="mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-primary">{businessName}</span>
      </h2>
      
      {/* Overall Validation Score Summary */}
      <div className="mb-6">
        <ValidationSummaryCard 
          score={validationData.overallScore}
          positives={validationData.positives.slice(0, 2)}
          negatives={validationData.negatives.slice(0, 2)}
        />
      </div>
      
      {/* Top Strengths & Opportunities */}
      <InsightsGrid 
        strengths={strengths} 
        opportunities={opportunities} 
      />
      
      <Separator className="my-8" />
    </section>
  );
};

export default BusinessPlanDashboard;
