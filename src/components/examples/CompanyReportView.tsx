
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Fixed import
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Zap, Apple, ShoppingCart, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import BusinessPlanActionBar from '@/components/BusinessPlanActionBar';
import ExecutiveSummarySection from '@/components/ExecutiveSummarySection';
import SwotAnalysis from '@/components/SwotAnalysis';
import PestelAnalysisSection from '@/components/pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '@/components/PorterFiveForcesSection';
import MarketingPlanSection from '@/components/MarketingPlanSection';
import WebBusinessModelsSection from '@/components/WebBusinessModelsSection';
import BusinessPlanDashboard from '@/components/BusinessPlanDashboard';
import { BusinessPlanData } from '@/types/businessPlan';

interface CompanyData {
  id: string;
  name: string;
  description: string;
  industry: string;
  logoIcon: string; // Changed to match ExampleCard interface
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface CompanyReportViewProps {
  company: CompanyData;
  onBackToList: () => void;
  onDownload: () => void;
}

const CompanyReportView: React.FC<CompanyReportViewProps> = ({
  company,
  onBackToList,
  onDownload
}) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [refinedName, setRefinedName] = useState(company.name);
  const [refinedDescription, setRefinedDescription] = useState(company.description);
  
  // Prepare business plan data in the format expected by components
  const businessPlan: BusinessPlanData = {
    executiveSummary: company.executiveSummary,
    marketAnalysis: company.marketAnalysis,
    businessModel: company.businessModel,
    marketingPlan: company.marketingPlan,
    financialProjections: company.financialProjections,
    riskAssessment: company.riskAssessment,
    swotAnalysis: company.swotAnalysis
  };

  // Get the appropriate logo based on the company
  const getCompanyLogo = () => {
    switch(company.logoIcon) {
      case 'Zap':
        return <Zap className="h-16 w-16 text-blue-500" />;
      case 'Apple':
        return <Apple className="h-16 w-16 text-gray-800" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-16 w-16 text-orange-500" />;
      default:
        return null;
    }
  };
  
  const handleSaveRefinements = () => {
    setIsEditingInfo(false);
    toast({
      title: "Information Updated",
      description: "Your business information has been refined for display purposes.",
    });
  };

  return (
    <motion.div 
      className="container mx-auto max-w-full py-8 px-4 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 sticky top-20 z-10 bg-background/80 backdrop-blur-sm py-2">
        <Button 
          variant="outline" 
          className="mb-2" 
          onClick={onBackToList}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Examples
        </Button>
      </div>

      <div className="space-y-10 animate-fade-in pb-20">
        {/* Company Header with Logo */}
        <motion.div 
          className="max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center mr-6">
                {getCompanyLogo()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{refinedName}</h1>
                <p className="text-gray-600 dark:text-gray-300">{company.industry}</p>
              </div>
            </div>
            <Button 
              onClick={onDownload}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </motion.div>

        <BusinessPlanActionBar 
          businessName={refinedName}
          onStartOver={onBackToList}
          onDownload={onDownload}
        />
        
        {/* Business Info Editing Section */}
        <div className="max-w-6xl mx-auto px-4">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-card/95 overflow-hidden">
            <CardContent className="p-5">
              {isEditingInfo ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Refine Company Information</h3>
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium mb-1">Company Name</label>
                    <Input 
                      id="businessName" 
                      value={refinedName} 
                      onChange={(e) => setRefinedName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessDescription" className="block text-sm font-medium mb-1">Company Description</label>
                    <Textarea 
                      id="businessDescription" 
                      value={refinedDescription} 
                      onChange={(e) => setRefinedDescription(e.target.value)}
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsEditingInfo(false)}>Cancel</Button>
                    <Button onClick={handleSaveRefinements}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{refinedName}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{refinedDescription}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1" 
                    onClick={() => setIsEditingInfo(true)}
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-6xl mx-auto px-4">
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
    </motion.div>
  );
};

export default CompanyReportView;
