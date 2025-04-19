import { ValidationData } from './types';

export const extractValidationData = (text: string): ValidationData => {
  // Initialize with default structure
  const validationData: ValidationData = {
    overallScore: 0,
    categories: [
      { name: 'Market Need', score: 0, icon: 'Users', color: 'text-blue-600' },
      { name: 'Profitability', score: 0, icon: 'Coins', color: 'text-green-600' },
      { name: 'Competition', score: 0, icon: 'Target', color: 'text-purple-600' },
      { name: 'Time to Market', score: 0, icon: 'Calendar', color: 'text-amber-600' },
      { name: 'Scalability', score: 0, icon: 'TrendingUp', color: 'text-indigo-600' },
    ],
    positives: [],
    negatives: [],
    recommendations: []
  };

  try {
    // Category detection
    const categoryPatterns = [
      { pattern: /food|restaurant|meal|kitchen/gi, category: 'Food & Beverage' },
      { pattern: /tech|software|app|digital/gi, category: 'Technology' },
      { pattern: /health|wellness|fitness|medical/gi, category: 'Healthcare' },
      { pattern: /education|learning|training|course/gi, category: 'Education' },
      { pattern: /retail|shop|store|ecommerce/gi, category: 'Retail' },
      { pattern: /sustainable|eco|green|environment/gi, category: 'Sustainable' },
      { pattern: /finance|banking|investment/gi, category: 'Finance' }
    ];

    // Detect business category
    for (const { pattern, category } of categoryPatterns) {
      if (pattern.test(text)) {
        validationData.category = category;
        break;
      }
    }

    // Extract brief description
    const firstSentenceMatch = text.match(/^([^.!?]+[.!?])\s*/);
    if (firstSentenceMatch) {
      validationData.description = firstSentenceMatch[1].trim();
    }

    // Market analysis patterns
    const marketPatterns = {
      positive: [
        /(?:high|strong|growing|large) (?:demand|market|opportunity)/i,
        /(?:unique|innovative) (?:solution|approach|product)/i,
        /competitive advantage/i,
        /scalable/i
      ],
      negative: [
        /(?:high|intense) competition/i,
        /market saturation/i,
        /limited demand/i,
        /regulatory (?:challenges|barriers)/i
      ]
    };

    // Calculate scores based on text analysis
    let marketScore = 70; // Base score
    let profitabilityScore = 65;
    let competitionScore = 60;
    let timeToMarketScore = 75;
    let scalabilityScore = 68;

    // Adjust scores based on text analysis
    marketPatterns.positive.forEach(pattern => {
      if (pattern.test(text)) marketScore += 5;
    });

    marketPatterns.negative.forEach(pattern => {
      if (pattern.test(text)) marketScore -= 5;
    });

    // Update category scores
    validationData.categories[0].score = Math.min(100, Math.max(0, marketScore));
    validationData.categories[1].score = Math.min(100, Math.max(0, profitabilityScore));
    validationData.categories[2].score = Math.min(100, Math.max(0, competitionScore));
    validationData.categories[3].score = Math.min(100, Math.max(0, timeToMarketScore));
    validationData.categories[4].score = Math.min(100, Math.max(0, scalabilityScore));

    // Calculate overall score (weighted average)
    const weights = [0.25, 0.2, 0.15, 0.15, 0.25]; // Weights for each category
    validationData.overallScore = Math.round(
      validationData.categories.reduce((sum, category, index) => {
        return sum + (category.score * weights[index]);
      }, 0)
    );

    // Extract strengths and weaknesses
    validationData.positives = extractPositives(text);
    validationData.negatives = extractNegatives(text);
    validationData.recommendations = generateRecommendations(validationData);

    return validationData;
  } catch (e) {
    console.error("Error analyzing business validation:", e);
    return validationData;
  }
};

function extractPositives(text: string): string[] {
  const positivePatterns = [
    /(?:strong|high) profit margins?/i,
    /recurring revenue/i,
    /(?:large|growing) market/i,
    /competitive advantage/i,
    /unique selling proposition/i,
    /scalable business model/i,
    /low operating costs?/i,
    /high customer retention/i
  ];

  return positivePatterns
    .map(pattern => {
      const match = text.match(pattern);
      return match ? match[0] : null;
    })
    .filter((match): match is string => match !== null)
    .slice(0, 3);
}

function extractNegatives(text: string): string[] {
  const negativePatterns = [
    /high competition/i,
    /market saturation/i,
    /high customer acquisition cost/i,
    /regulatory challenges/i,
    /limited scalability/i,
    /supply chain risks?/i,
    /seasonal fluctuations?/i,
    /high operational costs?/i
  ];

  return negativePatterns
    .map(pattern => {
      const match = text.match(pattern);
      return match ? match[0] : null;
    })
    .filter((match): match is string => match !== null)
    .slice(0, 3);
}

function generateRecommendations(data: ValidationData): string[] {
  const recommendations: string[] = [];

  // Add recommendations based on scores
  if (data.categories[0].score < 70) {
    recommendations.push("Conduct more detailed market research to validate demand");
  }
  if (data.categories[1].score < 70) {
    recommendations.push("Optimize pricing strategy and reduce operational costs");
  }
  if (data.categories[2].score < 70) {
    recommendations.push("Develop stronger competitive differentiation");
  }
  if (data.categories[3].score < 70) {
    recommendations.push("Streamline launch timeline and reduce barriers to entry");
  }
  if (data.categories[4].score < 70) {
    recommendations.push("Identify and plan for scalability challenges");
  }

  return recommendations.slice(0, 3);
}
