
// Format validation text for better readability
export function formatValidationText(text: string): { headings: string[], points: string[][] } {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const result: { headings: string[], points: string[][] } = { headings: [], points: [] };
  let currentHeadingIndex = -1;
  let currentPoints: string[] = [];

  lines.forEach(line => {
    // Check if line contains a heading pattern like "**3. Profitability Potential: 70/100**"
    if (line.includes('**') && line.trim().startsWith('**') && line.trim().endsWith('**')) {
      // If we already have points for a previous heading, add them
      if (currentHeadingIndex >= 0 && currentPoints.length > 0) {
        result.points[currentHeadingIndex] = [...currentPoints];
      }
      
      // Add new heading
      result.headings.push(line.replace(/\*\*/g, '').trim());
      currentHeadingIndex++;
      currentPoints = [];
    } 
    // Check for key sections like "Key strengths", "Key challenges", "Recommendations"
    else if (line.toLowerCase().includes('key strengths') || 
             line.toLowerCase().includes('key challenges') || 
             line.toLowerCase().includes('recommendations')) {
      if (currentHeadingIndex >= 0 && currentPoints.length > 0) {
        result.points[currentHeadingIndex] = [...currentPoints];
      }
      
      result.headings.push(line.trim());
      currentHeadingIndex++;
      currentPoints = [];
    }
    // Handle bullet points or numbered lists
    else if (line.trim().match(/^[-•*]|\d+\./) || line.trim().startsWith('-')) {
      currentPoints.push(line.trim().replace(/^[-•*]\s*|\d+\.\s*/, ''));
    }
    // Add non-empty line as a point
    else if (line.trim()) {
      currentPoints.push(line.trim());
    }
  });

  // Add any remaining points
  if (currentHeadingIndex >= 0 && currentPoints.length > 0) {
    result.points[currentHeadingIndex] = [...currentPoints];
  }

  return result;
}

// Helper functions for score-related UI
export const getScoreBadge = (score: number): string => {
  if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  if (score >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
};

export const getRecommendation = (score: number): string => {
  if (score >= 80) return "This business idea shows strong potential for success.";
  if (score >= 60) return "This business idea has merit but requires refinement.";
  return "This business concept needs significant rethinking before proceeding.";
};
