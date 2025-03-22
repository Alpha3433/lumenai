
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ArrowDownToLine, Sparkles } from 'lucide-react';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketAnalysisSection from './MarketAnalysisSection';
import BusinessModelSection from './BusinessModelSection';
import MarketingPlanSection from './MarketingPlanSection';
import BusinessPlanDashboard from './BusinessPlanDashboard';
import { Button } from "./ui/button";
import BusinessValidationScore from './BusinessValidationScore';
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
            <ExecutiveSummarySection summaryText={businessPlan.executiveSummary} />
            
            <Separator className="my-10" />
            
            {/* Business Validation Score - Replacing Financial Table */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-emerald-500" />
                Business Validation
              </h2>
              
              <Card className={cn(
                "border border-gray-200 dark:border-gray-800 shadow-sm",
                "bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/30 dark:to-transparent"
              )}>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none text-sm mb-6">
                    <p className="leading-relaxed">{businessPlan.financialProjections}</p>
                  </div>
                  
                  <BusinessValidationScore businessText={businessPlan.financialProjections} />
                </CardContent>
              </Card>
            </section>
            
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
            
            <Separator className="my-10" />
            
            {/* Marketing Plan */}
            <MarketingPlanSection 
              marketingPlanText={businessPlan.marketingPlan} 
              isPremium={isPremium}
              onUpgrade={onUpgrade}
            />
            
            {/* Removed Risk Assessment Section */}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
          <CheckCircle className="h-4 w-4" /> 
          Your business plan is ready
        </div>
        
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
