
import { PorterFiveForcesData, PorterForce } from './types';
import { determineThreatLevel } from './threatLevelUtils';
import { extractBulletPoints } from './bulletPointsUtils';
import { getDefaultForcesData, getFallbackPoints } from './defaultValues';

// Main function to extract Porter's Five Forces from analysis text
export const extractPorterFiveForcesData = (analysisText: string): PorterFiveForcesData => {
  // Get default result structure
  const result = getDefaultForcesData();
  
  // Extract sections for each force by looking for specific phrases in the text
  const sections: Record<string, { regex: RegExp, category: PorterForce['category'] }> = {
    newEntrants: { 
      regex: /threat of new (?:entrants|entries|entry)|barriers to entry/i, 
      category: 'threat-new-entry' 
    },
    substitutes: { 
      regex: /threat of substitut(?:es|ion)/i, 
      category: 'threat-substitution' 
    },
    supplierPower: { 
      regex: /(?:bargaining power|power) of suppliers|supplier power/i, 
      category: 'supplier-power' 
    },
    buyerPower: { 
      regex: /(?:bargaining power|power) of buyers|buyer power|customer power/i, 
      category: 'buyer-power' 
    },
    rivalry: { 
      regex: /(?:competitive|industry) rivalry|existing competitors|competition/i, 
      category: 'competitive-rivalry' 
    }
  };
  
  // Look for the business name and industry to help with fallbacks if needed
  const businessNameMatch = analysisText.match(/Business Name:\s*([^\n]+)/i);
  const businessName = businessNameMatch ? businessNameMatch[1].trim() : '';
  
  const industryMatch = analysisText.match(/(?:in the|within the)\s+([^\n.,]+(?:\s+[^\n.,]+){0,3})\s+(?:industry|market|sector)/i);
  const industry = industryMatch ? industryMatch[1].trim() : '';
  
  // Handle Porter's Five Forces section specifically if it exists
  if (analysisText.includes("Porter's Five Forces") || analysisText.includes("Porters Five Forces")) {
    // Try to find the Porter's section and parse it
    const porterSectionMatch = analysisText.match(/(?:Porter's|Porters) Five Forces(?:.|\n)*?(?=(?:\n\n|\n#|\n<h))/i);
    
    if (porterSectionMatch) {
      const porterSection = porterSectionMatch[0];
      
      // Split the Porter's section into subsections for each force
      const forceBlocks = porterSection.split(/\n\s*(?=(?:Threat|Bargaining|Competitive))/i);
      
      forceBlocks.forEach(block => {
        // For each block, identify which force it describes
        Object.values(sections).forEach(({ regex, category }) => {
          if (regex.test(block)) {
            const level = determineThreatLevel(block);
            const points = extractBulletPoints(block);
            
            if (points.length > 0) {
              result[category].level = level;
              result[category].points = points;
            }
          }
        });
      });
    }
  } else {
    // If no specific Porter's section, scan the whole text
    // Find paragraphs for each force
    const paragraphs = analysisText.split(/\n\n+/);
    
    paragraphs.forEach(paragraph => {
      // For each type of force, check if the paragraph matches
      Object.values(sections).forEach(({ regex, category }) => {
        if (regex.test(paragraph)) {
          // Extract threat level and bullet points
          const level = determineThreatLevel(paragraph);
          const points = extractBulletPoints(paragraph);
          
          if (points.length > 0) {
            result[category].level = level;
            result[category].points = points;
          }
        }
      });
    });
  }
  
  // Generate fallback content if needed
  Object.keys(result).forEach(key => {
    const category = key as PorterForce['category'];
    if (result[category].points.length === 0) {
      result[category].points = getFallbackPoints(category, businessName, industry, analysisText);
    }
  });
  
  return result;
};
