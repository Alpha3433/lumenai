
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, ExternalLink } from 'lucide-react';

interface AnalysisTextCardProps {
  analysisText: string;
}

const AnalysisTextCard: React.FC<AnalysisTextCardProps> = ({ analysisText }) => {
  // Function to format the analysis text with better paragraphs
  const formatAnalysisText = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
    
    if (paragraphs.length <= 1) {
      // If there aren't clear paragraphs, split by sentences for better readability
      return text.split('. ').map((sentence, index, array) => {
        // Add period back except for the last item if it already has punctuation
        const hasEndingPunctuation = /[.!?]$/.test(sentence);
        const formattedSentence = hasEndingPunctuation ? sentence : sentence + '.';
        return index < array.length - 1 || !hasEndingPunctuation ? formattedSentence : sentence;
      }).map((sentence, index) => (
        <p key={index} className="mb-3 last:mb-0">{sentence}</p>
      ));
    }
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
    ));
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm h-full overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-purple-500" />
            Market Analysis
          </div>
          <span className="text-xs text-purple-500 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-full">
            AI-Generated
          </span>
        </h3>
        <div className="prose dark:prose-invert max-w-none text-sm space-y-2 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
          {formatAnalysisText(analysisText)}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTextCard;
