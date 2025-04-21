
import React from 'react';
import { CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketingSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  checkColor?: string;
  description?: string;
}

const MarketingSection: React.FC<MarketingSectionProps> = ({
  title,
  icon,
  items = [],
  checkColor = "indigo-500",
  description
}) => {
  const displayItems = items.slice(0, 4);
  if (displayItems.length === 0) return null;

  return (
    <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-border/50 h-full">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">{title}</h4>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="space-y-3">
        {displayItems.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <CircleCheck className={cn(`h-4 w-4 text-${checkColor} mt-1 flex-shrink-0`)} />
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
