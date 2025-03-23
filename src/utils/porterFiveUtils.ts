
// Helper functions for Porter's Five Forces analysis data extraction and processing

export type ForcesLevel = 'Low' | 'Medium' | 'High';

export interface PorterForce {
  category: 'threat-new-entry' | 'threat-substitution' | 'supplier-power' | 'buyer-power' | 'competitive-rivalry';
  title: string;
  level: ForcesLevel;
  points: string[];
  icon: string;
}

export type PorterFiveForcesData = {
  [key in PorterForce['category']]: PorterForce;
};

// Function to determine threat level based on text content
const determineThreatLevel = (text: string): ForcesLevel => {
  const lowerText = text.toLowerCase();
  
  // Count instances of high, medium, low in the text
  const highCount = (lowerText.match(/high|strong|significant|substantial|intense|considerable/g) || []).length;
  const mediumCount = (lowerText.match(/medium|moderate|average|balanced|fair/g) || []).length;
  const lowCount = (lowerText.match(/low|minimal|limited|negligible|small|weak/g) || []).length;
  
  // Determine level based on counts
  if (highCount > lowCount && highCount > mediumCount) return 'High';
  if (lowCount > highCount && lowCount > mediumCount) return 'Low';
  return 'Medium';
};

// Extracts bullet points from text sections
const extractBulletPoints = (text: string): string[] => {
  // If text already has bullet points (•, -, *, etc.)
  if (/[•\-\*]\s+/.test(text)) {
    return text
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => /^[•\-\*]\s+/.test(line))
      .map(line => line.replace(/^[•\-\*]\s+/, ''))
      .filter(line => line.length > 0);
  }
  
  // If no bullet points, split by sentences and take up to 4
  const sentences = text
    .split(/\.(?:\s+|\n)/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && !s.includes('Porter') && !s.includes('Five Forces'));
  
  return sentences.slice(0, 4).map(s => s.endsWith('.') ? s : `${s}.`);
};

// Main function to extract Porter's Five Forces from analysis text
export const extractPorterFiveForcesData = (analysisText: string): PorterFiveForcesData => {
  // Default result structure with empty values
  const result: PorterFiveForcesData = {
    'threat-new-entry': {
      category: 'threat-new-entry',
      title: 'Threat of new entry',
      level: 'Medium',
      icon: 'log-in',
      points: []
    },
    'threat-substitution': {
      category: 'threat-substitution',
      title: 'Threat of substitution',
      level: 'Medium',
      icon: 'shuffle',
      points: []
    },
    'supplier-power': {
      category: 'supplier-power',
      title: 'Supplier power',
      level: 'Medium',
      icon: 'truck',
      points: []
    },
    'buyer-power': {
      category: 'buyer-power',
      title: 'Buyer power',
      level: 'Medium',
      icon: 'users',
      points: []
    },
    'competitive-rivalry': {
      category: 'competitive-rivalry',
      title: 'Competitive rivalry',
      level: 'Medium',
      icon: 'swords',
      points: []
    }
  };
  
  // Extract sections for each force
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
  
  // If any force has no points, provide generic fallback content
  Object.keys(result).forEach(key => {
    const category = key as PorterForce['category'];
    if (result[category].points.length === 0) {
      // Provide default points if none were extracted
      switch (category) {
        case 'threat-new-entry':
          result[category].points = [
            "Entry barriers depend on capital requirements and economies of scale.",
            "Brand loyalty and switching costs affect new entrants.",
            "Access to distribution channels can limit new competitors."
          ];
          break;
        case 'threat-substitution':
          result[category].points = [
            "Customers may find alternative products or services.",
            "Price-performance trade-offs of substitutes influence decisions.",
            "Switching costs impact likelihood of substitution."
          ];
          break;
        case 'supplier-power':
          result[category].points = [
            "Supplier concentration relative to industry concentration.",
            "Availability of substitute inputs affects supplier leverage.",
            "Importance of volume to suppliers impacts negotiating power."
          ];
          break;
        case 'buyer-power':
          result[category].points = [
            "Buyer concentration relative to firm concentration.",
            "Degree of standardization or differentiation.",
            "Switching costs for buyers influence their power."
          ];
          break;
        case 'competitive-rivalry':
          result[category].points = [
            "Number and balance of competitors in the market.",
            "Industry growth rate affects competition intensity.",
            "Fixed costs and exit barriers impact competitive behavior."
          ];
          break;
      }
    }
  });
  
  return result;
};

export const getLevelColor = (level: ForcesLevel): string => {
  const colors = {
    'Low': 'green',
    'Medium': 'orange',
    'High': 'red'
  };
  
  return colors[level];
};
