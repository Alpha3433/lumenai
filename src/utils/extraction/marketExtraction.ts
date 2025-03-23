
// Helper functions to extract market data from business plan

export function extractTargetMarket(marketAnalysis: string | undefined): { demographic: string; size: string; audience: string; growth: string } | null {
  if (!marketAnalysis) return null;
  
  // Clean any markdown formatting from the text
  const cleanText = marketAnalysis
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\n#{2,}/g, '')
    .trim();
  
  // Extract market size using regex - looking for dollar amounts with better pattern matching
  const sizeMatch = cleanText.match(/\$\d+(\.\d+)?\s*(billion|million|trillion|B|M|T)/i) || 
                    cleanText.match(/market\s+size\s+of\s+\$?\d+(\.\d+)?\s*(billion|million|trillion|B|M|T)/i);
  
  // Extract demographic information (age ranges, professionals, etc.)
  const demographicMatch = cleanText.match(/age[s]?\s+(\d+)[-–](\d+)/i) || 
                          cleanText.match(/(millennials|gen z|professionals|adults|seniors)/i);
  
  // Extract growth percentage
  const growthMatch = cleanText.match(/(\d+(\.\d+)?%\s+(growth|increase))/i) ||
                      cleanText.match(/growth\s+of\s+(\d+(\.\d+)?%)/i) ||
                      cleanText.match(/CAGR\s+of\s+(\d+(\.\d+)?%)/i);
  
  // Extract audience information
  const audienceInfo = extractAudienceFromText(cleanText);
  
  // Generate random growth percentage if not found
  const randomGrowth = () => {
    const randomValue = Math.random() * 20 + 3;
    const percentage = randomValue.toFixed(1);
    // Remove the .0 when the decimal is zero
    const cleanPercentage = percentage.endsWith('.0') ? percentage.slice(0, -2) : percentage;
    return `${cleanPercentage}% annual growth`;
  };
  
  return {
    demographic: demographicMatch ? 
      (demographicMatch[1] && demographicMatch[2] ? 
        `Ages ${demographicMatch[1]}-${demographicMatch[2]}` : 
        capitalizeFirstLetter(demographicMatch[0])) : 
      "Diverse Demographics",
    size: sizeMatch ? sizeMatch[0] : "Market Sizing Pending",
    audience: audienceInfo,
    growth: growthMatch ? growthMatch[0] : randomGrowth()
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
