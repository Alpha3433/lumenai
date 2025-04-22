
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExampleCompany } from '@/data/exampleCompanies';
import BusinessPlanActionBar from '@/components/BusinessPlanActionBar';
import ExecutiveSummarySection from '@/components/ExecutiveSummarySection';
import SwotAnalysis from '@/components/SwotAnalysis';
import PestelAnalysisSection from '@/components/pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '@/components/PorterFiveForcesSection';
import WebBusinessModelsSection from '@/components/WebBusinessModelsSection';
import BusinessPlanDashboard from '@/components/BusinessPlanDashboard';
import { BusinessPlanData } from '@/types/businessPlan';
import MonetizationExperiments from '@/components/monetization/MonetizationExperiments';

interface CompanyModalProps {
  company: ExampleCompany | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  company,
  isOpen,
  onClose,
  onDownload
}) => {
  if (!company) return null;
  
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span>{company.name}</span>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {company.industry}
            </span>
          </DialogTitle>
          <DialogDescription>{company.description}</DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
          <Button 
            onClick={onDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </div>
        
        <BusinessPlanActionBar 
          businessName={company.name}
          onStartOver={onClose}
          onDownload={onDownload}
        />
        
        <div className="relative my-6">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
          <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div id="dashboard">
                <BusinessPlanDashboard 
                  businessName={company.name}
                  businessPlan={businessPlan}
                />
              </div>
              
              <div id="executive-summary">
                <ExecutiveSummarySection 
                  summaryText={businessPlan.executiveSummary} 
                  businessName={company.name}
                  marketAnalysis={businessPlan.marketAnalysis}
                />
              </div>
              
              <Separator className="my-10" />
              
              <div id="swot-analysis">
                <SwotAnalysis 
                  swotText={businessPlan.swotAnalysis} 
                  marketAnalysis={businessPlan.marketAnalysis}
                />
              </div>
              
              <Separator className="my-10" />
              
              <div id="pestel-analysis">
                <PestelAnalysisSection 
                  analysisText={businessPlan.marketAnalysis}
                  businessName={company.name}
                  businessDescription={company.description}
                />
              </div>
              
              <Separator className="my-10" />
              
              <div id="porter-five-forces">
                <PorterFiveForcesSection 
                  marketAnalysis={businessPlan.marketAnalysis}
                  businessName={company.name}
                  businessDescription={company.description}
                />
              </div>
              
              <Separator className="my-10" />
              
              <div id="monetization">
                <MonetizationExperiments 
                  businessName={company.name}
                  businessDescription={company.description}
                />
              </div>
              
              <Separator className="my-10" />
              
              <div id="business-models">
                <WebBusinessModelsSection 
                  businessName={company.name}
                  businessDescription={company.description}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;
