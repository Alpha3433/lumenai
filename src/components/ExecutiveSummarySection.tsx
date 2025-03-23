
import React from 'react';
import { FileText, Quote, Building } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { extractTargetMarket } from '@/utils/extraction/marketExtraction';

interface ExecutiveSummarySectionProps {
  summaryText: string;
  businessName: string;
  marketAnalysis?: string;
}

const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ 
  summaryText, 
  businessName, 
  marketAnalysis 
}) => {
  // Extract industry information from market analysis
  const marketData = marketAnalysis ? extractTargetMarket(marketAnalysis) : null;
  const industryText = getIndustryOverview(marketAnalysis || '', businessName);
  
  return (
    <section className="mb-12 max-w-3xl mx-auto space-y-8">
      {/* Business Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          What is {businessName}?
        </h2>
        
        <Card className={cn(
          "border border-gray-200 dark:border-gray-800 shadow-md",
          "bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent"
        )}>
          <CardContent className="p-8 relative">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-blue-200 dark:text-blue-900/40 -z-10" />
            <Quote className="absolute bottom-4 right-4 h-8 w-8 text-blue-200 dark:text-blue-900/40 transform rotate-180 -z-10" />
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                {summaryText || "Loading..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Industry Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Building className="h-6 w-6 text-indigo-500" />
          Industry Overview
        </h2>
        
        <Card className={cn(
          "border border-gray-200 dark:border-gray-800 shadow-md",
          "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
        )}>
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                {industryText || "Industry analysis pending..."}
              </p>
              
              {marketData && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                      Market Size
                    </h3>
                    <p className="text-base font-semibold">{marketData.size}</p>
                  </div>
                  
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                      Growth Rate
                    </h3>
                    <p className="text-base font-semibold">{marketData.growth}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Enhanced helper function to extract industry overview from market analysis text
// or generate a placeholder based on the business name if no analysis is available
function getIndustryOverview(text: string, businessName: string): string {
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
        // Find the next 1-2 sentences for context
        const startIndex = text.indexOf(match[0]);
        const nextPeriod = text.indexOf('.', startIndex + match[0].length);
        if (nextPeriod !== -1 && nextPeriod < startIndex + 300) {
          return text.substring(startIndex, nextPeriod + 1);
        }
        return match[0];
      }
    }
    
    // Fallback to first paragraph if no specific industry description found
    const firstParagraphEnd = text.indexOf('\n\n');
    if (firstParagraphEnd !== -1 && firstParagraphEnd < 300) {
      return text.substring(0, firstParagraphEnd);
    }
    
    // If all else fails, return first 250 characters as the industry overview
    return text.substring(0, Math.min(250, text.length)) + 
      (text.length > 250 ? '...' : '');
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
  
  return `The ${industry} industry is currently experiencing significant growth and transformation. Companies like ${businessName} are positioned to capitalize on emerging market trends and evolving consumer preferences. This sector is characterized by increasing demand for innovative solutions, with strong potential for scaling operations and capturing market share. As digital adoption accelerates and consumer behaviors shift, businesses in this industry face both unique challenges and substantial opportunities for differentiation. Furthermore, the evolving regulatory landscape and technological advancements are reshaping competitive dynamics, creating new entry points for disruptive business models while also raising barriers for traditional approaches. Economic factors including changing workforce dynamics and supply chain transformations are additionally influencing market conditions, with agile companies finding advantages through adaptive strategies.`;
}

export default ExecutiveSummarySection;
