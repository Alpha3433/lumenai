
import { ForcesLevel } from './types';

// Function to determine threat level based on text content
export const determineThreatLevel = (text: string): ForcesLevel => {
  const lowerText = text.toLowerCase();
  
  // Look for explicit level indicators like "HIGH", "MEDIUM", "LOW"
  if (/high[:\.]|strong|significant|substantial|intense|considerable/i.test(lowerText)) return 'High';
  if (/medium[:\.]|moderate|average|balanced|fair/i.test(lowerText)) return 'Medium';
  if (/low[:\.]|minimal|limited|negligible|small|weak/i.test(lowerText)) return 'Low';
  
  // Count instances of high, medium, low in the text (fallback)
  const highCount = (lowerText.match(/high|strong|significant|substantial|intense|considerable/g) || []).length;
  const mediumCount = (lowerText.match(/medium|moderate|average|balanced|fair/g) || []).length;
  const lowCount = (lowerText.match(/low|minimal|limited|negligible|small|weak/g) || []).length;
  
  // Determine level based on counts
  if (highCount > lowCount && highCount > mediumCount) return 'High';
  if (lowCount > highCount && lowCount > mediumCount) return 'Low';
  return 'Medium';
};

export const getLevelColor = (level: ForcesLevel): string => {
  const colors = {
    'Low': 'green',
    'Medium': 'orange',
    'High': 'red'
  };
  
  return colors[level];
};
