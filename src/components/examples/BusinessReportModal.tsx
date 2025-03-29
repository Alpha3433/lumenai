
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText, PieChart, CheckCircle, Globe, Scale, Activity, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ExecutiveSummaryDisplay from './ExecutiveSummaryDisplay';
import SwotDisplay from './SwotDisplay';
import PestelAnalysisSection from '../pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '../porter/PorterFiveForcesSection';
import WebBusinessModelsSection from '../WebBusinessModelsSection';
import MarketingPlanSection from '../MarketingPlanSection';
import { extractPestelData } from '@/utils/pestel';
import { extractPorterFiveForcesData } from '@/utils/porter';

interface BusinessReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: any;
}

const BusinessReportModal: React.FC<BusinessReportModalProps> = ({ 
  isOpen, 
  onClose, 
  company 
}) => {
  if (!company) return null;
  
  // Generate company-specific analysis data
  const pestelData = extractPestelData(company.pestelAnalysis || '');
  const forcesData = extractPorterFiveForcesData(company.porterAnalysis || '');
  
  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'dashboard', title: 'Summary', icon: <PieChart className="h-4 w-4" /> },
    { id: 'swot-analysis', title: 'SWOT', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'pestel-analysis', title: 'PESTEL', icon: <Globe className="h-4 w-4" /> },
    { id: 'porter-five-forces', title: "Porter's", icon: <Scale className="h-4 w-4" /> },
    { id: 'business-models', title: "Models", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'marketing-plan', title: "Marketing", icon: <Activity className="h-4 w-4" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{company.name} Business Report</DialogTitle>
                <DialogDescription className="text-sm">AI-generated analysis based on public data</DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-10 p-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
                <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {/* Executive Summary */}
                    <div id="executive-summary">
                      <ExecutiveSummaryDisplay company={company} />
                    </div>
                    
                    <Separator className="my-10" />
                    
                    {/* SWOT Analysis */}
                    <div id="swot-analysis">
                      <SwotDisplay company={company} />
                    </div>
                    
                    <Separator className="my-10" />
                    
                    {/* PESTEL Analysis */}
                    <div id="pestel-analysis">
                      <PestelAnalysisSection pestelData={pestelData} />
                    </div>
                    
                    <Separator className="my-10" />
                    
                    {/* Porter's Five Forces Analysis */}
                    <div id="porter-five-forces">
                      <PorterFiveForcesSection forcesData={forcesData} />
                    </div>
                    
                    <Separator className="my-10" />
                    
                    {/* Web Business Models */}
                    <div id="business-models">
                      <WebBusinessModelsSection 
                        businessName={company.name}
                        businessDescription={company.shortDescription}
                        isPremium={true}
                        onUpgrade={() => {}}
                      />
                    </div>
                    
                    <Separator className="my-10" />
                    
                    {/* Marketing Plan */}
                    <div id="marketing-plan">
                      <MarketingPlanSection 
                        marketingPlanText={company.marketingPlan || ''}
                        isPremium={true}
                        onUpgrade={() => {}}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Bottom Navigator */}
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
      </DialogContent>
    </Dialog>
  );
};

export default BusinessReportModal;
