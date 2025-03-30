
// Helper function to extract sections from marketing plan text
export const extractSections = (text: string) => {
  const sections: Record<string, string[]> = {
    'audience': [],
    'positioning': [],
    'channels': [],
    'promotional': [],
    'acquisition': [],
    'general': []
  };
  
  let currentSection = 'general';
  
  // Split by paragraphs
  const paragraphs = text.split('\n\n');
  
  paragraphs.forEach(paragraph => {
    // Check for section headers
    if (paragraph.toLowerCase().includes('target audience') || paragraph.toLowerCase().includes('segmentation')) {
      currentSection = 'audience';
    } else if (paragraph.toLowerCase().includes('positioning')) {
      currentSection = 'positioning';
    } else if (paragraph.toLowerCase().includes('marketing channels') || paragraph.toLowerCase().includes('channels')) {
      currentSection = 'channels';
    } else if (paragraph.toLowerCase().includes('promotional') || paragraph.toLowerCase().includes('promotion')) {
      currentSection = 'promotional';
    } else if (paragraph.toLowerCase().includes('customer acquisition') || paragraph.toLowerCase().includes('acquisition')) {
      currentSection = 'acquisition';
    }
    
    // Add paragraph to current section
    if (paragraph.trim()) {
      sections[currentSection].push(paragraph);
    }
  });
  
  return sections;
};

// Extract bullet points from text
export const extractBulletPoints = (text: string) => {
  const bulletPoints: string[] = [];
  
  // Common bullet point patterns
  const bulletPatterns = [
    /^\s*[-•*]\s+(.+)$/gm,      // Matches - • * bullet points
    /^\s*\d+\.\s+(.+)$/gm,      // Matches numbered lists like 1. 2. etc.
    /^[A-Z][^.]+:(.+)$/gm       // Matches Category: text pattern
  ];
  
  bulletPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        bulletPoints.push(match[1].trim());
      } else if (match[0]) {
        bulletPoints.push(match[0].trim());
      }
    }
  });
  
  // If no bullet points found, split by sentences
  if (bulletPoints.length === 0 && text.trim()) {
    const sentences = text.split(/\.\s+/);
    return sentences.filter(s => s.trim().length > 10).map(s => s.trim() + (s.endsWith('.') ? '' : '.'));
  }
  
  return bulletPoints.length > 0 ? bulletPoints : [text];
};
