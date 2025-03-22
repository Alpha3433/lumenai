
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Competitor {
  name: string;
  marketShare: string;
  founded: number;
  annualRevenue: string;
  strength: string;
  weakness: string;
}

interface CompetitorsCardProps {
  competitors: Competitor[];
}

const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ competitors }) => {
  if (!competitors || competitors.length === 0) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-muted-foreground">Top Competitors</h3>
            <Building className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-3">
            <p className="text-base font-medium">Industry Analysis</p>
            <p className="text-sm text-muted-foreground mt-1">Competitor data pending</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display the first competitor in the card
  const topCompetitor = competitors[0];
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-muted-foreground">Top Competitors</h3>
          <Building className="h-4 w-4 text-orange-500" />
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-start">
            <p className="text-base font-medium">{topCompetitor.name}</p>
            <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
              {topCompetitor.marketShare} Market Share
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Founded: {topCompetitor.founded} • Revenue: {topCompetitor.annualRevenue}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorsCard;
