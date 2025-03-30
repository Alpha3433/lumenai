
import React, { useEffect } from 'react';
import { Activity, Sparkles, Flag, CircleCheck, Star, Calendar, Users, Megaphone, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import MarketingRoadmapVisualizer from './marketing/MarketingRoadmapVisualizer';
import { useMarketingPlan } from '@/hooks/useMarketingPlan';

interface MarketingPlanSectionProps {
  marketingPlanText: string;
  businessName?: string;
  businessDescription?: string;
}

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({ 
  marketingPlanText, 
  businessName = "Business",
  businessDescription = ""
}) => {
  const { parsedData, loading, error } = useMarketingPlan(
    businessName,
    businessDescription,
    marketingPlanText
  );
  
  // Function to extract sections from marketing plan text
  const extractSections = (text: string) => {
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
  
  const sections = extractSections(marketingPlanText);
  
  // Extract bullet points from text
  const extractBulletPoints = (text: string) => {
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
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold">Marketing Plan</h2>
      </div>
      
      {/* Marketing Roadmap Visualization */}
      <MarketingRoadmapVisualizer 
        businessName={businessName}
        marketingPlanText={marketingPlanText}
      />
      
      {/* Main Marketing Plan Content */}
      <Card className={cn(
        "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
        "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Marketing Strategy</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Audience Section */}
            {parsedData?.targetAudience && parsedData.targetAudience.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Target className="h-4 w-4" />
                  Target Audience
                </h4>
                <div className="space-y-2">
                  {parsedData.targetAudience.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CircleCheck className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : sections.audience.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Users className="h-4 w-4" />
                  Target Audience
                </h4>
                <div className="space-y-2">
                  {sections.audience.map((paragraph, idx) => (
                    <div key={idx} className="space-y-1">
                      {extractBulletPoints(paragraph).map((point, pointIdx) => (
                        <div key={pointIdx} className="flex items-start gap-2">
                          <CircleCheck className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            
            {/* Positioning Section */}
            {parsedData?.positioningStrategy && parsedData.positioningStrategy.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Star className="h-4 w-4" />
                  Positioning Strategy
                </h4>
                <div className="space-y-2">
                  {parsedData.positioningStrategy.map((paragraph, idx) => (
                    <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : sections.positioning.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Star className="h-4 w-4" />
                  Positioning Strategy
                </h4>
                <div className="space-y-2">
                  {sections.positioning.map((paragraph, idx) => (
                    <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Marketing Channels Section */}
            {parsedData?.marketingChannels && parsedData.marketingChannels.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Megaphone className="h-4 w-4" />
                  Marketing Channels
                </h4>
                <div className="space-y-2">
                  {parsedData.marketingChannels.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CircleCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : sections.channels.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Megaphone className="h-4 w-4" />
                  Marketing Channels
                </h4>
                <div className="space-y-2">
                  {sections.channels.map((paragraph, idx) => (
                    <div key={idx} className="space-y-1">
                      {extractBulletPoints(paragraph).map((point, pointIdx) => (
                        <div key={pointIdx} className="flex items-start gap-2">
                          <CircleCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            
            {/* Promotional Activities Section */}
            {parsedData?.promotionalActivities && parsedData.promotionalActivities.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Calendar className="h-4 w-4" />
                  Promotional Activities
                </h4>
                <div className="space-y-2">
                  {parsedData.promotionalActivities.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CircleCheck className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : sections.promotional.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Calendar className="h-4 w-4" />
                  Promotional Activities
                </h4>
                <div className="space-y-2">
                  {sections.promotional.map((paragraph, idx) => (
                    <div key={idx} className="space-y-1">
                      {extractBulletPoints(paragraph).map((point, pointIdx) => (
                        <div key={pointIdx} className="flex items-start gap-2">
                          <CircleCheck className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            
            {/* Customer Acquisition Section */}
            {parsedData?.customerAcquisition && parsedData.customerAcquisition.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Activity className="h-4 w-4" />
                  Customer Acquisition
                </h4>
                <div className="space-y-2">
                  {parsedData.customerAcquisition.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CircleCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : sections.acquisition.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Activity className="h-4 w-4" />
                  Customer Acquisition
                </h4>
                <div className="space-y-2">
                  {sections.acquisition.map((paragraph, idx) => (
                    <div key={idx} className="space-y-1">
                      {extractBulletPoints(paragraph).map((point, pointIdx) => (
                        <div key={pointIdx} className="flex items-start gap-2">
                          <CircleCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Any general/remaining sections */}
          {sections.general.length > 0 && (
            <>
              <Separator className="my-6" />
              <div className="prose dark:prose-invert max-w-none text-sm space-y-4">
                {sections.general.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MarketingPlanSection;
