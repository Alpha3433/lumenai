
import { PestelData, PestelFactor } from './types';
import { extractFactorsForCategory, categoryKeywords } from './extractionUtils';
import { generateFallbackPestelData, generateFallbackFactorsForCategory } from './fallbackData';
import { getCategoryIcon, getCategoryColor } from './displayUtils';

// Re-export types with 'export type' syntax
export type { PestelData, PestelFactor };

// Re-export functions normally
export { 
  getCategoryIcon, 
  getCategoryColor,
  generateFallbackPestelData,
  generateFallbackFactorsForCategory
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

    // Extract PESTEL factors for each category
    Object.keys(pestelData).forEach(key => {
      const category = key as keyof PestelData;
      extractFactorsForCategory(
        analysisText, 
        category, 
        categoryKeywords[category], 
        pestelData
      );
    });

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
