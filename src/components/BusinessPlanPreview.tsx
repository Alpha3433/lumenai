
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import ExecutiveSummarySection from './ExecutiveSummarySection';
import SwotAnalysis from './SwotAnalysis';
import MarketingPlanSection from './MarketingPlanSection';
import WebBusinessModelsSection from './WebBusinessModelsSection';
import BusinessPlanDashboard from './BusinessPlanDashboard';
import PestelAnalysisSection from './PestelAnalysisSection';
import PorterFiveForcesSection from './PorterFiveForcesSection';
import { 
  FileText, 
  PieChart, 
  CheckCircle, 
  Globe, 
  Scale, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from './ui/button';

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
  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'dashboard', title: 'Dashboard', icon: <PieChart className="h-4 w-4" /> },
    { id: 'swot-analysis', title: 'SWOT Analysis', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'pestel-analysis', title: 'PESTEL Analysis', icon: <Globe className="h-4 w-4" /> },
    { id: 'porter-five-forces', title: "Porter's Five Forces", icon: <Scale className="h-4 w-4" /> },
    { id: 'marketing-plan', title: 'Marketing Plan', icon: <Activity className="h-4 w-4" /> },
    { id: 'business-models', title: 'Business Models', icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <BusinessPlanActionBar 
        businessName={businessName}
        onStartOver={onStartOver}
        onDownload={onDownload}
      />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Business Plan Navigation */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md mb-8 sticky top-4 z-10">
          <div className="p-4">
            <h3 className="font-medium text-md mb-4 text-center">Business Plan</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {section.icon}
                  <span>{section.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="relative">
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
                <PestelAnalysisSection analysisText={businessPlan.marketAnalysis} />
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
