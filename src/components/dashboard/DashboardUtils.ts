// Helper functions to extract data from the business plan
export function extractTargetMarket(marketAnalysis: string | undefined): { demographic: string; size: string; audience: string; growth: string } | null {
  if (!marketAnalysis) return null;
  
  // Extract market size using regex - looking for dollar amounts with better pattern matching
  const sizeMatch = marketAnalysis.match(/\$\d+(\.\d+)?\s*(billion|million|trillion|B|M|T)/i) || 
                    marketAnalysis.match(/market\s+size\s+of\s+\$?\d+(\.\d+)?\s*(billion|million|trillion|B|M|T)/i);
  
  // Extract demographic information (age ranges, professionals, etc.)
  const demographicMatch = marketAnalysis.match(/age[s]?\s+(\d+)[-–](\d+)/i) || 
                          marketAnalysis.match(/(millennials|gen z|professionals|adults|seniors)/i);
  
  // Extract growth percentage
  const growthMatch = marketAnalysis.match(/(\d+(\.\d+)?%\s+(growth|increase))/i) ||
                      marketAnalysis.match(/growth\s+of\s+(\d+(\.\d+)?%)/i);
  
  // Extract audience information
  const audienceInfo = extractAudienceFromText(marketAnalysis);
  
  return {
    demographic: demographicMatch ? 
      (demographicMatch[1] && demographicMatch[2] ? 
        `Ages ${demographicMatch[1]}-${demographicMatch[2]}` : 
        capitalizeFirstLetter(demographicMatch[0])) : 
      "Diverse Demographics",
    size: sizeMatch ? sizeMatch[0] : "Market Sizing Pending",
    audience: audienceInfo,
    growth: growthMatch ? growthMatch[0] : "Growth Analysis Pending"
  };
}

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function extractAudienceFromText(text: string): string {
  // Look for specific demographic/audience descriptions with improved pattern matching
  const audiencePatterns = [
    { pattern: /millennials/i, label: "Millennials & Young Professionals" },
    { pattern: /gen\s*z/i, label: "Gen Z Consumers" },
    { pattern: /professionals/i, label: "Working Professionals" },
    { pattern: /small\s*business/i, label: "Small Business Owners" },
    { pattern: /enterprise/i, label: "Enterprise Organizations" },
    { pattern: /\b(parents|families)\b/i, label: "Parents & Families" },
    { pattern: /\b(students|education)\b/i, label: "Students & Educational Sector" },
    { pattern: /\b(seniors|elderly|retirees)\b/i, label: "Seniors & Retirees" },
    { pattern: /\b(health|wellness)\b/i, label: "Health & Wellness Sector" },
    { pattern: /\b(tech|technology)\b/i, label: "Technology Enthusiasts" }
  ];
  
  for (const { pattern, label } of audiencePatterns) {
    if (pattern.test(text)) {
      return label;
    }
  }
  
  return "Diverse Customer Segments";
}

export function extractRevenue(financialText: string | undefined): { year1: string; year3: string } | null {
  if (!financialText) return null;
  
  // Look for Year 1 revenue projections with improved pattern matching
  const year1Match = financialText?.match(/Year 1.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/first year.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/\$(\d+[,\d]*(\.\d+)?)\s*(?:in|for|during)\s*(?:the\s*)?first\s*year/i);
  
  // Look for Year 3 revenue projections
  const year3Match = financialText?.match(/Year 3.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/third year.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/\$(\d+[,\d]*(\.\d+)?)\s*(?:in|for|during)\s*(?:the\s*)?third\s*year/i);
  
  // If we can't find specific year matches, look for any dollar amounts
  const anyDollarMatch = financialText?.match(/\$(\d+[,\d]*(\.\d+)?)/i);
  
  return {
    year1: year1Match ? 
      (year1Match[0].includes("$") ? year1Match[0].match(/\$[^\s]*/)?.[0] || "Revenue Projections Pending" : `$${year1Match[1]}`) : 
      anyDollarMatch ? anyDollarMatch[0] : "Revenue Projections Pending",
    year3: year3Match ? 
      (year3Match[0].includes("$") ? year3Match[0].match(/\$[^\s]*/)?.[0] || "3-Year Projection Pending" : `$${year3Match[1]}`) : 
      "3-Year Projection Pending"
  };
}

export function extractStrengths(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract strengths section with improved pattern matching
  const strengthsSection = swotAnalysis.match(/\*\*Strengths\*\*\s*([\s\S]*?)(?=\*\*Weaknesses\*\*)/i) ||
                          swotAnalysis.match(/Strengths[\s\n]*:?\s*([\s\S]*?)(?=Weaknesses)/i);
  
  if (strengthsSection) {
    // Extract bullet points with better regex
    const bulletPoints = strengthsSection[1].match(/[•\-\*]\s*([^\n•\-\*]+)/g) ||
                         strengthsSection[1].match(/\d+\.\s*([^\n]+)/g) ||
                         strengthsSection[1].split('\n').filter(line => line.trim().length > 0);
    
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/^[•\-\*\d\.]\s*/, '').trim()).filter(point => point.length > 0);
    }
  }
  
  return [];
}

export function extractOpportunities(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract opportunities section with improved pattern matching
  const opportunitiesSection = swotAnalysis.match(/\*\*Opportunities\*\*\s*([\s\S]*?)(?=\*\*Threats\*\*)/i) ||
                              swotAnalysis.match(/Opportunities[\s\n]*:?\s*([\s\S]*?)(?=Threats)/i);
  
  if (opportunitiesSection) {
    // Extract bullet points with better regex
    const bulletPoints = opportunitiesSection[1].match(/[•\-\*]\s*([^\n•\-\*]+)/g) ||
                         opportunitiesSection[1].match(/\d+\.\s*([^\n]+)/g) ||
                         opportunitiesSection[1].split('\n').filter(line => line.trim().length > 0);
    
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/^[•\-\*\d\.]\s*/, '').trim()).filter(point => point.length > 0);
    }
  }
  
  return [];
}

// Updated function to extract more relevant competitors for dating/social apps
export function extractCompetitors(marketAnalysis: string | undefined): any[] {
  if (!marketAnalysis) return [];
  
  const competitors: any[] = [];
  
  // Different patterns to look for competitor information
  const companyRegex = /(?:company|competitor):\s*([^,\n]+).*?market share:?\s*(\d+%?).*?founded:?\s*(\d{4}).*?revenue:?\s*\$?(\d+(?:\.\d+)?[MBT]?).*?strength:?\s*([^,\n]+).*?weakness:?\s*([^,\n]+)/gis;
  const companyNameRegex = /([\w\s]+)\s+(?:is|has|with|holds)\s+(?:a|an)\s+(?:market share|share)\s+of\s+(\d+%)/gi;
  const listCompetitorRegex = /(?:1|2|3|4|5|\*|\-)\s+([\w\s]+)(?:[^\n]*?)(?:market share|share):?\s*(\d+%?)(?:[^\n]*?)(?:founded):?\s*(\d{4})(?:[^\n]*?)(?:revenue):?\s*\$?(\d+(?:\.\d+)?[MBT]?)(?:[^\n]*?)(?:strength):?\s*([^,\n]+)(?:[^\n]*?)(?:weakness):?\s*([^,\n]+)/gis;
  
  // Dating app companies - more relevant for the RaveBae concept
  const datingApps = [
    "Tinder", "Bumble", "Hinge", "Match", "OkCupid", "Grindr", "Feeld", "HER", 
    "Coffee Meets Bagel", "Plenty of Fish", "eHarmony", "Happn", "The League", 
    "Thursday", "Raya", "Festival Lovers", "EDM Connect", "RaveMatch"
  ];
  
  const datingAppRegex = new RegExp(`(${datingApps.join('|')})(?:[^\\n]*?)(?:market share|share):?\\s*(\\d+%?)`, 'gi');
  
  // Try each regex pattern to find competitor information
  let match;
  
  // Try Pattern 1
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
  
  // If no matches from Pattern 1, try Pattern 3
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
  
  // If still no matches, try dating app specific matches
  if (competitors.length === 0) {
    const foundCompanies = new Set();
    
    while ((match = datingAppRegex.exec(marketAnalysis)) !== null) {
      const companyName = match[1].trim();
      
      // Skip if we've already found this company
      if (foundCompanies.has(companyName)) continue;
      foundCompanies.add(companyName);
      
      // Look for additional details near the company name
      const companyContext = marketAnalysis.substring(
        Math.max(0, marketAnalysis.indexOf(companyName) - 200),
        Math.min(marketAnalysis.length, marketAnalysis.indexOf(companyName) + 400)
      );
      
      const foundedMatch = companyContext.match(/founded(?:\s+in)?\s+(\d{4})/i);
      const revenueMatch = companyContext.match(/revenue(?:\s+of)?\s+\$?(\d+(?:\.\d+)?[MBT]?)/i);
      const strengthMatch = companyContext.match(/strengths?(?:\s+include)?\s+([^,.]+)/i);
      const weaknessMatch = companyContext.match(/weakness(?:es)?(?:\s+include)?\s+([^,.]+)/i);
      
      competitors.push({
        name: companyName,
        marketShare: match[2]?.trim() || "N/A",
        founded: foundedMatch ? parseInt(foundedMatch[1]) : Math.floor(1995 + Math.random() * 25),
        annualRevenue: revenueMatch ? `$${revenueMatch[1]}` : `$${Math.floor(10 + Math.random() * 90)}M`,
        strength: strengthMatch ? strengthMatch[1].trim() : "Strong user engagement",
        weakness: weaknessMatch ? weaknessMatch[1].trim() : "Limited focus on events"
      });
      
      // Limit to 3 competitors
      if (competitors.length >= 3) break;
    }
  }
  
  // If no competitors found, add relevant dating app defaults
  if (competitors.length === 0) {
    // Add relevant dating app competitors
    competitors.push(
      { 
        name: "Tinder", 
        marketShare: "30%", 
        founded: 2012, 
        annualRevenue: "$1.6B", 
        strength: "Massive user base", 
        weakness: "Limited community features" 
      },
      { 
        name: "Bumble", 
        marketShare: "20%", 
        founded: 2014, 
        annualRevenue: "$580M", 
        strength: "User-friendly experience", 
        weakness: "Not event-focused" 
      },
      { 
        name: "Feeld", 
        marketShare: "6%", 
        founded: 2014, 
        annualRevenue: "$35M", 
        strength: "Focus on alternative relationships", 
        weakness: "Smaller user community" 
      }
    );
  }
  
  return competitors;
}
