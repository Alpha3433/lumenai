
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
  items, 
  checkColor = "indigo-500",
  description
}) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-border/50 hover:border-border/80 transition-colors">
      <div className="space-y-1">
        <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          {icon}
          {title}
        </h4>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {items.map((point, idx) => (
          <div key={idx} className="flex items-start gap-2 group">
            <CircleCheck className={cn(`h-4 w-4 text-${checkColor} mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform`)} />
            <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
