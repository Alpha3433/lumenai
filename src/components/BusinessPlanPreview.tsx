
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketAnalysisSection from './MarketAnalysisSection';
import BusinessModelSection from './BusinessModelSection';
import MarketingPlanSection from './MarketingPlanSection';
import RiskAssessmentSection from './RiskAssessmentSection';

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
}

const BusinessPlanPreview: React.FC<BusinessPlanPreviewProps> = ({
  businessName,
  businessPlan,
  isPremium,
  onStartOver,
  onDownload,
  onUpgrade
}) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <BusinessPlanActionBar 
        businessName={businessName}
        onStartOver={onStartOver}
        onDownload={onDownload}
      />
      
      <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-8">
          {/* Executive Summary */}
          <ExecutiveSummarySection summaryText={businessPlan.executiveSummary} />
          
          <Separator className="my-10" />
          
          {/* SWOT Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-purple-500" />
              SWOT Analysis
            </h2>
            <SwotAnalysis swotText={businessPlan.swotAnalysis} />
          </section>
          
          <Separator className="my-10" />
          
          {/* Market Analysis */}
          <MarketAnalysisSection analysisText={businessPlan.marketAnalysis} />
          
          <Separator className="my-10" />
          
          {/* Business Model */}
          <BusinessModelSection businessModelText={businessPlan.businessModel} />
          
          {/* Marketing Plan */}
          <MarketingPlanSection 
            marketingPlanText={businessPlan.marketingPlan} 
            isPremium={isPremium}
            onUpgrade={onUpgrade}
          />
          
          {/* Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <RiskAssessmentSection riskAssessmentText={businessPlan.riskAssessment} />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
          <CheckCircle className="h-4 w-4" /> 
          Your business plan is ready
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
