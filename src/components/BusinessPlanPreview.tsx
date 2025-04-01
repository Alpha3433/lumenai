
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketingPlanSection from './MarketingPlanSection';
import WebBusinessModelsSection from './WebBusinessModelsSection';
import BusinessPlanDashboard from './BusinessPlanDashboard';
import PestelAnalysisSection from './pestel/PestelAnalysisSection';
import PorterFiveForcesSection from './PorterFiveForcesSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
  isPremium?: boolean;
  onStartOver: () => void;
  onDownload: () => void;
  onUpgrade?: () => void;
  businessDescription?: string;
  onRefineBusinessInfo?: (name: string, description: string) => void;
}

const BusinessPlanPreview: React.FC<BusinessPlanPreviewProps> = ({
  businessName,
  businessPlan,
  isPremium = true,
  onStartOver,
  onDownload,
  onUpgrade,
  businessDescription = '',
  onRefineBusinessInfo
}) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [refinedName, setRefinedName] = useState(businessName);
  const [refinedDescription, setRefinedDescription] = useState(businessDescription);

  const handleSaveRefinements = () => {
    if (onRefineBusinessInfo) {
      onRefineBusinessInfo(refinedName, refinedDescription);
    }
    setIsEditingInfo(false);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <BusinessPlanActionBar 
        businessName={refinedName}
        onStartOver={onStartOver}
        onDownload={onDownload}
        onEdit={onRefineBusinessInfo ? () => setIsEditingInfo(true) : undefined}
      />
      
      {/* Edit Info Dialog */}
      {onRefineBusinessInfo && (
        <Dialog open={isEditingInfo} onOpenChange={setIsEditingInfo}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Refine Business Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium mb-1">Business Name</label>
                <Input 
                  id="businessName" 
                  value={refinedName} 
                  onChange={(e) => setRefinedName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="businessDescription" className="block text-sm font-medium mb-1">Business Description</label>
                <Textarea 
                  id="businessDescription" 
                  value={refinedDescription} 
                  onChange={(e) => setRefinedDescription(e.target.value)}
                  className="w-full min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditingInfo(false)}>Cancel</Button>
              <Button onClick={handleSaveRefinements}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
          <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Business Plan Dashboard */}
              <div id="dashboard">
                <BusinessPlanDashboard 
                  businessName={refinedName}
                  businessPlan={businessPlan}
                />
              </div>
              
              {/* Executive Summary */}
              <div id="executive-summary">
                <ExecutiveSummarySection 
                  summaryText={businessPlan.executiveSummary} 
                  businessName={refinedName}
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
                  businessName={refinedName}
                  businessDescription={refinedDescription}
                />
              </div>
              
              <Separator className="my-10" />
              
              {/* Porter's Five Forces Analysis */}
              <div id="porter-five-forces">
                <PorterFiveForcesSection 
                  marketAnalysis={businessPlan.marketAnalysis}
                  businessName={refinedName}
                  businessDescription={refinedDescription}
                />
              </div>
              
              <Separator className="my-10" />
              
              {/* Marketing Plan */}
              <div id="marketing-plan">
                <MarketingPlanSection 
                  marketingPlanText={businessPlan.marketingPlan}
                  businessName={refinedName}
                  businessDescription={refinedDescription}
                />
              </div>
              
              <Separator className="my-10" />
              
              {/* Web Business Models */}
              <div id="business-models">
                <WebBusinessModelsSection 
                  businessName={refinedName}
                  businessDescription={refinedDescription}
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
