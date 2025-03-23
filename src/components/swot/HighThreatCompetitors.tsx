
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ExternalLink, Shield, Target, Zap, TrendingDown, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extractCompetitors } from '@/utils/extraction/competitorUtils';
import { cn } from '@/lib/utils';
import { callOpenAI } from '@/utils/openaiService';
import { useState, useEffect } from 'react';

interface HighThreatCompetitorsProps {
  marketAnalysis: string;
}

interface CompetitorWithBusinessModel extends ReturnType<typeof extractCompetitors>[0] {
  businessModel?: string;
  threatScore?: number;
}

const HighThreatCompetitors: React.FC<HighThreatCompetitorsProps> = ({ marketAnalysis }) => {
  const [competitorsWithModels, setCompetitorsWithModels] = useState<CompetitorWithBusinessModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepareCompetitors = async () => {
      setIsLoading(true);
      // Extract and calculate competitor threat scores
      const competitors = extractCompetitors(marketAnalysis);
      
      // Calculate threat scores based on market share and other factors
      const competitorsWithScores = competitors.map(competitor => {
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
      
      try {
        // Generate business models for each competitor
        const competitorsWithBusinessModels = await Promise.all(
          topCompetitors.map(async (competitor) => {
            if (import.meta.env.DEV && (!competitor.pricingModel || competitor.pricingModel.trim() === '')) {
              // Use AI to generate a business model in development mode if none exists
              const prompt = `Generate a concise, realistic business model description (2 sentences max) for a company named ${competitor.name} in their industry. Focus on revenue streams and pricing strategy. Keep it under 120 characters.`;
              
              try {
                const response = await callOpenAI({
                  prompt,
                  model: 'gpt-3.5-turbo',
                  temperature: 0.7,
                  maxTokens: 120
                });
                
                return {
                  ...competitor,
                  businessModel: response.success ? response.text : inferPricingModel(competitor)
                };
              } catch (error) {
                console.error('Error generating business model:', error);
                return {
                  ...competitor,
                  businessModel: inferPricingModel(competitor)
                };
              }
            } else {
              // Use the existing pricing model or infer one if necessary
              return {
                ...competitor,
                businessModel: competitor.pricingModel || inferPricingModel(competitor)
              };
            }
          })
        );
        
        setCompetitorsWithModels(competitorsWithBusinessModels);
      } catch (error) {
        console.error('Error preparing competitors:', error);
        // Fallback to inferred models
        setCompetitorsWithModels(
          topCompetitors.map(competitor => ({
            ...competitor,
            businessModel: competitor.pricingModel || inferPricingModel(competitor)
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    if (marketAnalysis) {
      prepareCompetitors();
    }
  }, [marketAnalysis]);
  
  // Generate pricing model description if not available
  const inferPricingModel = (competitor) => {
    const models = [
      "Freemium (free access, pay for premium services)",
      "Subscription-based model",
      "One-time purchase",
      "Marketplace fees",
      "Advertising-supported"
    ];
    
    // Deterministically select a pricing model based on the competitor name
    const nameSum = competitor.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return models[nameSum % models.length];
  };

  // Generate a logo color based on competitor name
  const getLogoColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 
      'bg-cyan-500', 'bg-orange-500'
    ];
    
    // Use the competitor name to deterministically select a color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };
  
  // Get threat level badge color
  const getThreatBadgeColor = (score: number) => {
    if (score >= 8) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (score >= 6) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  };
  
  // Get threat level badge text
  const getThreatLevelText = (score: number) => {
    if (score >= 8) return "Critical Threat";
    if (score >= 6) return "High Threat";
    return "Moderate Threat";
  };
  
  // Get threat icon based on threat score
  const getThreatIcon = (score: number) => {
    if (score >= 8) return <AlertCircle className="h-4 w-4" />;
    if (score >= 6) return <TrendingDown className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  if (!competitorsWithModels.length && !isLoading) {
    return null;
  }

  return (
    <Card className="mt-8 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col items-center relative">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Target className="h-5 w-5 text-red-500" />
          </div>
          High Threat Competitors
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full absolute right-0 top-6">
          Competitive intelligence
        </div>
      </div>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800 animate-pulse">
                <div className="h-3 bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                    <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitorsWithModels.map((competitor, index) => (
              <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md">
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
                      <div className={`rounded-full py-1 px-3 text-xs font-medium flex items-center gap-1 ${getThreatBadgeColor(competitor.threatScore)}`}>
                        {getThreatIcon(competitor.threatScore)}
                        <span>{getThreatLevelText(competitor.threatScore)}</span>
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HighThreatCompetitors;
