
import React, { useState, useEffect } from 'react';
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
import VerticalTabs from './VerticalTabs';

// Import remaining section components
import CustomerPersonasSection from './personas/CustomerPersonasSection';
import CompetitiveFeatureMatrix from './competitive/CompetitiveFeatureMatrix';
import GoToMarketStrategy from './strategy/GoToMarketStrategy';
import MonetizationExperiments from './monetization/MonetizationExperiments';
import UserRetentionStrategy from './retention/UserRetentionStrategy';
import TechnologyRoadmap from './roadmap/TechnologyRoadmap';
import RegulatoryComplianceChecklist from './compliance/RegulatoryComplianceChecklist';
import PartnershipPipeline from './partnerships/PartnershipPipeline';
import RiskMitigationPlaybook from './risk/RiskMitigationPlaybook';

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
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSaveRefinements = () => {
    if (onRefineBusinessInfo) {
      onRefineBusinessInfo(refinedName, refinedDescription);
    }
    setIsEditingInfo(false);
  };

  // Set up scroll observation for auto-selecting tabs
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all section elements
    const sections = [
      'dashboard', 'executive-summary', 'customer-personas', 
      'swot-analysis', 'competitive-matrix', 'pestel-analysis', 
      'porter-five-forces', 'gtm-strategy', 'monetization',
      'marketing-plan', 'retention-strategy', 'business-models',
      'risk-mitigation'
    ];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

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
      
      <div className="max-w-[95%] xl:max-w-7xl mx-auto">
        {/* Main Content with Vertical Tabs */}
        <div className="relative flex rounded-xl overflow-hidden shadow-xl">
          {/* Side Navigation */}
          <div className="hidden md:block w-56 sticky top-24 h-[calc(100vh-120px)]">
            <VerticalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 bg-card/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-r-xl overflow-hidden">
            <div className="p-6 md:p-8">
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
              
              {/* Customer Personas Deep-Dive */}
              <div id="customer-personas">
                <CustomerPersonasSection 
                  businessName={refinedName}
                  businessDescription={refinedDescription}
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
              
              {/* Competitive Feature Matrix */}
              <div id="competitive-matrix">
                <CompetitiveFeatureMatrix 
                  businessName={refinedName}
                  businessDescription={refinedDescription}
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
              
              {/* Go-To-Market Strategy */}
              <div id="gtm-strategy">
                <GoToMarketStrategy 
                  businessName={refinedName}
                  businessDescription={refinedDescription}
                />
              </div>
              
              <Separator className="my-10" />
              
              {/* Monetization Experiments */}
              <div id="monetization">
                <MonetizationExperiments 
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
              
              {/* User Retention Strategy */}
              <div id="retention-strategy">
                <UserRetentionStrategy 
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
              
              <Separator className="my-10" />
              
              {/* Risk Mitigation Playbook */}
              <div id="risk-mitigation">
                <RiskMitigationPlaybook 
                  businessName={refinedName}
                  businessDescription={refinedDescription}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
