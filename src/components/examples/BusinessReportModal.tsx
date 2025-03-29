
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X, FileText, PieChart, CheckCircle, Globe, Activity, ShieldCheck } from 'lucide-react';
import SwotDisplay from './SwotDisplay';
import MarketAnalysisDisplay from './MarketAnalysisDisplay';
import ExecutiveSummaryDisplay from './ExecutiveSummaryDisplay';
import FinancialDisplay from './FinancialDisplay';
import BusinessModelDisplay from './BusinessModelDisplay';

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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={company.logoUrl} 
                    alt={company.name} 
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">{company.name} Business Report</DialogTitle>
                  <DialogDescription className="text-sm">AI-generated analysis based on mock data</DialogDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="executive-summary" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="executive-summary" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:inline">Executive Summary</span>
                  <span className="md:hidden">Summary</span>
                </TabsTrigger>
                <TabsTrigger value="swot" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>SWOT</span>
                </TabsTrigger>
                <TabsTrigger value="market" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Market</span>
                </TabsTrigger>
                <TabsTrigger value="financials" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Financials</span>
                </TabsTrigger>
                <TabsTrigger value="business-model" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Business Model</span>
                </TabsTrigger>
              </TabsList>
              
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <TabsContent value="executive-summary" className="mt-0">
                    <ExecutiveSummaryDisplay company={company} />
                  </TabsContent>
                  
                  <TabsContent value="swot" className="mt-0">
                    <SwotDisplay company={company} />
                  </TabsContent>
                  
                  <TabsContent value="market" className="mt-0">
                    <MarketAnalysisDisplay company={company} />
                  </TabsContent>
                  
                  <TabsContent value="financials" className="mt-0">
                    <FinancialDisplay company={company} />
                  </TabsContent>
                  
                  <TabsContent value="business-model" className="mt-0">
                    <BusinessModelDisplay company={company} />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
          
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">This is a mock report for demonstration purposes</span>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessReportModal;
