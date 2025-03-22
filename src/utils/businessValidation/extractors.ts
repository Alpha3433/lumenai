
import { ValidationData } from './types';

export const extractValidationData = (text: string): ValidationData => {
  // Default scoring structure
  const validationData = {
    overallScore: 72,
    categories: [
      { name: 'Market Need', score: 75, icon: 'Users', color: 'text-blue-600' },
      { name: 'Profitability', score: 65, icon: 'Coins', color: 'text-green-600' },
      { name: 'Competition', score: 60, icon: 'Target', color: 'text-purple-600' },
      { name: 'Time to Market', score: 80, icon: 'Calendar', color: 'text-amber-600' },
      { name: 'Scalability', score: 70, icon: 'TrendingUp', color: 'text-indigo-600' },
    ],
    positives: [
      "Addresses a clear market need",
      "Low initial capital required",
      "Attractive target demographic",
      "Strong revenue potential"
    ],
    negatives: [
      "Crowded competitive landscape",
      "Low barriers to entry",
      "Requires strong marketing strategy",
      "Seasonal demand fluctuations"
    ],
    recommendations: [
      "Focus on unique selling proposition",
      "Develop strong brand identity",
      "Partner with established players",
      "Build scalable systems from the start"
    ]
  };

  // Try to extract real insights from the text
  try {
    // Extract points based on keywords
    const marketMatch = text.match(/market.{1,30}(strong|positive|good|potential|opportunity|need|demand|large|growing|niche)/gi);
    const profitMatch = text.match(/(profit|revenue|monetization|margin).{1,30}(high|good|strong|potential)/gi);
    const competitionMatch = text.match(/(competition|competitive|competitor|market share).{1,50}/gi);
    const scaleMatch = text.match(/(scale|growth|expand).{1,40}/gi);
    
    // Adjust scores based on text analysis
    if (marketMatch && marketMatch.length > 2) {
      validationData.categories[0].score = Math.min(95, validationData.categories[0].score + 20);
    } else if (text.match(/market.{1,30}(weak|saturated|difficult|challenging)/gi)) {
      validationData.categories[0].score = Math.max(30, validationData.categories[0].score - 15);
    }
    
    if (profitMatch && profitMatch.length > 1) {
      validationData.categories[1].score = Math.min(95, validationData.categories[1].score + 15);
    } else if (text.match(/(profit|revenue|monetization).{1,30}(low|challenging|difficult|unclear)/gi)) {
      validationData.categories[1].score = Math.max(25, validationData.categories[1].score - 20);
    }
    
    if (competitionMatch && text.match(/(low|minimal|little) competition/gi)) {
      validationData.categories[2].score = Math.min(95, validationData.categories[2].score + 20);
    } else if (text.match(/(high|strong|fierce) competition/gi)) {
      validationData.categories[2].score = Math.max(30, validationData.categories[2].score - 15);
    }
    
    if (scaleMatch && scaleMatch.length > 1) {
      validationData.categories[4].score = Math.min(95, validationData.categories[4].score + 10);
    }
    
    // Extract positives and negatives
    const positivePhrases = [
      /unique (selling point|value proposition)/i,
      /first mover advantage/i,
      /proprietary technology/i,
      /strong team/i,
      /clear revenue model/i,
      /growing market/i,
      /high margins/i,
      /recurring revenue/i,
      /network effects/i,
      /proven concept/i
    ];
    
    const negativePhrases = [
      /high (competition|competitive)/i,
      /regulatory (challenges|hurdles|issues)/i,
      /high customer acquisition cost/i,
      /low margins/i,
      /limited (scalability|scaling)/i,
      /high capital requirements/i,
      /long sales cycle/i,
      /seasonal business/i,
      /pricing pressure/i,
      /uncertain demand/i
    ];
    
    // Find positives
    const foundPositives = [];
    positivePhrases.forEach(phrase => {
      const match = text.match(phrase);
      if (match) {
        foundPositives.push(match[0].charAt(0).toUpperCase() + match[0].slice(1));
      }
    });
    
    // Find negatives
    const foundNegatives = [];
    negativePhrases.forEach(phrase => {
      const match = text.match(phrase);
      if (match) {
        foundNegatives.push(match[0].charAt(0).toUpperCase() + match[0].slice(1));
      }
    });
    
    // Use found insights if available
    if (foundPositives.length > 0) {
      validationData.positives = foundPositives.slice(0, 4);
    }
    
    if (foundNegatives.length > 0) {
      validationData.negatives = foundNegatives.slice(0, 4);
    }
    
    // Calculate overall score (weighted average)
    const weights = [0.25, 0.2, 0.15, 0.15, 0.25]; // Weights for each category
    const weightedScore = validationData.categories.reduce((sum, category, index) => {
      return sum + (category.score * weights[index]);
    }, 0);
    
    validationData.overallScore = Math.round(weightedScore);
    
    return validationData;
  } catch (e) {
    console.log("Error parsing validation data:", e);
    return validationData;
  }
};
