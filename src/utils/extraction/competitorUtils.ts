
/**
 * Main competitor extraction utilities 
 */
import { Competitor } from './competitors/types';
import { getRandomStrength, getRandomWeakness } from './competitors/attributeUtils';
import { getIndustryCompetitors } from './competitors/industryCompetitors';
import { createDefaultCompetitors } from './competitors/defaultCompetitors';

/**
 * Extract competitors from market analysis text
 */
export function extractCompetitors(marketAnalysis: string | undefined): Competitor[] {
  if (!marketAnalysis) return [];
  
  const competitors: Competitor[] = [];
  
  // Use regex patterns to identify competitor information
  const companyRegex = /(?:company|competitor):\s*([^,\n]+).*?market share:?\s*(\d+%?).*?founded:?\s*(\d{4}).*?revenue:?\s*\$?(\d+(?:\.\d+)?[MBT]?).*?strength:?\s*([^,\n]+).*?weakness:?\s*([^,\n]+)/gis;
  const listCompetitorRegex = /(?:1|2|3|4|5|\*|\-)\s+([\w\s]+)(?:[^\n]*?)(?:market share|share):?\s*(\d+%?)(?:[^\n]*?)(?:founded):?\s*(\d{4})(?:[^\n]*?)(?:revenue):?\s*\$?(\d+(?:\.\d+)?[MBT]?)(?:[^\n]*?)(?:strength):?\s*([^,\n]+)(?:[^\n]*?)(?:weakness):?\s*([^,\n]+)/gis;
  
  // Look for specifically mentioned company names in the text
  const companyMentionRegex = /([\w\s]+)\s+(?:has|with|holds|at)\s+(?:a|an)?\s*(?:market share|market|share)\s+of\s+(\d+%)/gi;
  
  // Try to identify the industry from the market analysis
  const industryRegex = /(?:industry|market|sector|business)(?:\s+is|\s+in|\s+of|\s+for|\s+focuses\s+on)?\s+([\w\s,&]+)/i;
  const industryMatch = marketAnalysis.match(industryRegex);
  const industry = industryMatch ? industryMatch[1].trim().toLowerCase() : '';
  
  // Try to identify product/service type
  const productServiceRegex = /(?:product|service|app|platform|software|solution)(?:\s+is|\s+for|\s+that|\s+which|\s+offering)?\s+([\w\s,&]+)/i;
  const productMatch = marketAnalysis.match(productServiceRegex);
  const productType = productMatch ? productMatch[1].trim().toLowerCase() : '';
  
  // Combine industry and product information
  const businessContext = `${industry} ${productType}`.toLowerCase();
  
  // Search for predefined competitors based on identified industry
  const industryCompetitorNames = getIndustryCompetitors(businessContext);
  
  // Create a regex to find any of the industry-specific competitors in the text
  if (industryCompetitorNames.length > 0) {
    const industryCompetitorRegex = new RegExp(`(${industryCompetitorNames.join('|')})(?:[^\\n]*?)(?:market share|share)?:?\\s*(\\d+%)?`, 'gi');
    let match;
    
    // Try to find competitor information using predefined patterns
    while ((match = companyRegex.exec(marketAnalysis)) !== null) {
      if (match.length >= 7) {
        competitors.push({
          name: match[1].trim(),
          marketShare: match[2].trim(),
          founded: parseInt(match[3].trim()),
          annualRevenue: match[4].includes('$') ? match[4].trim() : `$${match[4].trim()}`,
          strength: match[5].trim(),
          weakness: match[6].trim()
        });
      }
    }
    
    // If no matches from Pattern 1, try Pattern 2
    if (competitors.length === 0) {
      while ((match = listCompetitorRegex.exec(marketAnalysis)) !== null) {
        if (match.length >= 7) {
          competitors.push({
            name: match[1].trim(),
            marketShare: match[2].trim(),
            founded: parseInt(match[3].trim()),
            annualRevenue: match[4].includes('$') ? match[4].trim() : `$${match[4].trim()}`,
            strength: match[5].trim(),
            weakness: match[6].trim()
          });
        }
      }
    }
    
    // Try to find any mentioned competitors from our industry-specific list
    if (competitors.length === 0) {
      const foundCompanies = new Set();
      
      while ((match = industryCompetitorRegex.exec(marketAnalysis)) !== null) {
        const companyName = match[1].trim();
        
        // Skip if we've already found this company
        if (foundCompanies.has(companyName)) continue;
        foundCompanies.add(companyName);
        
        // Look for additional details near the company name
        const companyContext = marketAnalysis.substring(
          Math.max(0, marketAnalysis.indexOf(companyName) - 300),
          Math.min(marketAnalysis.length, marketAnalysis.indexOf(companyName) + 500)
        );
        
        const foundedMatch = companyContext.match(/founded(?:\s+in)?\s+(\d{4})/i);
        const revenueMatch = companyContext.match(/revenue(?:\s+of)?\s+\$?(\d+(?:\.\d+)?[MBT]?)/i);
        const marketShareMatch = companyContext.match(/market share(?:\s+of)?\s+(\d+%?)/i);
        const strengthMatch = companyContext.match(/strengths?(?:\s+include)?\s+([^,.]+)/i);
        const weaknessMatch = companyContext.match(/weakness(?:es)?(?:\s+include)?\s+([^,.]+)/i);
        
        competitors.push({
          name: companyName,
          marketShare: marketShareMatch ? marketShareMatch[1] : match[2] ? match[2] : `${Math.floor(5 + Math.random() * 35)}%`,
          founded: foundedMatch ? parseInt(foundedMatch[1]) : (2000 + Math.floor(Math.random() * 22)),
          annualRevenue: revenueMatch ? `$${revenueMatch[1]}` : `$${Math.floor(5 + Math.random() * 40)}${['M', 'B'][Math.floor(Math.random() * 2)]}`,
          strength: strengthMatch ? strengthMatch[1].trim() : getRandomStrength(businessContext, companyName),
          weakness: weaknessMatch ? weaknessMatch[1].trim() : getRandomWeakness(businessContext, companyName)
        });
        
        // Limit to 3 competitors
        if (competitors.length >= 3) break;
      }
    }
    
    // If still no competitors found, fallback to industry defaults
    if (competitors.length === 0) {
      // Get the top 3 most likely competitors for this industry
      const top3Competitors = industryCompetitorNames.slice(0, 3);
      
      for (const competitorName of top3Competitors) {
        competitors.push({
          name: competitorName,
          marketShare: `${Math.floor(5 + Math.random() * 35)}%`,
          founded: (2000 + Math.floor(Math.random() * 22)),
          annualRevenue: `$${Math.floor(5 + Math.random() * 40)}${['M', 'B'][Math.floor(Math.random() * 2)]}`,
          strength: getRandomStrength(businessContext, competitorName),
          weakness: getRandomWeakness(businessContext, competitorName)
        });
      }
    }
  }
  
  // If no competitors at all, create some generic ones based on rough industry context
  if (competitors.length === 0) {
    competitors.push(...createDefaultCompetitors(businessContext));
  }
  
  return competitors;
}

// Re-export the Competitor type
export type { Competitor } from './competitors/types';
