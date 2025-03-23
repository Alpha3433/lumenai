
/**
 * Helper functions for generating competitor strengths and weaknesses
 */

/**
 * Generate a strength description for a competitor based on industry context
 */
export function getRandomStrength(industryContext: string, companyName: string): string {
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
export function getRandomWeakness(industryContext: string, companyName: string): string {
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
