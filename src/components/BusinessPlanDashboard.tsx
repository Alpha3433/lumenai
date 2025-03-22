
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Gauge, Target } from 'lucide-react';
import DashboardGrid from './dashboard/DashboardGrid';
import KeyInsightCard from './dashboard/KeyInsightCard';
import MarketInsightCard from './dashboard/MarketInsightCard';
import TargetAudienceCard from './dashboard/TargetAudienceCard';
import CompetitorsCard from './dashboard/CompetitorsCard';
import FinancialOutlookCard from './dashboard/FinancialOutlookCard';
import InsightsGrid from './dashboard/InsightsGrid';
import { 
  extractStrengths, 
  extractOpportunities,
  extractTargetMarket,
  extractRevenue
} from './dashboard/DashboardUtils';
import { extractCompetitorsFromValidation } from '@/utils/businessValidation';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface BusinessPlanDashboardProps {
  businessName: string;
  businessPlan: BusinessPlanData;
}

const BusinessPlanDashboard: React.FC<BusinessPlanDashboardProps> = ({ 
  businessName, 
  businessPlan 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [competitors, setCompetitors] = useState([]);
  
  useEffect(() => {
    // Extract competitors from the financialProjections (Business Validation) section
    if (businessPlan.financialProjections) {
      const extractedCompetitors = extractCompetitorsFromValidation(businessPlan.financialProjections);
      setCompetitors(extractedCompetitors);
    }
  }, [businessPlan.financialProjections]);
  
  const targetMarket = extractTargetMarket(businessPlan.marketAnalysis);
  const strengths = extractStrengths(businessPlan.swotAnalysis);
  const opportunities = extractOpportunities(businessPlan.swotAnalysis);
  const revenueData = extractRevenue(businessPlan.financialProjections);
  
  return (
    <section className="mb-12 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">{businessName}</h2>
      <p className="text-muted-foreground mb-6 text-center sm:text-left">Business Plan Dashboard</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <PieChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-1.5">
            <Target className="h-4 w-4" /> Market
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-1.5">
            <BarChart className="h-4 w-4" /> Financial
          </TabsTrigger>
          <TabsTrigger value="strategic" className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" /> Strategic
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardGrid>
            <KeyInsightCard 
              title="Key Strength"
              value={strengths?.[0] || "Strong market position"}
              icon="TrendingUp"
              color="text-green-500"
              className="md:col-span-2"
            />
            <KeyInsightCard 
              title="Key Opportunity"
              value={opportunities?.[0] || "Expand to new markets"}
              icon="Zap"
              color="text-amber-500"
              className="md:col-span-2"
            />
            <MarketInsightCard 
              demographic={targetMarket?.demographic}
              size={targetMarket?.size}
              className="col-span-1 md:col-span-2"
            />
            <FinancialOutlookCard 
              revenue={revenueData}
              className="col-span-1 md:col-span-2"
            />
          </DashboardGrid>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-6">
          <DashboardGrid>
            <TargetAudienceCard 
              audience={targetMarket?.audience}
              growth={targetMarket?.growth}
              className="col-span-1 md:col-span-3"
            />
            <KeyInsightCard 
              title="Market Size"
              value={targetMarket?.size || "Market Size Pending"}
              icon="Globe"
              color="text-blue-500"
            />
            <KeyInsightCard 
              title="Growth Rate"
              value={targetMarket?.growth || "Growth Rate Pending"}
              icon="TrendingUp"
              color="text-green-500"
            />
            <CompetitorsCard competitors={competitors} />
          </DashboardGrid>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-6">
          <DashboardGrid>
            <KeyInsightCard 
              title="Year 1 Revenue"
              value={revenueData?.year1 || "Revenue Projections Pending"}
              icon="DollarSign"
              color="text-green-500"
              className="md:col-span-2"
            />
            <KeyInsightCard 
              title="Year 3 Projection"
              value={revenueData?.year3 || "3-Year Projection Pending"}
              icon="TrendingUp"
              color="text-blue-500"
              className="md:col-span-2"
            />
            <InsightsGrid 
              strengths={strengths || []} 
              opportunities={opportunities || []} 
              className="col-span-1 md:col-span-4" 
            />
          </DashboardGrid>
        </TabsContent>
        
        <TabsContent value="strategic" className="space-y-6">
          <DashboardGrid>
            <KeyInsightCard 
              title="Strength"
              value={strengths?.[0] || "Pending Analysis"}
              icon="Shield"
              color="text-green-500"
            />
            <KeyInsightCard 
              title="Opportunity"
              value={opportunities?.[0] || "Pending Analysis"}
              icon="Zap"
              color="text-amber-500"
            />
            <KeyInsightCard 
              title="Key Competitors"
              value={competitors.length > 0 ? `${competitors.length} identified` : "Analysis Pending"}
              icon="Users"
              color="text-red-500"
            />
            <KeyInsightCard 
              title="Growth Factors"
              value={opportunities?.[1] || "Pending Analysis"}
              icon="TrendingUp"
              color="text-blue-500"
            />
            <CompetitorsCard competitors={competitors} />
          </DashboardGrid>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default BusinessPlanDashboard;
