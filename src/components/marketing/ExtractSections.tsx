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
  
  const paragraphs = text.split('\n\n').map(p => 
    p.replace(/\*\*.*?\*\*/g, '')     // Remove ** markers
     .replace(/Segment \d+:?\s*/gi, '') // Remove segment headers
     .replace(/Psychographic:\s*/g, '')  // Remove psychographic label
     .replace(/Positioning Statement:\s*/g, '') // Remove positioning statement label
     .replace(/Differentiation:\s*/g, '') // Remove differentiation label
     .replace(/Unique Value Proposition:\s*/g, '') // Remove UVP label
     .replace(/Social Media [aA]dvertising:\s*/g, '') // Remove social media advertising label
     .replace(/Content Marketing:\s*/g, '') // Remove content marketing label
     .replace(/Community Events:\s*/g, '') // Remove community events label
     .replace(/Email Marketing:\s*/g, '') // Remove email marketing label
     .replace(/Partnerships[^:]*:\s*/g, '') // Remove partnerships label
     .replace(/Targeted[^:]*:\s*/g, '') // Remove targeted advertising label
     .trim()
  );
  
  paragraphs.forEach(paragraph => {
    // Check for section content without relying on headers
    if (paragraph.toLowerCase().includes('target') || paragraph.toLowerCase().includes('audience') || paragraph.toLowerCase().includes('demographic')) {
      currentSection = 'audience';
    } else if (paragraph.toLowerCase().includes('position') || paragraph.toLowerCase().includes('different') || paragraph.toLowerCase().includes('value prop')) {
      currentSection = 'positioning';
    } else if (paragraph.toLowerCase().includes('channel') || paragraph.toLowerCase().includes('platform') || paragraph.toLowerCase().includes('media')) {
      currentSection = 'channels';
    } else if (paragraph.toLowerCase().includes('promot') || paragraph.toLowerCase().includes('campaign') || paragraph.toLowerCase().includes('event')) {
      currentSection = 'promotional';
    } else if (paragraph.toLowerCase().includes('acquisition') || paragraph.toLowerCase().includes('convert') || paragraph.toLowerCase().includes('customer')) {
      currentSection = 'acquisition';
    }
    
    // Add cleaned paragraph to current section if it's not empty
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
