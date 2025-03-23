
import { PorterFiveForcesData } from './types';

// Default result structure with empty values
export const getDefaultForcesData = (): PorterFiveForcesData => ({
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
});

// Extract competitors from text to use in fallback points
const extractCompetitors = (text: string): string[] => {
  // Look for competitor names in formats like "Company: X" or "competitors include X, Y, Z"
  const competitors: string[] = [];
  
  // Look for competitor section
  const competitorSectionMatch = text.match(/key competitors[^]*?(?=\n\n)/i);
  if (competitorSectionMatch) {
    const competitorText = competitorSectionMatch[0];
    // Extract company names from formats like "Company: [Name]"
    const companyMatches = competitorText.match(/Company:\s*([^,\n]+)/gi);
    if (companyMatches) {
      companyMatches.forEach(match => {
        const company = match.replace(/Company:\s*/i, '').trim();
        if (company && !competitors.includes(company)) {
          competitors.push(company);
        }
      });
    }
  }
  
  // If we couldn't find competitors, look for other patterns
  if (competitors.length === 0) {
    const competitorPhrases = [
      /competitors(?:\s+include|\s+are|\s+such\s+as)[^.]*((?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})(?:,\s+(?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})){0,5})/i,
      /main players in this market include[^.]*((?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})(?:,\s+(?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})){0,5})/i
    ];
    
    for (const phrase of competitorPhrases) {
      const match = text.match(phrase);
      if (match && match[1]) {
        const names = match[1].split(/,\s+/);
        names.forEach(name => {
          if (name && !competitors.includes(name) && /^[A-Z]/.test(name)) {
            competitors.push(name.trim());
          }
        });
      }
      if (competitors.length > 0) break;
    }
  }
  
  return competitors.slice(0, 3);
};

// Provide default points if none were extracted, using business context if available
export const getFallbackPoints = (
  category: keyof PorterFiveForcesData, 
  businessName: string = "", 
  industry: string = "",
  analysisText: string = ""
): string[] => {
  const competitors = extractCompetitors(analysisText);
  const competitor1 = competitors[0] || "established competitors";
  const competitor2 = competitors[1] || "major players";
  
  // Determine business type (product vs service)
  const isProduct = /product|device|hardware|equipment|tool|app|software|platform/i.test(analysisText);
  const offerType = isProduct ? "product" : "service";
  
  // Extract price point indicators
  const isPremium = /premium|luxury|high-end|upscale/i.test(analysisText);
  const pricePoint = isPremium ? "premium" : "standard";
  
  // Default industry if not found
  const businessIndustry = industry || (isProduct ? "technology" : "services");
  
  switch (category) {
    case 'threat-new-entry':
      return [
        `New entrants to the ${businessIndustry} market face significant technical expertise requirements and development costs.`,
        `${businessName ? businessName : "The business"} benefits from first-mover advantage with established ${pricePoint} ${offerType} offerings.`,
        `Regulatory compliance and certifications create barriers for new competitors entering this space.`
      ];
    case 'threat-substitution':
      return [
        `Alternative ${offerType}s like ${isProduct ? "traditional manual methods" : "in-house solutions"} offer lower costs but reduced functionality.`,
        `${competitor1} offers a competing ${offerType} at a ${isPremium ? "lower price point" : "higher price with additional features"}.`,
        `Customers may hesitate to switch due to integration costs and learning curves associated with new ${offerType}s.`
      ];
    case 'supplier-power':
      return [
        `Key technology providers and ${isProduct ? "component manufacturers" : "platform providers"} have moderate leverage over operational costs.`,
        `Multiple sourcing options for ${isProduct ? "raw materials and components" : "essential services and tools"} reduce dependency on any single supplier.`,
        `Long-term contracts with suppliers help mitigate short-term price fluctuations in the ${businessIndustry} sector.`
      ];
    case 'buyer-power':
      return [
        `${isPremium ? "High-value clients" : "Price-sensitive customers"} have significant influence on pricing and feature expectations.`,
        `The ${offerType}'s unique value proposition reduces price sensitivity among the target demographic.`,
        `Customer acquisition costs in the ${businessIndustry} sector require competitive pricing and retention strategies.`
      ];
    case 'competitive-rivalry':
      return [
        `Direct competition with ${competitor1}${competitor2 ? ` and ${competitor2}` : ""} in the ${businessIndustry} space affects market share and pricing strategies.`,
        `The rapidly ${/growing|emerging|expanding/i.test(analysisText) ? "growing" : "maturing"} ${businessIndustry} market ${/growing|emerging|expanding/i.test(analysisText) ? "reduces" : "intensifies"} competitive pressure through market expansion.`,
        `Product differentiation and innovation are critical competitive factors in this ${businessIndustry} segment.`
      ];
  }
};
