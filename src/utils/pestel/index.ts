
import type { PestelData, PestelFactor } from './types';
import { extractFactorsForCategory, categoryKeywords } from './extractionUtils';
import { generateFallbackPestelData, generateFallbackFactorsForCategory } from './fallbackData';
import { getCategoryIcon, getCategoryColor } from './displayUtils';

// Re-export types
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
      console.log("No analysis text available, using fallback data");
      return generateFallbackPestelData();
    }

    console.log("Extracting PESTEL data from analysis text");
    
    // Look specifically for a PESTEL section in the text
    const pestelSectionMatch = analysisText.match(/PESTEL Analysis(?:[\s\S]*?)(?:(?=##)|$)/i);
    const pestelSection = pestelSectionMatch ? pestelSectionMatch[0] : analysisText;

    // Extract PESTEL factors for each category
    Object.keys(pestelData).forEach(key => {
      const category = key as keyof PestelData;
      
      // Look for category-specific sections first
      const categoryRegex = new RegExp(`${category}(?:\\s+factors?)?:?(?:[\\s\\S]*?)(?:(?=(?:economic|social|technological|environmental|legal|political)\\s+factors?)|(?=##)|$)`, 'i');
      const categoryMatch = pestelSection.match(categoryRegex);
      
      if (categoryMatch) {
        // If we found a specific section for this category, extract points from it
        const categoryText = categoryMatch[0];
        const pointRegex = /(?:•|-|\*|\d+\.)\s+([^\n]+)/g;
        let pointMatch;
        
        while ((pointMatch = pointRegex.exec(categoryText)) !== null) {
          if (pointMatch[1] && pointMatch[1].trim().length > 10) {
            pestelData[category].push(pointMatch[1].trim());
          }
        }
        
        // If no bullet points found, try to extract sentences
        if (pestelData[category].length === 0) {
          const sentences = categoryText.split(/(?<=[.!?])\s+/);
          sentences.slice(1, 5).forEach(sentence => {
            if (sentence.trim().length > 15) {
              pestelData[category].push(sentence.trim());
            }
          });
        }
      }
      
      // If we still don't have points, use the general extraction method
      if (pestelData[category].length === 0) {
        extractFactorsForCategory(
          analysisText, 
          category, 
          categoryKeywords[category], 
          pestelData
        );
      }
    });

    // Check if we have enough data for each category, generate fallbacks if needed
    Object.keys(pestelData).forEach(key => {
      const category = key as keyof PestelData;
      if (pestelData[category].length < 2) {
        console.log(`Not enough data for ${category}, adding fallback data`);
        pestelData[category] = [
          ...pestelData[category],
          ...generateFallbackFactorsForCategory(category, 3 - pestelData[category].length)
        ];
      }
      
      // Limit to 3 points max per category
      pestelData[category] = pestelData[category].slice(0, 3);
    });

    return pestelData;
  } catch (error) {
    console.error("Error extracting PESTEL data:", error);
    return generateFallbackPestelData();
  }
};
