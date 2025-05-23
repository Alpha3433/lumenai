import React from 'react';
import { Separator } from "@/components/ui/separator";
import InsightsGrid from './dashboard/InsightsGrid';
import ValidationSummaryCard from './dashboard/ValidationSummaryCard';
import { extractTargetMarket, extractRevenue, extractStrengths, extractOpportunities, extractCompetitors } from '@/components/dashboard/DashboardUtils';
import { extractValidationData } from '@/utils/businessValidation';
import { useEffect, useState } from 'react';
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
  const [validationData, setValidationData] = useState(() => extractValidationData([businessPlan.executiveSummary, businessPlan.marketAnalysis, businessPlan.businessModel, businessPlan.swotAnalysis, businessPlan.financialProjections, businessPlan.riskAssessment].filter(Boolean).join('\n')));
  useEffect(() => {
    const newValidationData = extractValidationData([businessPlan.executiveSummary, businessPlan.marketAnalysis, businessPlan.businessModel, businessPlan.swotAnalysis, businessPlan.financialProjections, businessPlan.riskAssessment].filter(Boolean).join('\n'));
    setValidationData(newValidationData);
  }, [businessPlan]);
  const targetMarket = extractTargetMarket(businessPlan.marketAnalysis);
  const revenue = extractRevenue(businessPlan.financialProjections || '');
  const strengths = extractStrengths(businessPlan.swotAnalysis);
  const opportunities = extractOpportunities(businessPlan.swotAnalysis);
  const competitors = extractCompetitors(businessPlan.marketAnalysis);
  return <section className="mb-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-slate-950">
        Business Validation Score
      </h2>
      
      <div className="mb-8">
        <ValidationSummaryCard score={validationData.overallScore} positives={validationData.positives.slice(0, 2)} negatives={validationData.negatives.slice(0, 2)} businessName={businessName} marketAnalysis={businessPlan.marketAnalysis} />
      </div>
      
      <InsightsGrid strengths={strengths} opportunities={opportunities} />
      
      <Separator className="my-10" />
    </section>;
};
export default BusinessPlanDashboard;