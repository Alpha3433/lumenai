
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
    { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'dashboard', title: 'Summary', icon: <PieChart className="h-4 w-4" /> },
    { id: 'swot-analysis', title: 'SWOT', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'pestel-analysis', title: 'PESTEL', icon: <Globe className="h-4 w-4" /> },
    { id: 'porter-five-forces', title: "Porter's", icon: <Scale className="h-4 w-4" /> },
    { id: 'marketing-plan', title: 'Marketing', icon: <Activity className="h-4 w-4" /> },
    { id: 'business-models', title: 'Models', icon: <ShieldCheck className="h-4 w-4" /> },
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
                <PorterFiveForcesSection 
                  marketAnalysis={businessPlan.marketAnalysis}
                  businessName={businessName}
                  businessDescription={businessDescription}
                />
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

      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-xl border border-gray-200/50 dark:border-gray-800/50 flex items-center gap-1 py-1 px-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex flex-col items-center justify-center px-3 py-2 rounded-full transition-all hover:bg-gray-100/70 dark:hover:bg-gray-800/50"
              >
                <div className="bg-primary/5 dark:bg-primary/10 rounded-full p-2 mb-1 text-primary">
                  {section.icon}
                </div>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
