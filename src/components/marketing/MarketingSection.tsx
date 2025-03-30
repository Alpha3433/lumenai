
import React from 'react';
import { CircleCheck } from 'lucide-react';

interface MarketingSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  checkColor?: string;
}

const MarketingSection: React.FC<MarketingSectionProps> = ({ 
  title, 
  icon, 
  items, 
  checkColor = "indigo-500" 
}) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        {icon}
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((point, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CircleCheck className={`h-4 w-4 text-${checkColor} mt-0.5 flex-shrink-0`} />
            <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
