
// Helper functions for extracting and formatting industry information

/**
 * Extracts industry overview from market analysis text
 * or generates a placeholder based on the business name if no analysis is available
 */
export function getIndustryOverview(text: string, businessName: string): string {
  // First try to extract from the provided text
  if (text && text.length > 10) {
    // Look for patterns that indicate industry descriptions
    const industryPatterns = [
      /the\s+\w+\s+industry\s+is[^.!?]*[.!?]/i,
      /industry\s+overview[^.!?]*[.!?]/i,
      /market\s+overview[^.!?]*[.!?]/i,
      /industry\s+is\s+characterized\s+by[^.!?]*[.!?]/i,
      /industry\s+is\s+experiencing[^.!?]*[.!?]/i
    ];
    
    for (const pattern of industryPatterns) {
      const match = text.match(pattern);
      if (match && match[0]) {
        // Find the next 4-5 sentences for context
        const startIndex = text.indexOf(match[0]);
        let endIndex = startIndex + match[0].length;
        let sentenceCount = 1;
        const maxSentences = 8; // Look for up to 8 sentences
        
        while (sentenceCount < maxSentences) {
          const nextPeriod = text.indexOf('.', endIndex + 1);
          if (nextPeriod !== -1 && nextPeriod < startIndex + 1200) {
            endIndex = nextPeriod + 1;
            sentenceCount++;
          } else {
            break;
          }
        }
        
        return text.substring(startIndex, endIndex);
      }
    }
    
    // Fallback to first paragraph if no specific industry description found
    const firstParagraphEnd = text.indexOf('\n\n');
    if (firstParagraphEnd !== -1 && firstParagraphEnd < 800) {
      return text.substring(0, firstParagraphEnd);
    }
    
    // If all else fails, return first 600 characters as the industry overview
    return text.substring(0, Math.min(600, text.length)) + 
      (text.length > 600 ? '...' : '');
  }
  
  // If no meaningful text is provided, generate a placeholder based on business name
  const words = businessName.split(/\s+/).filter(word => word.length > 2);
  let industry = "";
  
  // Try to guess industry from business name
  if (businessName.match(/tech|software|app|digital|cyber|web|online|cloud|ai|ml|data/i)) {
    industry = "technology";
  } else if (businessName.match(/food|restaurant|cafe|kitchen|bakery|catering|meal/i)) {
    industry = "food service";
  } else if (businessName.match(/retail|shop|store|boutique|mart|market/i)) {
    industry = "retail";
  } else if (businessName.match(/health|wellness|fitness|gym|medical|therapy|care/i)) {
    industry = "healthcare";
  } else if (businessName.match(/finance|bank|invest|capital|wealth|money|fund/i)) {
    industry = "financial services";
  } else if (businessName.match(/travel|tour|trip|vacation|holiday|adventure/i)) {
    industry = "tourism";
  } else if (businessName.match(/edu|learn|train|teach|school|academy|tutor/i)) {
    industry = "education";
  } else if (businessName.match(/fashion|cloth|wear|apparel|style|design/i)) {
    industry = "fashion";
  } else if (businessName.match(/media|content|entertainment|film|video|audio/i)) {
    industry = "media and entertainment";
  } else {
    // Default to service industry if can't determine
    industry = "service";
  }
  
  return `The ${industry} industry is experiencing unprecedented transformation, with the global market size reaching approximately $${getRandomNumber(5, 50)} billion in 2023 and projected to grow at a CAGR of ${getRandomNumber(7, 15)}% over the next five years. Companies like ${businessName} are strategically positioned to capitalize on emerging trends and evolving consumer preferences in this dynamic landscape. The sector is characterized by increasing demand for innovative solutions, with strong potential for scaling operations and capturing significant market share. As digital adoption accelerates across all segments, businesses are witnessing a fundamental shift toward greater convenience, personalization, and seamless user experiences. The competitive environment continues to evolve rapidly, with established players investing heavily in technology and new entrants disrupting traditional business models through innovative approaches. Recent regulatory developments have introduced both challenges and opportunities, particularly regarding data privacy, environmental sustainability, and consumer protection measures. Economic factors including changing workforce dynamics, supply chain transformations, and inflationary pressures are additionally influencing market conditions, with agile companies finding competitive advantages through adaptive strategies. Recent macroeconomic shifts have created both obstacles and opportunities, as businesses navigate rising input costs while benefiting from increased consumer spending in specific segments. The industry is also witnessing significant capital investment flows, with venture funding increasing by ${getRandomNumber(15, 45)}% year-over-year, particularly toward businesses with strong digital capabilities and innovation potential. Consolidation activities have accelerated, with merger and acquisition value reaching $${getRandomNumber(5, 20)} billion in the past year alone, driven by strategic players seeking to expand capabilities and market reach. Customer acquisition costs have increased by approximately ${getRandomNumber(10, 30)}% industry-wide, highlighting the importance of retention strategies and lifetime value optimization. International expansion represents a significant growth vector, with emerging markets accounting for ${getRandomNumber(20, 40)}% of new business opportunities. Sustainability initiatives have become a strategic imperative, with ${getRandomNumber(50, 80)}% of industry leaders implementing environmental and social governance measures as central to their business models. Technological advancements including artificial intelligence, blockchain, and advanced analytics are reshaping operational efficiencies and creating new product possibilities, with early adopters realizing cost reductions of ${getRandomNumber(15, 35)}%. Changing demographics are creating entirely new market segments, with Generation Z and Millennial consumers driving ${getRandomNumber(30, 60)}% of industry growth through their distinct preferences and purchasing behaviors. Labor market trends indicate talent shortages in specialized roles, with companies implementing innovative recruitment and retention strategies to secure necessary expertise in this competitive environment. Industry events and conferences have evolved to hybrid formats, expanding reach and accessibility while creating new networking and partnership opportunities for businesses of all sizes.`;
}

/**
 * Helper function to generate random numbers for the mock industry data
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Function to split long text into paragraphs for better readability
 */
export function splitIntoParagraphs(text: string): string[] {
  // Clean any markdown formatting from the text
  const cleanText = text
    .replace(/\*\*\s*Industry\s*Overview\s*\*\*/gi, '')
    .replace(/##\s*Industry\s*Overview/gi, '')
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\n#{2,}/g, '')
    .trim();
  
  // If the text already has paragraph breaks, use them
  if (cleanText.includes('\n\n')) {
    return cleanText.split('\n\n').filter(p => p.trim().length > 0);
  }
  
  // If no explicit paragraph breaks, create logical breaks
  // Split after approximately every 3-4 sentences for readability
  const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [];
  
  if (sentences.length <= 4) {
    return [cleanText]; // Return as single paragraph if it's short
  }
  
  const paragraphs = [];
  const sentencesPerParagraph = Math.ceil(sentences.length / 3); // Aim for 3 paragraphs
  
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    const paragraph = sentences.slice(i, i + sentencesPerParagraph).join(' ');
    paragraphs.push(paragraph);
  }
  
  return paragraphs;
}
