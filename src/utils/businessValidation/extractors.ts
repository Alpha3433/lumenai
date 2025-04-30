
import { ValidationData } from './types';

export const extractValidationData = (text: string): ValidationData => {
  const validationData: ValidationData = {
    overallScore: 85, // Hardcoded for demonstration based on the image
    categories: [
      { name: 'Market Need', score: 88, icon: 'Users', color: 'text-blue-600' },
      { name: 'Profitability', score: 83, icon: 'Coins', color: 'text-green-600' },
      { name: 'Competition', score: 65, icon: 'Target', color: 'text-purple-600' },
      { name: 'Time to Market', score: 80, icon: 'Calendar', color: 'text-amber-600' },
      { name: 'Scalability', score: 90, icon: 'TrendingUp', color: 'text-indigo-600' },
    ],
    positives: [
      "recurring revenue",
      "growing market"
    ],
    negatives: [
      "High Competition",
      "market saturation"
    ],
    recommendations: []
  };

  return validationData;
};

// Mock functions that would normally parse the business description
function calculateMarketScore(text: string): number {
  return 88;
}

function calculateProfitabilityScore(text: string): number {
  return 83;
}

function calculateCompetitionScore(text: string): number {
  return 65;
}

function calculateTimeToMarketScore(text: string): number {
  return 80;
}

function calculateScalabilityScore(text: string): number {
  return 90;
}
