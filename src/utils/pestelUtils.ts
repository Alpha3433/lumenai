
// Helper functions for PESTEL analysis data extraction and processing

export interface PestelFactor {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
}

export type PestelData = {
  [key in PestelFactor['category']]: string[];
};

export const extractPestelData = (analysisText: string): PestelData => {
  // Initialize the structure with empty arrays
  const pestelData: PestelData = {
    political: [],
    economic: [],
    social: [],
    technological: [],
    environmental: [],
    legal: []
  };

  try {
    // Check if market analysis text is available
    if (!analysisText || analysisText.trim() === '') {
      return generateFallbackPestelData();
    }

    // Extract PESTEL factors from the text
    // Look for sections like "Political Factors", "Economic Factors", etc.
    
    // Political factors
    extractFactorsForCategory(analysisText, 'political', [
      'politic', 'government', 'regulation', 'tax', 'policy', 'legal framework',
      'trade restriction', 'tariff', 'stability', 'election', 'laws', 'corruption'
    ], pestelData);
    
    // Economic factors
    extractFactorsForCategory(analysisText, 'economic', [
      'econom', 'inflation', 'interest rate', 'exchange rate', 'gdp', 'growth rate',
      'unemployment', 'labor cost', 'business cycle', 'consumer confidence', 'recession',
      'income', 'purchasing power', 'market trends', 'financial', 'revenue', 'profit margin',
      'dollar', 'price', 'cost', 'market size', 'billion', 'million', 'growth'
    ], pestelData);
    
    // Social factors
    extractFactorsForCategory(analysisText, 'social', [
      'social', 'demographic', 'population', 'age distribution', 'education level',
      'career attitude', 'lifestyle', 'cultural', 'health consciousness', 'social mobility',
      'attitude', 'consumer', 'trend', 'behavior', 'ethnic', 'religious', 'values',
      'generation', 'millennials', 'gen z', 'baby boomer'
    ], pestelData);
    
    // Technological factors
    extractFactorsForCategory(analysisText, 'technological', [
      'technolog', 'innovation', 'automation', 'research', 'development', 'digital', 
      'internet', 'e-commerce', 'mobile', 'ai', 'artificial intelligence', 'machine learning',
      'blockchain', 'iot', 'internet of things', 'vr', 'virtual reality', 'ar', 'augmented reality',
      'digital transformation', 'disruption', 'software', 'platform', 'app', 'algorithm'
    ], pestelData);
    
    // Environmental factors
    extractFactorsForCategory(analysisText, 'environmental', [
      'environment', 'climate', 'sustainable', 'green', 'eco-friendly', 'carbon footprint',
      'pollution', 'waste management', 'recycling', 'renewable', 'weather', 'natural disaster',
      'energy efficiency', 'ecological', 'conservation', 'emissions', 'resource scarcity'
    ], pestelData);
    
    // Legal factors
    extractFactorsForCategory(analysisText, 'legal', [
      'legal', 'law', 'regulation', 'compliance', 'patent', 'copyright', 'intellectual property',
      'consumer protection', 'employment law', 'health and safety', 'data protection', 'privacy',
      'antitrust', 'licensing', 'standards', 'gdpr', 'hipaa', 'legislation', 'court', 'liability'
    ], pestelData);

    // Check if we have enough data for each category, generate fallbacks if needed
    Object.keys(pestelData).forEach(key => {
      const category = key as keyof PestelData;
      if (pestelData[category].length < 2) {
        pestelData[category] = [
          ...pestelData[category],
          ...generateFallbackFactorsForCategory(category, 3 - pestelData[category].length)
        ];
      }
    });

    return pestelData;
  } catch (error) {
    console.error("Error extracting PESTEL data:", error);
    return generateFallbackPestelData();
  }
};

// Helper function to extract factors for a specific category
const extractFactorsForCategory = (
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

// Generate fallback PESTEL data when extraction fails
const generateFallbackPestelData = (): PestelData => {
  return {
    political: generateFallbackFactorsForCategory('political'),
    economic: generateFallbackFactorsForCategory('economic'),
    social: generateFallbackFactorsForCategory('social'),
    technological: generateFallbackFactorsForCategory('technological'),
    environmental: generateFallbackFactorsForCategory('environmental'),
    legal: generateFallbackFactorsForCategory('legal')
  };
};

// Generate fallback factors for a specific category
const generateFallbackFactorsForCategory = (
  category: keyof PestelData,
  count = 3
): string[] => {
  const fallbacks: Record<keyof PestelData, string[]> = {
    political: [
      "Government regulations may impact operations and compliance costs.",
      "Political stability in target markets affects business expansion potential.",
      "Changes in international trade policies could influence supply chain efficiency."
    ],
    economic: [
      "Economic growth trends indicate positive market opportunities.",
      "Consumer spending patterns show potential for industry expansion.",
      "Market size is estimated to reach significant value in the coming years."
    ],
    social: [
      "Changing consumer preferences are creating new market opportunities.",
      "Demographic shifts are reshaping the target audience profile.",
      "Social media influence is transforming marketing and customer engagement strategies."
    ],
    technological: [
      "Technological advancements are enabling new product development opportunities.",
      "Digital transformation is reshaping industry operational models.",
      "Automation and AI implementation could provide competitive advantages."
    ],
    environmental: [
      "Sustainability initiatives are becoming increasingly important to consumers.",
      "Environmental regulations may impact production and packaging processes.",
      "Climate change considerations affect long-term business planning."
    ],
    legal: [
      "Compliance with industry-specific regulations is essential for operations.",
      "Intellectual property protection will be crucial for maintaining competitive advantage.",
      "Data protection laws influence customer information management practices."
    ]
  };
  
  return fallbacks[category].slice(0, count);
};

export const getCategoryIcon = (category: PestelFactor['category']): string => {
  const icons = {
    political: 'building',
    economic: 'dollar-sign',
    social: 'users',
    technological: 'cpu',
    environmental: 'leaf',
    legal: 'scale'
  };
  
  return icons[category];
};

export const getCategoryColor = (category: PestelFactor['category']): string => {
  const colors = {
    political: 'red',
    economic: 'blue',
    social: 'yellow',
    technological: 'purple',
    environmental: 'green',
    legal: 'orange'
  };
  
  return colors[category];
};
