
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
    { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="h-5 w-5" /> },
    { id: 'dashboard', title: 'Summary', icon: <PieChart className="h-5 w-5" /> },
    { id: 'swot-analysis', title: 'SWOT Analysis', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'pestel-analysis', title: 'PESTEL Analysis', icon: <Globe className="h-5 w-5" /> },
    { id: 'porter-five-forces', title: "Porter's Five Forces", icon: <Scale className="h-5 w-5" /> },
    { id: 'marketing-plan', title: 'Marketing Plan', icon: <Activity className="h-5 w-5" /> },
    { id: 'business-models', title: 'Business Models', icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <BusinessPlanActionBar 
        businessName={businessName}
        onStartOver={onStartOver}
        onDownload={onDownload}
      />
      
      <div className="max-w-6xl mx-auto px-4">
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

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 border-t border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 overflow-x-auto custom-scrollbar">
            <div className="flex space-x-1 md:space-x-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex flex-col items-center justify-center px-3 py-2 text-xs md:text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-1.5 mb-1">
                    {section.icon}
                  </div>
                  <span className="whitespace-nowrap">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
