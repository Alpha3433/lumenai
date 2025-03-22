
// Helper functions to extract data from the business plan
export function extractTargetMarket(marketAnalysis: string | undefined): { demographic: string; size: string; audience: string; growth: string } | null {
  if (!marketAnalysis) return null;
  
  // Extract market size using regex - looking for dollar amounts
  const sizeMatch = marketAnalysis.match(/\$\d+(\.\d+)?\s*(billion|million|trillion)/i);
  const demographicMatch = marketAnalysis.match(/age[s]?\s+(\d+)[-–](\d+)/i);
  const growthMatch = marketAnalysis.match(/(\d+(\.\d+)?%\s+(growth|increase))/i);
  
  return {
    demographic: demographicMatch ? `Ages ${demographicMatch[1]}-${demographicMatch[2]}` : "Diverse Demographics",
    size: sizeMatch ? sizeMatch[0] : "Market Sizing Pending",
    audience: extractAudienceFromText(marketAnalysis),
    growth: growthMatch ? growthMatch[0] : "Growth Analysis Pending"
  };
}

function extractAudienceFromText(text: string): string {
  // Look for specific demographic/audience descriptions
  if (text.includes("millennials")) return "Millennials & Young Professionals";
  if (text.includes("Gen Z")) return "Gen Z Consumers";
  if (text.includes("professionals")) return "Working Professionals";
  if (text.includes("small business")) return "Small Business Owners";
  if (text.includes("enterprise")) return "Enterprise Organizations";
  
  return "Diverse Customer Segments";
}

export function extractRevenue(financialText: string | undefined): { year1: string; year3: string } | null {
  if (!financialText) return null;
  
  // Look for Year 1 revenue projections
  const year1Match = financialText?.match(/Year 1.*?\$(\d+[,\d]*(\.\d+)?)/i);
  const year3Match = financialText?.match(/Year 3.*?\$(\d+[,\d]*(\.\d+)?)/i);
  
  return {
    year1: year1Match ? `$${year1Match[1]}` : "Revenue Projections Pending",
    year3: year3Match ? `$${year3Match[1]}` : "3-Year Projection Pending"
  };
}

export function extractStrengths(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract strengths section
  const strengthsSection = swotAnalysis.match(/\*\*Strengths\*\*\s*([\s\S]*?)(?=\*\*Weaknesses\*\*)/i);
  
  if (strengthsSection) {
    // Extract bullet points
    const bulletPoints = strengthsSection[1].match(/•\s*([^\n•]+)/g);
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/•\s*/, '').trim());
    }
  }
  
  return [];
}

export function extractOpportunities(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract opportunities section
  const opportunitiesSection = swotAnalysis.match(/\*\*Opportunities\*\*\s*([\s\S]*?)(?=\*\*Threats\*\*)/i);
  
  if (opportunitiesSection) {
    // Extract bullet points
    const bulletPoints = opportunitiesSection[1].match(/•\s*([^\n•]+)/g);
    if (bulletPoints) {
      return bulletPoints.map(point => point.replace(/•\s*/, '').trim());
    }
  }
  
  return [];
}
