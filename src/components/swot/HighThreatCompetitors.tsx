
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, ExternalLink, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extractCompetitors, Competitor } from '@/components/dashboard/DashboardUtils';

interface HighThreatCompetitorsProps {
  marketAnalysis: string;
}

const HighThreatCompetitors: React.FC<HighThreatCompetitorsProps> = ({ marketAnalysis }) => {
  const competitors = extractCompetitors(marketAnalysis);
  
  // Calculate threat scores based on market share and other factors
  const competitorsWithScores = competitors.map((competitor: Competitor) => {
    // Extract market share percentage
    const marketShareMatch = competitor.marketShare.match(/(\d+)/);
    const marketShareValue = marketShareMatch ? parseInt(marketShareMatch[1]) : 0;
    
    // Calculate threat score based on market share and other factors (1-10 scale)
    let threatScore = Math.min(10, Math.max(1, Math.round(marketShareValue / 5) + 4));
    
    // Adjust score based on revenue (higher revenue = higher threat)
    if (competitor.annualRevenue.includes('B')) {
      threatScore = Math.min(10, threatScore + 2);
    }
    
    // Calculate how established they are based on founding year
    const yearsEstablished = new Date().getFullYear() - competitor.founded;
    if (yearsEstablished > 10) {
      threatScore = Math.min(10, threatScore + 1);
    }
    
    return {
      ...competitor,
      threatScore,
    };
  });
  
  // Sort by threat score descending
  const sortedCompetitors = [...competitorsWithScores].sort((a, b) => 
    (b.threatScore || 0) - (a.threatScore || 0)
  );
  
  // Get top 3 highest threat competitors
  const topCompetitors = sortedCompetitors.slice(0, 3);
  
  // Generate a logo color based on competitor name
  const getLogoColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-cyan-500', 'bg-orange-500'
    ];
    
    // Use the competitor name to deterministically select a color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };
  
  // Generate pricing model description if not available
  const inferPricingModel = (competitor: Competitor) => {
    const models = [
      "Freemium (free access, pay for premium services)",
      "Subscription-based model",
      "One-time purchase",
      "Marketplace fees",
      "Advertising-supported"
    ];
    
    // Deterministically select a pricing model based on the competitor name
    const nameSum = competitor.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return competitor.pricingModel || models[nameSum % models.length];
  };

  if (!topCompetitors.length) {
    return null;
  }

  return (
    <Card className="mt-8 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" /> High Threat Competitors
        </h3>
      </div>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {topCompetitors.map((competitor, index) => (
            <div key={index} className="p-6 relative">
              <div className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-full">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {competitor.threatScore}
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${getLogoColor(competitor.name)}`}>
                  {competitor.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold">{competitor.name}</h4>
                  <p className="text-muted-foreground">{competitor.strength}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Market Share:</span>
                    <span className="py-0.5 px-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                      {competitor.marketShare}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Founded:</span> {competitor.founded}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Annual Revenue:</span> {competitor.annualRevenue}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Strengths & Weaknesses</h5>
                  <div className="space-y-1">
                    <div className="flex gap-2 items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{competitor.strength}</span>
                    </div>
                    <div className="flex gap-2 items-start text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>{competitor.weakness}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div>
                  <h5 className="font-medium">Market Position</h5>
                  <p className="text-sm">Major player (~{competitor.marketShare} market share)</p>
                </div>
                <div>
                  <h5 className="font-medium">Pricing Model</h5>
                  <p className="text-sm">{inferPricingModel(competitor)}</p>
                </div>
              </div>
              
              <div className="mt-4 text-right">
                <Button variant="ghost" size="sm" className="text-primary">
                  Visit website <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HighThreatCompetitors;
