
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
  // Extract bullet points, removing any empty items
  const points = text.split(/•|-|\d+\./)
    .map(point => point.trim())
    .filter(point => point.length > 0);
  return points;
};
