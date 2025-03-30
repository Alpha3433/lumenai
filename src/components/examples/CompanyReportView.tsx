
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BusinessPlanActionBar from '@/components/BusinessPlanActionBar';
import ExecutiveSummarySection from '@/components/ExecutiveSummarySection';
import SwotAnalysis from '@/components/SwotAnalysis';
import PestelAnalysisSection from '@/components/pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '@/components/PorterFiveForcesSection';
import MarketingPlanSection from '@/components/MarketingPlanSection';
import WebBusinessModelsSection from '@/components/WebBusinessModelsSection';
import BusinessPlanDashboard from '@/components/BusinessPlanDashboard';
import { BusinessPlanData } from '@/types/businessPlan';

interface CompanyData {
  id: string;
  name: string;
  description: string;
  industry: string;
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface CompanyReportViewProps {
  company: CompanyData;
  onBackToList: () => void;
  onDownload: () => void;
}

const CompanyReportView: React.FC<CompanyReportViewProps> = ({
  company,
  onBackToList,
  onDownload
}) => {
  // Prepare business plan data in the format expected by components
  const businessPlan: BusinessPlanData = {
    executiveSummary: company.executiveSummary,
    marketAnalysis: company.marketAnalysis,
    businessModel: company.businessModel,
    marketingPlan: company.marketingPlan,
    financialProjections: company.financialProjections,
    riskAssessment: company.riskAssessment,
    swotAnalysis: company.swotAnalysis
  };

  return (
    <div className="container mx-auto max-w-full py-8 px-4 mt-16">
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={onBackToList}
        >
          ← Back to Examples
        </Button>
      </div>

      <div className="space-y-10 animate-fade-in pb-20">
        <BusinessPlanActionBar 
          businessName={company.name}
          onStartOver={onBackToList}
          onDownload={onDownload}
        />
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
            <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Business Plan Dashboard */}
                <div id="dashboard">
                  <BusinessPlanDashboard 
                    businessName={company.name}
                    businessPlan={businessPlan}
                  />
                </div>
                
                {/* Executive Summary */}
                <div id="executive-summary">
                  <ExecutiveSummarySection 
                    summaryText={businessPlan.executiveSummary} 
                    businessName={company.name}
                    marketAnalysis={businessPlan.marketAnalysis}
                  />
                </div>
                
                <Separator className="my-10" />
                
                {/* SWOT Analysis */}
                <div id="swot-analysis">
                  <SwotAnalysis 
                    swotText={businessPlan.swotAnalysis} 
                    marketAnalysis={businessPlan.marketAnalysis}
                  />
                </div>
                
                <Separator className="my-10" />
                
                {/* PESTEL Analysis */}
                <div id="pestel-analysis">
                  <PestelAnalysisSection 
                    analysisText={businessPlan.marketAnalysis}
                    businessName={company.name}
                    businessDescription={company.description}
                  />
                </div>
                
                <Separator className="my-10" />
                
                {/* Porter's Five Forces Analysis */}
                <div id="porter-five-forces">
                  <PorterFiveForcesSection 
                    marketAnalysis={businessPlan.marketAnalysis}
                    businessName={company.name}
                    businessDescription={company.description}
                  />
                </div>
                
                <Separator className="my-10" />
                
                {/* Marketing Plan */}
                <div id="marketing-plan">
                  <MarketingPlanSection 
                    marketingPlanText={businessPlan.marketingPlan}
                    businessName={company.name}
                    businessDescription={company.description}
                  />
                </div>
                
                <Separator className="my-10" />
                
                {/* Web Business Models */}
                <div id="business-models">
                  <WebBusinessModelsSection 
                    businessName={company.name}
                    businessDescription={company.description}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReportView;
