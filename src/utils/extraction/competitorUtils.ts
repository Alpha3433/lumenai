
// Helper functions for extracting and processing competitor information

export type Competitor = {
  name: string;
  marketShare: string;
  founded: number;
  annualRevenue: string;
  strength: string;
  weakness: string;
  threatScore?: number;
  logo?: string;
  pricingModel?: string;
};

/**
 * Generate a strength description for a competitor based on industry context
 */
function getRandomStrength(industryContext: string, companyName: string): string {
  const strengths = [
    "Strong user base",
    "Intuitive user interface",
    "Advanced technology",
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
  
  // Industry-specific strengths
  if (industryContext.includes('dating') || industryContext.includes('social')) {
    strengths.push(
      "Advanced matching system",
      "Large active user base",
      "Strong community features",
      "Event-based connections",
      "High user engagement",
      "Personality-based matching"
    );
  } else if (industryContext.includes('food') || industryContext.includes('restaurant')) {
    strengths.push(
      "Fast delivery times",
      "Wide restaurant selection",
      "Competitive pricing",
      "Quality ingredients",
      "Excellent customer satisfaction",
      "Innovative menu options"
    );
  } else if (industryContext.includes('fitness') || industryContext.includes('health')) {
    strengths.push(
      "Personalized workout plans",
      "Expert nutritional guidance",
      "Progress tracking features",
      "Motivational community",
      "High-quality equipment",
      "Certified trainers"
    );
  }
  
  return strengths[Math.floor(Math.random() * strengths.length)];
}

/**
 * Generate a weakness description for a competitor based on industry context
 */
function getRandomWeakness(industryContext: string, companyName: string): string {
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
  
  // Industry-specific weaknesses
  if (industryContext.includes('dating') || industryContext.includes('social')) {
    weaknesses.push(
      "Not event-focused",
      "Generic matching criteria",
      "Limited social features",
      "Lack of specialized focus",
      "Too many fake profiles",
      "Poor retention strategies"
    );
  } else if (industryContext.includes('food') || industryContext.includes('restaurant')) {
    weaknesses.push(
      "Long delivery times",
      "Limited geographic coverage",
      "High delivery fees",
      "Inconsistent food quality",
      "Limited menu options",
      "Poor customer service"
    );
  } else if (industryContext.includes('fitness') || industryContext.includes('health')) {
    weaknesses.push(
      "Limited workout variety",
      "Complicated interface",
      "High monthly fees",
      "Poor integration with devices",
      "Limited personalization",
      "Insufficient guidance"
    );
  }
  
  return weaknesses[Math.floor(Math.random() * weaknesses.length)];
}

/**
 * Identify industry-specific competitors based on the business context
 */
function getIndustryCompetitors(businessContext: string): string[] {
  if (businessContext.includes('dating') || businessContext.includes('social') || 
      businessContext.includes('event') || businessContext.includes('festival') || 
      businessContext.includes('rave') || businessContext.includes('music') ||
      businessContext.includes('parties') || businessContext.includes('nightlife')) {
    return [
      "Tinder", "Bumble", "Hinge", "Feeld", "OkCupid", "Eventbrite", "Match.com", "Meetup",
      "Thursday", "Raya", "EDM Date", "Festival Connect", "Radiate", "Concert Buddy"
    ];
  } 
  else if (businessContext.includes('fitness') || businessContext.includes('health') || 
          businessContext.includes('wellness') || businessContext.includes('workout') ||
          businessContext.includes('gym') || businessContext.includes('exercise')) {
    return [
      "Peloton", "MyFitnessPal", "Fitbit", "Strava", "Nike Training Club", "Calm", "Headspace",
      "ClassPass", "Noom", "WW", "Life Time Fitness", "Planet Fitness", "Equinox"
    ];
  } 
  else if (businessContext.includes('food') || businessContext.includes('restaurant') || 
          businessContext.includes('delivery') || businessContext.includes('grocery') ||
          businessContext.includes('meal') || businessContext.includes('cooking')) {
    return [
      "Uber Eats", "DoorDash", "Grubhub", "Instacart", "Deliveroo", "HelloFresh", "Blue Apron",
      "Postmates", "Seamless", "GoPuff", "ChowNow", "Whole Foods", "Sprouts", "Trader Joe's"
    ];
  } 
  else if (businessContext.includes('finance') || businessContext.includes('banking') || 
          businessContext.includes('investment') || businessContext.includes('fintech') ||
          businessContext.includes('payment') || businessContext.includes('loan')) {
    return [
      "Robinhood", "Acorns", "Wealthfront", "Betterment", "Mint", "Personal Capital", "SoFi",
      "Chime", "Venmo", "Cash App", "PayPal", "Plaid", "Stripe", "Square"
    ];
  } 
  else if (businessContext.includes('education') || businessContext.includes('learning') || 
          businessContext.includes('teaching') || businessContext.includes('school') ||
          businessContext.includes('training') || businessContext.includes('course')) {
    return [
      "Coursera", "Udemy", "edX", "Khan Academy", "Duolingo", "Chegg", "Skillshare",
      "Brilliant", "MasterClass", "Codecademy", "Quizlet", "LinkedIn Learning", "Pluralsight"
    ];
  }
  else if (businessContext.includes('travel') || businessContext.includes('vacation') || 
          businessContext.includes('tourism') || businessContext.includes('hotel') ||
          businessContext.includes('booking') || businessContext.includes('trip')) {
    return [
      "Airbnb", "Booking.com", "Expedia", "TripAdvisor", "Hotels.com", "Kayak", "Hopper",
      "Vrbo", "Priceline", "Skyscanner", "Google Flights", "Marriott", "Hilton"
    ];
  }
  else if (businessContext.includes('real estate') || businessContext.includes('property') || 
          businessContext.includes('home') || businessContext.includes('housing') ||
          businessContext.includes('apartment') || businessContext.includes('rental')) {
    return [
      "Zillow", "Redfin", "Trulia", "Realtor.com", "Compass", "Century 21", "RE/MAX",
      "Apartments.com", "Keller Williams", "CoStar", "LoopNet", "Opendoor"
    ];
  }
  else if (businessContext.includes('ecommerce') || businessContext.includes('retail') || 
          businessContext.includes('shopping') || businessContext.includes('store') ||
          businessContext.includes('marketplace')) {
    return [
      "Amazon", "Shopify", "Walmart", "eBay", "Etsy", "Target", "Wayfair",
      "Best Buy", "Alibaba", "ASOS", "Chewy", "Home Depot", "Lowe's"
    ];
  }
  else if (businessContext.includes('software') || businessContext.includes('saas') || 
          businessContext.includes('tech') || businessContext.includes('app') ||
          businessContext.includes('platform') || businessContext.includes('it')) {
    return [
      "Microsoft", "Google", "Salesforce", "Adobe", "Oracle", "SAP", "Slack",
      "Zoom", "Atlassian", "Dropbox", "HubSpot", "ServiceNow", "Workday"
    ];
  }
  
  return [];
}

/**
 * Create default competitors based on industry context when none are found
 */
function createDefaultCompetitors(businessContext: string): Competitor[] {
  let industryPrefix = "Industry";
  
  if (businessContext.includes('tech') || businessContext.includes('software') || businessContext.includes('app')) {
    industryPrefix = "Tech";
  } else if (businessContext.includes('food') || businessContext.includes('restaurant')) {
    industryPrefix = "Food";
  } else if (businessContext.includes('health') || businessContext.includes('fitness')) {
    industryPrefix = "Health";
  } else if (businessContext.includes('finance') || businessContext.includes('banking')) {
    industryPrefix = "Finance";
  } else if (businessContext.includes('education') || businessContext.includes('learning')) {
    industryPrefix = "Education";
  } else if (businessContext.includes('travel') || businessContext.includes('tourism')) {
    industryPrefix = "Travel";
  }
  
  return [
    { 
      name: `${industryPrefix}Leader`, 
      marketShare: "32%", 
      founded: 2005, 
      annualRevenue: "$85M", 
      strength: "Strong market presence", 
      weakness: "Limited innovation" 
    },
    { 
      name: `${industryPrefix}Innovator`, 
      marketShare: "24%", 
      founded: 2012, 
      annualRevenue: "$42M", 
      strength: "Cutting-edge features", 
      weakness: "Higher price point" 
    },
    { 
      name: `${industryPrefix}Focus`, 
      marketShare: "18%", 
      founded: 2015, 
      annualRevenue: "$28M", 
      strength: "Superior customer service", 
      weakness: "Smaller market reach" 
    }
  ];
}

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
