
import React from 'react';
import { Activity, Building, UsersRound } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface RiskAssessmentSectionProps {
  riskAssessmentText: string;
}

const RiskAssessmentSection: React.FC<RiskAssessmentSectionProps> = ({ riskAssessmentText }) => {
  // Extract competitor data - in a real app, this would parse AI-generated text
  // This is mock data that would be replaced with actual parsed content
  const competitors = [
    {
      name: "Salesforce",
      marketShare: "34%",
      strength: "Strong brand recognition and customer loyalty",
      weakness: "Limited digital presence, slower to adapt to market changes",
      annualRevenue: "$45M",
      founded: 2005
    },
    {
      name: "HubSpot",
      marketShare: "28%",
      strength: "Innovative technology solutions and rapid product development",
      weakness: "Higher price point, smaller customer service team",
      annualRevenue: "$38M",
      founded: 2010
    },
    {
      name: "Zoho",
      marketShare: "19%",
      strength: "Extensive distribution network and excellent supply chain",
      weakness: "Product quality inconsistencies, outdated marketing strategies",
      annualRevenue: "$25M",
      founded: 2008
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-red-500" />
        Risk & Competitive Assessment
      </h2>

      <Tabs defaultValue="risks" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="risks" className="flex items-center gap-1.5">
            <Activity className="h-4 w-4" /> Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-1.5">
            <Building className="h-4 w-4" /> Top Competitors
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="risks">
          <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-5">
              <div className="prose dark:prose-invert max-w-none text-sm">
                <p className="leading-relaxed">{riskAssessmentText || "Loading..."}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitors">
          <div className="grid gap-4">
            {competitors.map((competitor, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <UsersRound className="h-4 w-4 text-blue-500" />
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Est. {competitor.founded} • Annual Revenue: {competitor.annualRevenue}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium">
                      {competitor.marketShare} Market Share
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Key Strength</h4>
                      <p className="text-sm">{competitor.strength}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Key Weakness</h4>
                      <p className="text-sm">{competitor.weakness}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RiskAssessmentSection;
