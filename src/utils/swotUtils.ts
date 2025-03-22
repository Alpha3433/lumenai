
export interface SwotComponents {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export const extractSwotComponents = (text: string): SwotComponents => {
  const components: SwotComponents = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };

  // Extract each section and its bullet points
  const strengthsMatch = text.match(/\*\*Strengths\*\*([\s\S]*?)(?=\*\*Weaknesses|\*\*Opportunities|\*\*Threats|$)/i);
  const weaknessesMatch = text.match(/\*\*Weaknesses\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Opportunities|\*\*Threats|$)/i);
  const opportunitiesMatch = text.match(/\*\*Opportunities\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Weaknesses|\*\*Threats|$)/i);
  const threatsMatch = text.match(/\*\*Threats\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Weaknesses|\*\*Opportunities|$)/i);
  
  if (strengthsMatch && strengthsMatch[1]) components.strengths = extractBulletPoints(strengthsMatch[1]);
  if (weaknessesMatch && weaknessesMatch[1]) components.weaknesses = extractBulletPoints(weaknessesMatch[1]);
  if (opportunitiesMatch && opportunitiesMatch[1]) components.opportunities = extractBulletPoints(opportunitiesMatch[1]);
  if (threatsMatch && threatsMatch[1]) components.threats = extractBulletPoints(threatsMatch[1]);
  
  // Ensure we have exactly 4 items per category (or fewer if not enough were found)
  Object.keys(components).forEach(key => {
    const typedKey = key as keyof SwotComponents;
    components[typedKey] = components[typedKey].slice(0, 4);
  });
  
  return components;
};

export const extractBulletPoints = (text: string): string[] => {
  // Better handling of bullet points to avoid breaking a point into multiple items
  // First try to extract bullet points marked with • 
  let points = text.split(/\n\s*•\s*/)
    .map(point => point.trim())
    .filter(point => point.length > 0);
  
  // If that doesn't work well, try other common bullet point markers
  if (points.length <= 1) {
    points = text.split(/\n\s*-\s*|\n\s*\d+\.\s*/)
      .map(point => point.trim())
      .filter(point => point.length > 0);
  }
  
  // If still no luck, just treat each line as a point
  if (points.length <= 1) {
    points = text.split(/\n+/)
      .map(point => point.trim())
      .filter(point => point.length > 0);
  }
  
  // If there's still just one big block, try to split on sentences
  if (points.length <= 1 && points[0]?.length > 100) {
    points = points[0].split(/\.\s+/)
      .map(point => point.trim() + '.')
      .filter(point => point.length > 2); // Avoid empty points
  }
  
  return points;
};
