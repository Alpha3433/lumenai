
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { extractCompetitors } from '@/utils/extraction/competitorUtils';

interface CompetitorsCardProps {
  competitors: any[];
}

const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ competitors }) => {
  if (!competitors || competitors.length === 0) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow col-span-1 md:col-span-3">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-muted-foreground">Top Competitors</h3>
            <Building className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-3">
            <p className="text-base font-medium">Industry Analysis</p>
            <p className="text-sm text-muted-foreground mt-1">No competitors identified for this business type</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow col-span-1 md:col-span-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Top Competitors</h3>
          <Building className="h-4 w-4 text-orange-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {competitors.slice(0, 3).map((competitor, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-medium">{competitor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Est. {competitor.founded} • Annual Revenue: {competitor.annualRevenue}
                  </p>
                </div>
                <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                  {competitor.marketShare}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Key Strength</p>
                    <p className="text-xs text-muted-foreground">{competitor.strength}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 p-1 rounded">
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Key Weakness</p>
                    <p className="text-xs text-muted-foreground">{competitor.weakness}</p>
                  </div>
                </div>
              </div>
              
              {index < Math.min(competitors.length - 1, 2) && (
                <Separator className="md:hidden mt-3" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorsCard;
