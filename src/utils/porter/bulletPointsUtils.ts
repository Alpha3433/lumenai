
// Extracts bullet points from text sections
export const extractBulletPoints = (text: string): string[] => {
  // First, remove any titles or headers that contain the force name
  const cleanedText = text.replace(/#+\s*(?:competitive rivalry|threat of (?:new )?(?:entrants|entry|substitution)|bargaining power of (?:suppliers|buyers)|supplier power|buyer power)[^\n]*/gi, '');
  
  // Clean up any "HIGH", "MEDIUM", "LOW" markers at the beginning of the text
  const furtherCleanedText = cleanedText.replace(/^\s*(?:high|medium|low)[:\.\s]*/gi, '');
  
  // If text already has bullet points (•, -, *, etc.)
  if (/[•\-\*]\s+/.test(furtherCleanedText)) {
    return furtherCleanedText
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => /^[•\-\*]\s+/.test(line))
      .map(line => line.replace(/^[•\-\*]\s+/, ''))
      .filter(line => {
        // Filter out generic bullet points that don't have specific details
        const isGeneric = /^(?:generally|typically|usually|often|may|might|can|could|tend to)\b/i.test(line) && 
                          line.length < 60 && 
                          !(/specific|percent|%|\$|[0-9]+|brand name|company name|\bapp\b|\bapps\b/i.test(line));
        return !isGeneric && line.length > 0;
      })
      .slice(0, 4); // Limit to max 4 points
  }
  
  // If no bullet points, split by sentences and take up to 4
  const sentences = furtherCleanedText
    .split(/\.(?:\s+|\n)/)
    .map(s => s.trim())
    .filter(s => {
      // Filter out generic sentences, keep sentences with specific details
      return s.length > 15 && 
             !s.includes('Porter') && 
             !s.includes('Five Forces') &&
             !/^(?:generally|this force is|typically|usually|often)\b/i.test(s);
    });
  
  return sentences.slice(0, 4).map(s => s.endsWith('.') ? s : `${s}.`);
};

// Extracts industry keywords from the market analysis text
export const extractIndustryKeywords = (text: string): string[] => {
  const industryKeywords: string[] = [];
  
  // Common industry words to look for
  const industries = [
    'technology', 'software', 'healthcare', 'finance', 'retail', 'e-commerce', 
    'education', 'manufacturing', 'hospitality', 'entertainment', 'media', 
    'transportation', 'logistics', 'construction', 'real estate', 'agriculture', 
    'energy', 'telecommunications', 'consulting', 'legal', 'marketing', 'advertising',
    'food', 'beverage', 'fashion', 'beauty', 'fitness', 'travel', 'tourism'
  ];
  
  // Look for phrases like "in the X industry" or "X sector"
  const industryPhrases = [
    /in the ([a-zA-Z\-]+(?:\s+[a-zA-Z\-]+){0,2}) (?:industry|market|sector)/gi,
    /([a-zA-Z\-]+(?:\s+[a-zA-Z\-]+){0,2}) industry trends/gi,
    /the ([a-zA-Z\-]+(?:\s+[a-zA-Z\-]+){0,2}) sector/gi
  ];
  
  // Extract industry keywords from the text using patterns
  for (const pattern of industryPhrases) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[1].length > 3) {
        const keyword = match[1].toLowerCase().trim();
        if (!industryKeywords.includes(keyword)) {
          industryKeywords.push(keyword);
        }
      }
    }
  }
  
  // If no industry keywords found via patterns, check for direct mentions
  if (industryKeywords.length === 0) {
    for (const industry of industries) {
      if (text.toLowerCase().includes(industry)) {
        industryKeywords.push(industry);
      }
    }
  }
  
  return industryKeywords.slice(0, 3);
};

// Extract product type from text (software, physical product, service, etc.)
export const extractProductType = (text: string): string => {
  const productPatterns = [
    { regex: /\b(?:software|app|application|platform|digital product|saas|web app)\b/i, type: 'software' },
    { regex: /\b(?:device|hardware|equipment|tool|gadget|machine|physical product)\b/i, type: 'hardware' },
    { regex: /\b(?:service|consulting|support|maintenance|training|coaching)\b/i, type: 'service' },
    { regex: /\b(?:food|beverage|meal|drink|consumable)\b/i, type: 'food and beverage' },
    { regex: /\b(?:clothing|apparel|fashion|accessory|wearable)\b/i, type: 'apparel' }
  ];
  
  for (const pattern of productPatterns) {
    if (pattern.regex.test(text)) {
      return pattern.type;
    }
  }
  
  // Default to generic product if nothing specific is found
  return 'product';
};
