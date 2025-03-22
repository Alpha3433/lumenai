
// Helper functions to extract SWOT data from business plan

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
