
// Extracts bullet points from text sections
export const extractBulletPoints = (text: string): string[] => {
  // First, remove any titles or headers that contain the force name
  const cleanedText = text.replace(/#+\s*(?:competitive rivalry|threat of (?:new )?(?:entrants|entry|substitution)|bargaining power of (?:suppliers|buyers)|supplier power|buyer power)[^\n]*/gi, '');
  
  // Clean up any "HIGH", "MEDIUM", "LOW" markers at the beginning of the text
  const furtherCleanedText = cleanedText.replace(/^\s*(?:high|medium|low)[:\.\s]*/gi, '');
  
  // If text already has bullet points (•, -, *, etc.)
  if (/[•\-\*]\s+/.test(furtherCleanedText)) {
    return furtherCleanedText
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => /^[•\-\*]\s+/.test(line))
      .map(line => line.replace(/^[•\-\*]\s+/, ''))
      .filter(line => line.length > 0);
  }
  
  // If no bullet points, split by sentences and take up to 4
  const sentences = furtherCleanedText
    .split(/\.(?:\s+|\n)/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && !s.includes('Porter') && !s.includes('Five Forces'));
  
  return sentences.slice(0, 4).map(s => s.endsWith('.') ? s : `${s}.`);
};
