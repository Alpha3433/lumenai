
import React from 'react';
import { Star, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PositioningStrategySectionProps {
  paragraphs: string[];
}

const PositioningStrategySection: React.FC<PositioningStrategySectionProps> = ({ paragraphs }) => {
  if (!paragraphs || paragraphs.length === 0) return null;
  
  return (
    <Card className="border-indigo-200 dark:border-indigo-800/40 shadow-sm bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent">
      <CardContent className="p-4 space-y-4">
        <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Compass className="h-4 w-4" />
          Positioning Strategy
        </h4>
        <div className="space-y-3">
          {paragraphs.map((paragraph, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Star className="h-3 w-3 text-amber-500 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PositioningStrategySection;
