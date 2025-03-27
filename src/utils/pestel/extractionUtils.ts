
import { PestelData } from './types';
import { generateFallbackPestelData, generateFallbackFactorsForCategory } from './fallbackData';

// Helper function to extract factors for a specific category
export const extractFactorsForCategory = (
  text: string, 
  category: keyof PestelData, 
  keywords: string[], 
  pestelData: PestelData
): void => {
  // Split the text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  // Find sentences that contain any of the keywords for this category
  const relevantSentences = sentences.filter(sentence => 
    keywords.some(keyword => 
      sentence.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  // Extract unique points (avoiding duplicates)
  const uniquePoints = new Set<string>();
  
  // Process each sentence to create concise points
  relevantSentences.forEach(sentence => {
    // Clean up the sentence
    let point = sentence.trim()
      .replace(/^[•\-\*]\s*/, '') // Remove bullet points
      .replace(/^\d+\.\s*/, ''); // Remove numbering
    
    // Only add if not too short and not already included
    if (point.length > 15 && !uniquePoints.has(point.toLowerCase())) {
      uniquePoints.add(point.toLowerCase());
      pestelData[category].push(point);
    }
    
    // Limit to 5 points per category
    if (pestelData[category].length >= 5) {
      return;
    }
  });
};

// Keywords collections for each PESTEL category
export const categoryKeywords = {
  political: [
    'politic', 'government', 'regulation', 'tax', 'policy', 'legal framework',
    'trade restriction', 'tariff', 'stability', 'election', 'laws', 'corruption'
  ],
  economic: [
    'econom', 'inflation', 'interest rate', 'exchange rate', 'gdp', 'growth rate',
    'unemployment', 'labor cost', 'business cycle', 'consumer confidence', 'recession',
    'income', 'purchasing power', 'market trends', 'financial', 'revenue', 'profit margin',
    'dollar', 'price', 'cost', 'market size', 'billion', 'million', 'growth'
  ],
  social: [
    'social', 'demographic', 'population', 'age distribution', 'education level',
    'career attitude', 'lifestyle', 'cultural', 'health consciousness', 'social mobility',
    'attitude', 'consumer', 'trend', 'behavior', 'ethnic', 'religious', 'values',
    'generation', 'millennials', 'gen z', 'baby boomer'
  ],
  technological: [
    'technolog', 'innovation', 'automation', 'research', 'development', 'digital', 
    'internet', 'e-commerce', 'mobile', 'ai', 'artificial intelligence', 'machine learning',
    'blockchain', 'iot', 'internet of things', 'vr', 'virtual reality', 'ar', 'augmented reality',
    'digital transformation', 'disruption', 'software', 'platform', 'app', 'algorithm'
  ],
  environmental: [
    'environment', 'climate', 'sustainable', 'green', 'eco-friendly', 'carbon footprint',
    'pollution', 'waste management', 'recycling', 'renewable', 'weather', 'natural disaster',
    'energy efficiency', 'ecological', 'conservation', 'emissions', 'resource scarcity'
  ],
  legal: [
    'legal', 'law', 'regulation', 'compliance', 'patent', 'copyright', 'intellectual property',
    'consumer protection', 'employment law', 'health and safety', 'data protection', 'privacy',
    'antitrust', 'licensing', 'standards', 'gdpr', 'hipaa', 'legislation', 'court', 'liability'
  ]
};
