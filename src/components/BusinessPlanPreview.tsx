
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketingPlanSection from './MarketingPlanSection';
import WebBusinessModelsSection from './WebBusinessModelsSection';
import BusinessPlanDashboard from './BusinessPlanDashboard';
import PestelAnalysisSection from './pestel/PestelAnalysisSection';
import PorterFiveForcesSection from './PorterFiveForcesSection';
import ReportSidePanel from './business-plan/ReportSidePanel';
import { usePestelData } from '@/hooks/usePestelData';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface BusinessPlanPreviewProps {
  businessName: string;
  businessPlan: BusinessPlanData;
  isPremium: boolean;
  onStartOver: () => void;
  onDownload: () => void;
  onUpgrade: () => void;
  businessDescription?: string;
}

const BusinessPlanPreview: React.FC<BusinessPlanPreviewProps> = ({
  businessName,
  businessPlan,
  isPremium,
  onStartOver,
  onDownload,
  onUpgrade,
  businessDescription = ''
}) => {
  // Extract PESTEL data
  const pestelData = usePestelData(businessPlan.marketAnalysis);
  
  return (
    <div className="space-y-10 animate-fade-in">
      <BusinessPlanActionBar 
        businessName={businessName}
        onStartOver={onStartOver}
        onDownload={onDownload}
      />
      
      <div className="flex">
        {/* Side Panel */}
        <ReportSidePanel />
        
        {/* Main Content */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
          <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Business Plan Dashboard */}
              <div id="dashboard">
                <BusinessPlanDashboard 
                  businessName={businessName}
                  businessPlan={businessPlan}
                />
              </div>
              
              {/* Executive Summary */}
              <div id="executive-summary">
                <ExecutiveSummarySection 
                  summaryText={businessPlan.executiveSummary} 
                  businessName={businessName}
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
                <PestelAnalysisSection pestelData={pestelData} />
              </div>
              
              <Separator className="my-10" />
              
              {/* Porter's Five Forces Analysis */}
              <div id="porter-five-forces">
                <PorterFiveForcesSection marketAnalysis={businessPlan.marketAnalysis} />
              </div>
              
              <Separator className="my-10" />
              
              {/* Marketing Plan */}
              <div id="marketing-plan">
                <MarketingPlanSection 
                  marketingPlanText={businessPlan.marketingPlan} 
                  isPremium={isPremium}
                  onUpgrade={onUpgrade}
                />
              </div>
              
              <Separator className="my-10" />
              
              {/* Web Business Models */}
              <div id="business-models">
                <WebBusinessModelsSection 
                  businessName={businessName}
                  businessDescription={businessDescription}
                  isPremium={isPremium}
                  onUpgrade={onUpgrade}
                />
              </div>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
