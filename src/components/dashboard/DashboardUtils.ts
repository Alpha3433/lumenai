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

// Function to dynamically extract competitors based on the industry context
export function extractCompetitors(marketAnalysis: string | undefined): any[] {
  if (!marketAnalysis) return [];
  
  const competitors: any[] = [];
  
  // Use regex patterns to identify competitor information
  const companyRegex = /(?:company|competitor):\s*([^,\n]+).*?market share:?\s*(\d+%?).*?founded:?\s*(\d{4}).*?revenue:?\s*\$?(\d+(?:\.\d+)?[MBT]?).*?strength:?\s*([^,\n]+).*?weakness:?\s*([^,\n]+)/gis;
  const listCompetitorRegex = /(?:1|2|3|4|5|\*|\-)\s+([\w\s]+)(?:[^\n]*?)(?:market share|share):?\s*(\d+%?)(?:[^\n]*?)(?:founded):?\s*(\d{4})(?:[^\n]*?)(?:revenue):?\s*\$?(\d+(?:\.\d+)?[MBT]?)(?:[^\n]*?)(?:strength):?\s*([^,\n]+)(?:[^\n]*?)(?:weakness):?\s*([^,\n]+)/gis;
  
  // Look for specifically mentioned company names in the text
  const companyMentionRegex = /([\w\s]+)\s+(?:has|with|holds|at)\s+(?:a|an)?\s*(?:market share|market|share)\s+of\s+(\d+%)/gi;
  
  // Try to identify the industry from the market analysis
  const industryRegex = /(?:industry|market|sector)(?:\s+is|\s+in|\s+of|\s+for|\s+focuses\s+on)?\s+([\w\s,&]+)/i;
  const industryMatch = marketAnalysis.match(industryRegex);
  const industry = industryMatch ? industryMatch[1].trim().toLowerCase() : '';
  
  // Search for predefined competitors based on identified industry
  let industryCompetitorNames: string[] = [];
  
  // Define industry-specific competitors
  if (industry.includes('dating') || industry.includes('social') || industry.includes('event') || industry.includes('festival') || industry.includes('rave') || industry.includes('music')) {
    industryCompetitorNames = [
      "Tinder", "Bumble", "Hinge", "Feeld", "OkCupid", "Eventbrite", "Match.com", "Meetup",
      "Thursday", "Raya", "EDM Date", "Festival Connect", "Radiate", "Concert Buddy"
    ];
  } else if (industry.includes('fitness') || industry.includes('health') || industry.includes('wellness')) {
    industryCompetitorNames = [
      "Peloton", "MyFitnessPal", "Fitbit", "Strava", "Nike Training Club", "Calm", "Headspace",
      "ClassPass", "Noom", "WW", "Life Time Fitness"
    ];
  } else if (industry.includes('food') || industry.includes('restaurant') || industry.includes('delivery')) {
    industryCompetitorNames = [
      "Uber Eats", "DoorDash", "Grubhub", "Instacart", "Deliveroo", "HelloFresh", "Blue Apron",
      "Postmates", "Seamless", "GoPuff", "ChowNow"
    ];
  } else if (industry.includes('finance') || industry.includes('banking') || industry.includes('investment')) {
    industryCompetitorNames = [
      "Robinhood", "Acorns", "Wealthfront", "Betterment", "Mint", "Personal Capital", "SoFi",
      "Chime", "Venmo", "Cash App", "PayPal", "Plaid"
    ];
  } else if (industry.includes('education') || industry.includes('learning') || industry.includes('teaching')) {
    industryCompetitorNames = [
      "Coursera", "Udemy", "edX", "Khan Academy", "Duolingo", "Chegg", "Skillshare",
      "Brilliant", "MasterClass", "Codecademy", "Quizlet"
    ];
  }
  
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
          strength: strengthMatch ? strengthMatch[1].trim() : getRandomStrength(industry, companyName),
          weakness: weaknessMatch ? weaknessMatch[1].trim() : getRandomWeakness(industry, companyName)
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
          strength: getRandomStrength(industry, competitorName),
          weakness: getRandomWeakness(industry, competitorName)
        });
      }
    }
  }
  
  // If no competitors at all, create some generic ones based on rough industry
  if (competitors.length === 0) {
    const defaultCompetitors = [
      { 
        name: industry.includes('app') || industry.includes('tech') ? "TechLeader" : "MarketLeader", 
        marketShare: "32%", 
        founded: 2005, 
        annualRevenue: "$85M", 
        strength: "Strong user experience", 
        weakness: "Limited customer support" 
      },
      { 
        name: industry.includes('app') || industry.includes('tech') ? "AppInnovator" : "IndustryInnovator", 
        marketShare: "24%", 
        founded: 2012, 
        annualRevenue: "$42M", 
        strength: "Cutting-edge features", 
        weakness: "Higher price point" 
      },
      { 
        name: industry.includes('app') || industry.includes('tech') ? "UserFirst" : "CustomerFocus", 
        marketShare: "18%", 
        founded: 2015, 
        annualRevenue: "$28M", 
        strength: "Superior customer service", 
        weakness: "Smaller feature set" 
      }
    ];
    
    competitors.push(...defaultCompetitors);
  }
  
  return competitors;
}

// Helper function to generate random strengths based on industry and company
function getRandomStrength(industry: string, companyName: string): string {
  const strengths = [
    "Strong user base",
    "Intuitive user interface",
    "Advanced matching algorithm",
    "Large audience reach",
    "Strong brand recognition",
    "Innovative features",
    "Well-established platform",
    "High customer retention",
    "Robust mobile experience",
    "Superior analytics",
    "Community-focused approach",
    "Global market presence"
  ];
  
  // Dating/Social specific strengths
  if (industry.includes('dating') || industry.includes('social')) {
    strengths.push(
      "Advanced matching system",
      "Large active user base",
      "Strong community features",
      "Event-based connections",
      "High user engagement",
      "Personality-based matching"
    );
  }
  
  return strengths[Math.floor(Math.random() * strengths.length)];
}

// Helper function to generate random weaknesses based on industry and company
function getRandomWeakness(industry: string, companyName: string): string {
  const weaknesses = [
    "Limited feature set",
    "Higher subscription cost",
    "Poor customer support",
    "Limited geographic reach",
    "Outdated user interface",
    "Privacy concerns",
    "Limited free tier",
    "Slow update cycle",
    "Feature bloat",
    "Unclear pricing model",
    "Limited audience diversity"
  ];
  
  // Dating/Social specific weaknesses
  if (industry.includes('dating') || industry.includes('social')) {
    weaknesses.push(
      "Not event-focused",
      "Generic matching criteria",
      "Limited social features",
      "Lack of specialized focus",
      "Too many fake profiles",
      "Poor retention strategies"
    );
  }
  
  return weaknesses[Math.floor(Math.random() * weaknesses.length)];
}
