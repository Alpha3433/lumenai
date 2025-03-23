
// Helper functions to extract SWOT data from business plan

export function extractStrengths(swotAnalysis: string | undefined): string[] {
  if (!swotAnalysis) return [];
  
  // Extract strengths section with improved pattern matching
  const strengthsSection = swotAnalysis.match(/\*\*Strengths\*\*\s*([\s\S]*?)(?=\*\*Weaknesses\*\*)/i) ||
                          swotAnalysis.match(/Strengths[\s\n]*:?\s*([\s\S]*?)(?=Weaknesses)/i);
  
  if (strengthsSection) {
    // Extract bullet points with better regex
    let bulletPoints = strengthsSection[1].match(/[•\-\*]\s*([^\n•\-\*]+)/g) ||
                       strengthsSection[1].match(/\d+\.\s*([^\n]+)/g) ||
                       strengthsSection[1].split('\n').filter(line => line.trim().length > 0);
    
    if (bulletPoints) {
      // Clean up bullet points
      let cleanedPoints = bulletPoints.map(point => point.replace(/^[•\-\*\d\.]\s*/, '').trim()).filter(point => point.length > 0);
      
      // Check for fragments (sentences that might have been split across points)
      let mergedPoints: string[] = [];
      let currentPoint = '';
      
      cleanedPoints.forEach((point, i) => {
        // If current point starts with lowercase and doesn't follow a sentence-ending point
        // or if the next point starts with lowercase, these might be fragments of one point
        const startsWithLowercase = /^[a-z]/.test(point);
        const endsWithoutPunctuation = !point.match(/[.!?]$/);
        
        if (startsWithLowercase && currentPoint) {
          // This is likely a continuation of the previous point
          currentPoint += ' ' + point;
        } else if (endsWithoutPunctuation && i < cleanedPoints.length - 1 && /^[a-z]/.test(cleanedPoints[i+1])) {
          // This point likely continues in the next point
          currentPoint = currentPoint ? currentPoint + ' ' + point : point;
        } else {
          // This is a complete point or the last fragment
          if (currentPoint) {
            currentPoint += ' ' + point;
            mergedPoints.push(currentPoint);
            currentPoint = '';
          } else {
            mergedPoints.push(point);
          }
        }
      });
      
      // If we have a leftover current point, add it
      if (currentPoint) {
        mergedPoints.push(currentPoint);
      }
      
      return mergedPoints.filter(point => point.length > 0);
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
    let bulletPoints = opportunitiesSection[1].match(/[•\-\*]\s*([^\n•\-\*]+)/g) ||
                       opportunitiesSection[1].match(/\d+\.\s*([^\n]+)/g) ||
                       opportunitiesSection[1].split('\n').filter(line => line.trim().length > 0);
    
    if (bulletPoints) {
      // Clean up bullet points
      let cleanedPoints = bulletPoints.map(point => point.replace(/^[•\-\*\d\.]\s*/, '').trim()).filter(point => point.length > 0);
      
      // Check for fragments (sentences that might have been split across points)
      let mergedPoints: string[] = [];
      let currentPoint = '';
      
      cleanedPoints.forEach((point, i) => {
        // If current point starts with lowercase and doesn't follow a sentence-ending point
        // or if the next point starts with lowercase, these might be fragments of one point
        const startsWithLowercase = /^[a-z]/.test(point);
        const endsWithoutPunctuation = !point.match(/[.!?]$/);
        
        if (startsWithLowercase && currentPoint) {
          // This is likely a continuation of the previous point
          currentPoint += ' ' + point;
        } else if (endsWithoutPunctuation && i < cleanedPoints.length - 1 && /^[a-z]/.test(cleanedPoints[i+1])) {
          // This point likely continues in the next point
          currentPoint = currentPoint ? currentPoint + ' ' + point : point;
        } else {
          // This is a complete point or the last fragment
          if (currentPoint) {
            currentPoint += ' ' + point;
            mergedPoints.push(currentPoint);
            currentPoint = '';
          } else {
            mergedPoints.push(point);
          }
        }
      });
      
      // If we have a leftover current point, add it
      if (currentPoint) {
        mergedPoints.push(currentPoint);
      }
      
      return mergedPoints.filter(point => point.length > 0);
    }
  }
  
  return [];
}
