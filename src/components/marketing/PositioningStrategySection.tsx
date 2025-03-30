
import React from 'react';
import { Star } from 'lucide-react';

interface PositioningStrategySectionProps {
  paragraphs: string[];
}

const PositioningStrategySection: React.FC<PositioningStrategySectionProps> = ({ paragraphs }) => {
  if (!paragraphs || paragraphs.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Star className="h-4 w-4" />
        Positioning Strategy
      </h4>
      <div className="space-y-2">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PositioningStrategySection;
