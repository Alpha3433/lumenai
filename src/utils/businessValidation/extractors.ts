import { ValidationData } from './types';

export const extractValidationData = (text: string): ValidationData => {
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
    // Enhanced scoring logic
    let marketScore = calculateMarketScore(text);
    let profitabilityScore = calculateProfitabilityScore(text);
    let competitionScore = calculateCompetitionScore(text);
    let timeToMarketScore = calculateTimeToMarketScore(text);
    let scalabilityScore = calculateScalabilityScore(text);

    // Update category scores with weighted calculations
    validationData.categories[0].score = Math.min(100, Math.max(0, marketScore));
    validationData.categories[1].score = Math.min(100, Math.max(0, profitabilityScore));
    validationData.categories[2].score = Math.min(100, Math.max(0, competitionScore));
    validationData.categories[3].score = Math.min(100, Math.max(0, timeToMarketScore));
    validationData.categories[4].score = Math.min(100, Math.max(0, scalabilityScore));

    // Calculate overall score with weighted importance
    const weights = [0.3, 0.25, 0.15, 0.15, 0.15]; // Adjusted weights based on importance
    validationData.overallScore = Math.round(
      validationData.categories.reduce((sum, category, index) => {
        return sum + (category.score * weights[index]);
      }, 0)
    );

    // Extract strengths and weaknesses
    validationData.positives = extractKeyStrengths(text);
    validationData.negatives = extractKeyWeaknesses(text);
    validationData.recommendations = generateRecommendations(validationData);

    return validationData;
  } catch (e) {
    console.error("Error analyzing business validation:", e);
    return validationData;
  }
};

// Helper functions for score calculation
function calculateMarketScore(text: string): number {
  let score = 70; // Base score
  
  // Market size indicators
  if (text.match(/large market|growing market|billion|million/i)) score += 10;
  if (text.match(/niche market|small market|limited demand/i)) score -= 10;
  
  // Problem validation
  if (text.match(/solving|pain point|customer need|demand/i)) score += 10;
  if (text.match(/unclear need|uncertain demand/i)) score -= 10;
  
  // Market growth
  if (text.match(/rapid growth|expanding|increasing demand/i)) score += 10;
  if (text.match(/declining|shrinking|decreasing/i)) score -= 10;
  
  return score;
}

function calculateProfitabilityScore(text: string): number {
  let score = 65; // Base score
  
  // Revenue potential
  if (text.match(/high margin|profitable|recurring revenue/i)) score += 10;
  if (text.match(/low margin|price sensitive|cost intensive/i)) score -= 10;
  
  // Cost structure
  if (text.match(/low cost|efficient|automated/i)) score += 10;
  if (text.match(/high cost|expensive|resource intensive/i)) score -= 10;
  
  // Business model
  if (text.match(/subscription|saas|recurring/i)) score += 15;
  if (text.match(/one-time|transactional|variable/i)) score -= 5;
  
  return score;
}

function calculateCompetitionScore(text: string): number {
  let score = 60; // Base score
  
  // Competition level
  if (text.match(/high competition|saturated|crowded market/i)) score -= 15;
  if (text.match(/low competition|unique|innovative/i)) score += 15;
  
  // Barriers to entry
  if (text.match(/patent|proprietary|unique technology/i)) score += 10;
  if (text.match(/easy to copy|no barriers|simple/i)) score -= 10;
  
  // Competitive advantage
  if (text.match(/competitive advantage|unique selling|differentiated/i)) score += 10;
  if (text.match(/similar to|like existing|comparable to/i)) score -= 10;
  
  return score;
}

function calculateTimeToMarketScore(text: string): number {
  let score = 75; // Base score
  
  // Development time
  if (text.match(/quick to develop|ready|existing solution/i)) score += 10;
  if (text.match(/complex development|long timeline|extensive research/i)) score -= 10;
  
  // Regulatory requirements
  if (text.match(/heavily regulated|compliance|certification/i)) score -= 15;
  if (text.match(/unregulated|straightforward|simple compliance/i)) score += 10;
  
  return score;
}

function calculateScalabilityScore(text: string): number {
  let score = 68; // Base score
  
  // Scalability potential
  if (text.match(/easily scalable|automated|digital/i)) score += 15;
  if (text.match(/manual process|physical limitations|geography dependent/i)) score -= 15;
  
  // Market expansion
  if (text.match(/global potential|multiple markets|expansion opportunity/i)) score += 10;
  if (text.match(/local only|limited reach|geographic constraints/i)) score -= 10;
  
  return score;
}

function extractKeyStrengths(text: string): string[] {
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

function extractKeyWeaknesses(text: string): string[] {
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
