
import { PestelData } from './types';

// Generate fallback PESTEL data when extraction fails
export const generateFallbackPestelData = (): PestelData => {
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
export const generateFallbackFactorsForCategory = (
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
