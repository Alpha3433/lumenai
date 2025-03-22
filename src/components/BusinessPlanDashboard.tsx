
import React from 'react';
import { Separator } from "@/components/ui/separator";
import DashboardGrid from './dashboard/DashboardGrid';
import InsightsGrid from './dashboard/InsightsGrid';
import { 
  extractTargetMarket, 
  extractRevenue, 
  extractStrengths, 
  extractOpportunities 
} from './dashboard/DashboardUtils';

interface BusinessPlanDashboardProps {
  businessName: string;
  businessPlan: {
    executiveSummary: string;
    marketAnalysis: string;
    businessModel: string;
    swotAnalysis: string;
    financialProjections?: string; 
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
  
  return (
    <section className="mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Business Plan Dashboard: <span className="text-primary">{businessName}</span>
      </h2>
      
      <DashboardGrid 
        targetMarket={targetMarket} 
        revenue={revenue} 
      />

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
