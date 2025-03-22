
// Format validation text for better readability
export function formatValidationText(text: string): { headings: string[], points: string[][] } {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const result: { headings: string[], points: string[][] } = { headings: [], points: [] };
  let currentHeadingIndex = -1;
  let currentPoints: string[] = [];

  // Look for special pattern with scores like "**1. Overall viability score: 70/100**"
  const scoreRegex = /\*\*\d+\.\s+(.*?):\s+(\d+)\/100\*\*/;
  const sectionRegex = /^#+\s+(.*?)$|^##\s+(.*?)$/;
  const keyPointsRegex = /^##\s+(Key\s+Strengths|Key\s+Challenges|Recommendations)\s*$/i;

  lines.forEach(line => {
    // Check if line contains a score pattern like "**1. Overall viability score: 70/100**"
    if (line.match(scoreRegex)) {
      // If we already have points for a previous heading, add them
      if (currentHeadingIndex >= 0 && currentPoints.length > 0) {
        result.points[currentHeadingIndex] = [...currentPoints];
      }
      
      // Add new heading with score
      result.headings.push(line.replace(/\*\*/g, '').trim());
      currentHeadingIndex++;
      currentPoints = [];
    } 
    // Check for section headings like "## Key Strengths"
    else if (line.match(keyPointsRegex) || line.toLowerCase().includes('key strengths') || 
             line.toLowerCase().includes('key challenges') || 
             line.toLowerCase().includes('recommendations')) {
      if (currentHeadingIndex >= 0 && currentPoints.length > 0) {
        result.points[currentHeadingIndex] = [...currentPoints];
      }
      
      // Clean up the heading text
      const cleanHeading = line.replace(/^#+\s+/, '').replace(/\*\*/g, '').trim();
      result.headings.push(cleanHeading);
      currentHeadingIndex++;
      currentPoints = [];
    }
    // Handle bullet points or numbered lists
    else if (line.trim().match(/^[-•*]|\d+\./) || line.trim().startsWith('-')) {
      const cleanPoint = line.trim().replace(/^[-•*]\s*|\d+\.\s*/, '');
      if (cleanPoint) {
        currentPoints.push(cleanPoint);
      }
    }
    // Add non-empty line as a point if it's not a heading
    else if (line.trim() && !line.match(sectionRegex)) {
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
