
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { ArrowDownToLine, Sparkles } from 'lucide-react';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketingPlanSection from './MarketingPlanSection';
import BusinessPlanDashboard from './BusinessPlanDashboard';
import PestelAnalysisSection from './PestelAnalysisSection';
import PorterFiveForcesSection from './porter/PorterFiveForcesSection';
import { Button } from "./ui/button";
import { cn } from '@/lib/utils';

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
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Business Plan Dashboard */}
            <BusinessPlanDashboard 
              businessName={businessName}
              businessPlan={businessPlan}
            />
            
            {/* Executive Summary */}
            <ExecutiveSummarySection 
              summaryText={businessPlan.executiveSummary} 
              businessName={businessName}
              marketAnalysis={businessPlan.marketAnalysis}
            />
            
            <Separator className="my-10" />
            
            {/* SWOT Analysis - Removing the title as it's now in the SwotAnalysis component */}
            <SwotAnalysis 
              swotText={businessPlan.swotAnalysis} 
              marketAnalysis={businessPlan.marketAnalysis}
            />
            
            <Separator className="my-10" />
            
            {/* PESTEL Analysis */}
            <PestelAnalysisSection analysisText={businessPlan.marketAnalysis} />
            
            <Separator className="my-10" />
            
            {/* Porter's Five Forces Analysis */}
            <PorterFiveForcesSection marketAnalysis={businessPlan.marketAnalysis} />
            
            <Separator className="my-10" />
            
            {/* Marketing Plan */}
            <MarketingPlanSection 
              marketingPlanText={businessPlan.marketingPlan} 
              isPremium={isPremium}
              onUpgrade={onUpgrade}
            />
            
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={onDownload} 
          className="flex items-center gap-2 bg-primary/90 hover:bg-primary"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
