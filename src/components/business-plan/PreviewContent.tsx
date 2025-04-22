
import React from 'react';
import { Separator } from "@/components/ui/separator";
import ExecutiveSummarySection from '../ExecutiveSummarySection';
import CustomerPersonasSection from '../personas/CustomerPersonasSection';
import SwotAnalysis from '../SwotAnalysis';
import CompetitiveFeatureMatrix from '../competitive/CompetitiveFeatureMatrix';
import PestelAnalysisSection from '../pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '../PorterFiveForcesSection';
import GoToMarketStrategy from '../strategy/GoToMarketStrategy';
import MonetizationExperiments from '../monetization/MonetizationExperiments';
import UserRetentionStrategy from '../retention/UserRetentionStrategy';
import WebBusinessModelsSection from '../WebBusinessModelsSection';
import RiskMitigationPlaybook from '../risk/RiskMitigationPlaybook';
import BusinessPlanDashboard from '../BusinessPlanDashboard';

interface PreviewContentProps {
  businessName: string;
  businessDescription: string;
  businessPlan: {
    executiveSummary: string;
    marketAnalysis: string;
    businessModel: string;
    swotAnalysis: string;
    financialProjections?: string;
    riskAssessment?: string;
  };
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  businessName,
  businessDescription,
  businessPlan
}) => {
  return (
    <div className="p-6 md:p-8">
      <div id="dashboard" className="pt-4">
        <BusinessPlanDashboard 
          businessName={businessName}
          businessPlan={businessPlan}
        />
      </div>
      
      <div id="executive-summary" className="pt-16 mt-8">
        <ExecutiveSummarySection 
          summaryText={businessPlan.executiveSummary} 
          businessName={businessName}
          marketAnalysis={businessPlan.marketAnalysis}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="customer-personas" className="pt-16 mt-8">
        <CustomerPersonasSection 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="swot-analysis" className="pt-16 mt-8">
        <SwotAnalysis 
          swotText={businessPlan.swotAnalysis} 
          marketAnalysis={businessPlan.marketAnalysis}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="competitive-matrix" className="pt-16 mt-8">
        <CompetitiveFeatureMatrix 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="pestel-analysis" className="pt-16 mt-8">
        <PestelAnalysisSection 
          analysisText={businessPlan.marketAnalysis}
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="porter-five-forces" className="pt-16 mt-8">
        <PorterFiveForcesSection 
          marketAnalysis={businessPlan.marketAnalysis}
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="gtm-strategy" className="pt-16 mt-8">
        <GoToMarketStrategy 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="monetization" className="pt-16 mt-8">
        <MonetizationExperiments 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="retention-strategy" className="pt-16 mt-8">
        <UserRetentionStrategy 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="business-models" className="pt-16 mt-8">
        <WebBusinessModelsSection 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
      
      <Separator className="my-10" />
      
      <div id="risk-mitigation" className="pt-16 mt-8">
        <RiskMitigationPlaybook 
          businessName={businessName}
          businessDescription={businessDescription}
        />
      </div>
    </div>
  );
};

export default PreviewContent;
