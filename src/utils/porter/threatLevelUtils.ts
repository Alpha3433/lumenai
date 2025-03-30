
import { ForcesLevel } from './types';

// Function to determine threat level based on text content
export const determineThreatLevel = (text: string): ForcesLevel => {
  const lowerText = text.toLowerCase();
  
  // First look for explicit level indicators with direct markers
  if (/\bhigh\b[\s:\.]+threat|\bhigh\b[\s:\.]+power|\bhigh\b[\s:\.]+rivalry/i.test(lowerText)) return 'High';
  if (/\bmedium\b[\s:\.]+threat|\bmoderate\b[\s:\.]+threat|\bmedium\b[\s:\.]+power|\bmoderate\b[\s:\.]+power|\bmedium\b[\s:\.]+rivalry|\bmoderate\b[\s:\.]+rivalry/i.test(lowerText)) return 'Medium';
  if (/\blow\b[\s:\.]+threat|\blow\b[\s:\.]+power|\blow\b[\s:\.]+rivalry/i.test(lowerText)) return 'Low';
  
  // Look for explicit markers that might appear at the beginning of sections
  if (/\b(high|strong|significant|substantial|intense|considerable|severe)[\s:\.]+/i.test(lowerText)) return 'High';
  if (/\b(medium|moderate|average|balanced|fair)[\s:\.]+/i.test(lowerText)) return 'Medium';
  if (/\b(low|minimal|limited|negligible|small|weak|minor)[\s:\.]+/i.test(lowerText)) return 'Low';
  
  // Count instances of high, medium, low intensity indicators in the text
  const highIndicators = [
    'high', 'strong', 'significant', 'substantial', 'intense', 'considerable', 'severe',
    'major', 'critical', 'important', 'heavily', 'greatly', 'extremely', 'very', 
    'extensive', 'dominant', 'powerful'
  ];
  
  const mediumIndicators = [
    'medium', 'moderate', 'average', 'balanced', 'fair', 'reasonable',
    'somewhat', 'partially', 'moderately', 'midrange', 'intermediate'
  ];
  
  const lowIndicators = [
    'low', 'minimal', 'limited', 'negligible', 'small', 'weak', 'minor',
    'slight', 'marginal', 'insignificant', 'trivial', 'modest', 'little'
  ];
  
  // Count the indicators
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  
  // Check for high indicators
  highIndicators.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) highCount += matches.length;
  });
  
  // Check for medium indicators
  mediumIndicators.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) mediumCount += matches.length;
  });
  
  // Check for low indicators
  lowIndicators.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) lowCount += matches.length;
  });
  
  // Determine level based on counts
  if (highCount > lowCount && highCount > mediumCount) return 'High';
  if (lowCount > highCount && lowCount > mediumCount) return 'Low';
  
  // Look for negations that might reverse the meaning
  if (/not (high|strong|significant|substantial)/i.test(lowerText)) {
    return 'Medium'; // If something is "not high", it's probably medium
  }
  
  // Default to Medium if no clear indicators or if tied
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
