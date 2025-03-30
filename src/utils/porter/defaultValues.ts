
import { PorterFiveForcesData } from './types';
import { extractIndustryKeywords, extractProductType } from './bulletPointsUtils';

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
      /main players in this market include[^.]*((?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})(?:,\s+(?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})){0,5})/i,
      /(?:major|key|main) competitors (?:are|include)[^.]*((?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})(?:,\s+(?:[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){0,2})){0,5})/i
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
  
  // Extract industry keywords if none provided
  const industryKeywords = industry ? [industry] : extractIndustryKeywords(analysisText);
  const primaryIndustry = industryKeywords[0] || "technology";
  
  // Determine business type (product vs service)
  const productType = extractProductType(analysisText);
  
  // Extract price point indicators
  const isPremium = /premium|luxury|high-end|upscale/i.test(analysisText);
  const pricePoint = isPremium ? "premium" : "standard";
  
  // Look for market growth indicators
  const isGrowingMarket = /growing|emerging|expanding|rise|increasing|booming/i.test(analysisText);
  const marketTrend = isGrowingMarket ? "growing" : "mature";
  
  // Look for regulation indicators
  const hasRegulations = /regulation|compliance|certification|license|standard|law|legal requirement/i.test(analysisText);
  
  switch (category) {
    case 'threat-new-entry':
      return [
        `New entrants to the ${primaryIndustry} market face ${isPremium ? 'high' : 'significant'} ${productType === 'software' ? 'technical expertise requirements' : 'capital investment requirements'} and ${productType === 'service' ? 'brand development' : 'development'} costs.`,
        `${businessName ? businessName : "The business"} benefits from ${isGrowingMarket ? 'early mover' : 'established market'} advantage with ${pricePoint} ${productType} offerings that have built customer loyalty.`,
        `${hasRegulations ? 'Regulatory compliance and certifications' : 'Intellectual property protections and patents'} create barriers for new competitors entering the ${primaryIndustry} space.`,
        `The ${marketTrend} market requires new entrants to secure ${productType === 'service' ? 'skilled talent' : 'distribution channels'} which existing players have already established.`
      ];
    case 'threat-substitution':
      return [
        `Alternative ${productType}s like ${productType === 'software' ? 'traditional manual methods' : productType === 'service' ? 'self-service options' : 'simpler alternatives'} offer lower costs but reduced ${productType === 'service' ? 'quality' : 'functionality'}.`,
        `${competitor1} offers a competing ${productType} at a ${isPremium ? 'lower price point' : 'higher price with additional features'}, attracting price-sensitive segments of the market.`,
        `Customers may hesitate to switch due to ${productType === 'software' ? 'integration costs and learning curves' : productType === 'service' ? 'relationship switching costs' : 'compatibility issues'} associated with new ${productType}s.`,
        `The unique ${isPremium ? 'premium features' : 'value proposition'} of this ${productType} limits viable substitutes in the ${primaryIndustry} sector.`
      ];
    case 'supplier-power':
      return [
        `Key ${productType === 'software' ? 'technology providers' : productType === 'service' ? 'talent and skilled workers' : 'component manufacturers'} have ${isGrowingMarket ? 'increasing' : 'moderate'} leverage over operational costs in the ${primaryIndustry} sector.`,
        `Multiple sourcing options for ${productType === 'software' ? 'development tools and cloud services' : productType === 'service' ? 'service delivery resources' : 'raw materials and components'} reduce dependency on any single supplier.`,
        `${isPremium ? 'Quality-focused' : 'Long-term'} contracts with suppliers help mitigate ${isPremium ? 'quality inconsistencies' : 'short-term price fluctuations'} in the ${primaryIndustry} supply chain.`,
        `The ${marketTrend} ${primaryIndustry} market gives ${marketTrend === 'growing' ? 'businesses more options' : 'suppliers more negotiating power'} as ${marketTrend === 'growing' ? 'new suppliers emerge' : 'consolidation occurs'}.`
      ];
    case 'buyer-power':
      return [
        `${isPremium ? 'High-value clients' : 'Price-sensitive customers'} have significant influence on ${isPremium ? 'service expectations' : 'pricing and feature expectations'} in the ${primaryIndustry} market.`,
        `The ${productType}'s ${isPremium ? 'premium positioning' : 'unique value proposition'} reduces price sensitivity among the ${isPremium ? 'high-end' : 'target'} demographic.`,
        `${productType === 'software' ? 'User acquisition' : productType === 'service' ? 'Client acquisition' : 'Customer acquisition'} costs in the ${primaryIndustry} sector require ${isPremium ? 'value-based' : 'competitive'} pricing and retention strategies.`,
        `${competitors.length > 0 ? 'The presence of alternatives like ' + competitor1 : 'Multiple competing options'} ${isGrowingMarket ? 'in this growing market' : ''} increases buyer negotiating power for ${productType} offerings.`
      ];
    case 'competitive-rivalry':
      return [
        `Direct competition with ${competitor1}${competitor2 ? ` and ${competitor2}` : ""} in the ${primaryIndustry} space affects market share and pricing strategies.`,
        `The ${marketTrend} ${primaryIndustry} market ${marketTrend === 'growing' ? 'reduces' : 'intensifies'} competitive pressure through ${marketTrend === 'growing' ? 'market expansion' : 'market saturation'}.`,
        `${productType === 'software' ? 'Feature innovation' : productType === 'service' ? 'Service quality' : 'Product differentiation'} and ${isPremium ? 'premium positioning' : 'cost efficiency'} are critical competitive factors in this ${primaryIndustry} segment.`,
        `${hasRegulations ? 'Regulatory compliance capabilities' : 'Brand recognition and customer loyalty'} provide competitive advantages for established players like ${competitor1 || 'market leaders'}.`
      ];
  }
};
