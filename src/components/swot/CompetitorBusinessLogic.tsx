
import { useState, useEffect } from 'react';
import { callOpenAI } from '@/utils/openaiService';
import { extractCompetitors } from '@/utils/extraction/competitorUtils';
import { CompetitorWithBusinessModel } from './utils/competitorCardUtils';

export const useCompetitorData = (marketAnalysis: string) => {
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
  const inferPricingModel = (competitor: CompetitorWithBusinessModel) => {
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
  
  return { competitorsWithModels, isLoading };
};
