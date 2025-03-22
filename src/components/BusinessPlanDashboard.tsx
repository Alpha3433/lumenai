
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PieChart, Activity, Users, DollarSign, Lightbulb, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface BusinessPlanDashboardProps {
  businessName: string;
  businessPlan: {
    executiveSummary: string;
    marketAnalysis: string;
    businessModel: string;
    swotAnalysis: string;
    financialProjections?: string; // Added as optional property
  };
}

const BusinessPlanDashboard: React.FC<BusinessPlanDashboardProps> = ({ 
  businessName, 
  businessPlan 
}) => {
  // Extract key metrics and insights from the business plan
  const targetMarket = extractTargetMarket(businessPlan.marketAnalysis);
  const revenue = extractRevenue(businessPlan.financialProjections || ''); // Add fallback for undefined
  const strengths = extractStrengths(businessPlan.swotAnalysis);
  const opportunities = extractOpportunities(businessPlan.swotAnalysis);
  
  return (
    <section className="mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Business Plan Dashboard: <span className="text-primary">{businessName}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Key Market Stats */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-muted-foreground">Market Insights</h3>
              <PieChart className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-3">
              <p className="text-base font-medium">{targetMarket?.demographic || "Diverse Consumer Base"}</p>
              <p className="text-sm text-muted-foreground mt-1">{targetMarket?.size || "Market analysis pending"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projection */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-muted-foreground">Revenue Projection</h3>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="mt-3">
              <p className="text-base font-medium">{revenue?.year1 || "Projected Growth"}</p>
              <p className="text-sm text-muted-foreground mt-1">Year 1 Estimate</p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Focus */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-muted-foreground">Target Audience</h3>
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-3">
              <p className="text-base font-medium">{targetMarket?.audience || "Multi-segment Approach"}</p>
              <p className="text-sm text-muted-foreground mt-1">{targetMarket?.growth || "Growth analysis pending"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Strengths & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold">Key Strengths</h3>
            </div>
            <div className="space-y-2">
              {strengths.length > 0 ? (
                strengths.slice(0, 2).map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                      S{index + 1}
                    </Badge>
                    <p className="text-sm">{strength}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Strengths analysis pending</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h3 className="text-sm font-semibold">Key Opportunities</h3>
            </div>
            <div className="space-y-2">
              {opportunities.length > 0 ? (
                opportunities.slice(0, 2).map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                      O{index + 1}
                    </Badge>
                    <p className="text-sm">{opportunity}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Opportunities analysis pending</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-8" />
    </section>
  );
};

// Helper functions to extract data from the business plan
function extractTargetMarket(marketAnalysis: string | undefined): { demographic: string; size: string; audience: string; growth: string } | null {
  if (!marketAnalysis) return null;
  
  // Extract market size using regex - looking for dollar amounts
  const sizeMatch = marketAnalysis.match(/\$\d+(\.\d+)?\s*(billion|million|trillion)/i);
  const demographicMatch = marketAnalysis.match(/age[s]?\s+(\d+)[-–](\d+)/i);
  const growthMatch = marketAnalysis.match(/(\d+(\.\d+)?%\s+(growth|increase))/i);
  
  return {
    demographic: demographicMatch ? `Ages ${demographicMatch[1]}-${demographicMatch[2]}` : "Diverse Demographics",
    size: sizeMatch ? sizeMatch[0] : "Market Sizing Pending",
    audience: extractAudienceFromText(marketAnalysis),
    growth: growthMatch ? growthMatch[0] : "Growth Analysis Pending"
  };
}

function extractAudienceFromText(text: string): string {
  // Look for specific demographic/audience descriptions
  if (text.includes("millennials")) return "Millennials & Young Professionals";
  if (text.includes("Gen Z")) return "Gen Z Consumers";
  if (text.includes("professionals")) return "Working Professionals";
  if (text.includes("small business")) return "Small Business Owners";
  if (text.includes("enterprise")) return "Enterprise Organizations";
  
  return "Diverse Customer Segments";
}

function extractRevenue(financialText: string | undefined): { year1: string; year3: string } | null {
  if (!financialText) return null;
  
  // Look for Year 1 revenue projections
  const year1Match = financialText?.match(/Year 1.*?\$(\d+[,\d]*(\.\d+)?)/i);
  const year3Match = financialText?.match(/Year 3.*?\$(\d+[,\d]*(\.\d+)?)/i);
  
  return {
    year1: year1Match ? `$${year1Match[1]}` : "Revenue Projections Pending",
    year3: year3Match ? `$${year3Match[1]}` : "3-Year Projection Pending"
  };
}

function extractStrengths(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract strengths section
  const strengthsSection = swotAnalysis.match(/\*\*Strengths\*\*\s*([\s\S]*?)(?=\*\*Weaknesses\*\*)/i);
  
  if (strengthsSection) {
    // Extract bullet points
    const bulletPoints = strengthsSection[1].match(/•\s*([^\n•]+)/g);
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/•\s*/, '').trim());
    }
  }
  
  return [];
}

function extractOpportunities(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract opportunities section
  const opportunitiesSection = swotAnalysis.match(/\*\*Opportunities\*\*\s*([\s\S]*?)(?=\*\*Threats\*\*)/i);
  
  if (opportunitiesSection) {
    // Extract bullet points
    const bulletPoints = opportunitiesSection[1].match(/•\s*([^\n•]+)/g);
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/•\s*/, '').trim());
    }
  }
  
  return [];
}

export default BusinessPlanDashboard;
