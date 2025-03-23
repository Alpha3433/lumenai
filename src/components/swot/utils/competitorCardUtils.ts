
import { extractCompetitors } from '@/utils/extraction/competitorUtils';

export interface CompetitorWithBusinessModel extends ReturnType<typeof extractCompetitors>[0] {
  businessModel?: string;
  threatScore?: number;
}

// Generate a logo color based on competitor name
export const getLogoColor = (name: string) => {
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
export const getThreatBadgeColor = (score: number) => {
  if (score >= 8) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  if (score >= 6) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
};

// Get threat level badge text
export const getThreatLevelText = (score: number) => {
  if (score >= 8) return "Critical Threat";
  if (score >= 6) return "High Threat";
  return "Moderate Threat";
};

// Generate pricing model description if not available
export const inferPricingModel = (competitor: CompetitorWithBusinessModel) => {
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
