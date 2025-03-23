
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink, Zap, TrendingDown, Building, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompetitorWithBusinessModel, getLogoColor, getThreatBadgeColor, getThreatLevelText } from './utils/competitorCardUtils';
import { cn } from '@/lib/utils';

interface CompetitorCardProps {
  competitor: CompetitorWithBusinessModel;
  index: number;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, index }) => {
  // Get threat icon based on threat score
  const getThreatIcon = (score: number) => {
    if (score >= 8) return <AlertCircle className="h-4 w-4" />;
    if (score >= 6) return <TrendingDown className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md">
      <div className="relative">
        {/* Header gradient banner based on threat level */}
        <div className={cn(
          "h-3",
          competitor.threatScore >= 8 ? "bg-gradient-to-r from-red-500 to-pink-500" : 
          competitor.threatScore >= 6 ? "bg-gradient-to-r from-amber-500 to-red-400" : 
          "bg-gradient-to-r from-blue-500 to-purple-500"
        )} />
        
        <div className="p-5">
          {/* Company logo and name */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold ${getLogoColor(competitor.name)}`}>
                {competitor.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{competitor.name}</h4>
                <div className="text-xs text-gray-500">Est. {competitor.founded}</div>
              </div>
            </div>
            
            {/* Threat score badge */}
            <div className={`rounded-full py-1 px-3 text-xs font-medium flex items-center gap-1 ${getThreatBadgeColor(competitor.threatScore || 0)}`}>
              {getThreatIcon(competitor.threatScore || 0)}
              <span>{getThreatLevelText(competitor.threatScore || 0)}</span>
            </div>
          </div>
          
          {/* Market position */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Market Share</div>
              <div className="font-semibold flex items-center gap-1">
                <Zap className="h-4 w-4 text-purple-500" />
                {competitor.marketShare}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Revenue</div>
              <div className="font-semibold">{competitor.annualRevenue}</div>
            </div>
          </div>
          
          {/* Strengths & Weaknesses */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold mb-2">Key Characteristics</h5>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-green-600 text-xs">+</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{competitor.strength}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-red-600 text-xs">-</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{competitor.weakness}</p>
              </div>
            </div>
          </div>
          
          {/* Business Model - Now dynamic */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <Building className="h-4 w-4 text-blue-500" />
              Business Model
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10 p-2 rounded border-l-2 border-blue-500">
              {competitor.businessModel}
            </p>
          </div>
          
          {/* Action button */}
          <div className="text-right mt-5">
            <Button variant="outline" size="sm" className="text-xs">
              View Details <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompetitorCard;
