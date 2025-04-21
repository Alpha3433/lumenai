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

function expandBulletPoint(point: string): string {
  if (point.length > 100) return point;
  
  // Enhanced pattern-based expansions with more natural flow
  if (point.toLowerCase().includes('aged') || point.toLowerCase().includes('demographic')) {
    return `Our core audience consists of health-conscious individuals aged 30-50, predominantly female professionals with middle-income backgrounds, seeking personalized wellness guidance and structured support for their health journey.`;
  }
  if (point.toLowerCase().includes('motivated')) {
    return `These individuals are deeply motivated to transform their lives through healthier habits, actively seeking comprehensive programs that provide clear, actionable steps toward their wellness goals.`;
  }
  if (point.toLowerCase().includes('ai-driven') || point.toLowerCase().includes('technology')) {
    return `By leveraging cutting-edge AI technology, we deliver personalized fitness recommendations and adaptive workout plans that evolve with each user's progress and preferences.`;
  }
  if (point.toLowerCase().includes('traditional')) {
    return `Unlike conventional fitness solutions, our platform provides deeply personalized experiences, adapting to individual progress patterns and offering real-time adjustments to maximize results.`;
  }
  if (point.toLowerCase().includes('community')) {
    return `Our platform creates a supportive ecosystem where users connect with like-minded individuals, share achievements, and receive encouragement from an engaged community of wellness enthusiasts.`;
  }
  if (point.toLowerCase().includes('target segments')) {
    return `Strategic marketing campaigns target specific demographic segments through precise data analytics, ensuring our message reaches those most likely to benefit from our personalized approach.`;
  }
  if (point.toLowerCase().includes('trial')) {
    return `New users can experience the full suite of premium features through our comprehensive 30-day trial, allowing them to discover the platform's value proposition firsthand.`;
  }
  if (point.toLowerCase().includes('social media')) {
    return `Our multi-channel digital marketing strategy combines targeted social media campaigns with sophisticated Google Ads optimization, reaching potential users across their preferred platforms.`;
  }
  
  return point.endsWith('.') ? point : `${point}.`;
}

const MarketingSection: React.FC<MarketingSectionProps> = ({
  title,
  icon,
  items = [],
  checkColor = "indigo-500",
  description
}) => {
  // Only show the first 4 concise points, but expand each
  const displayItems = items.slice(0, 4);
  if (displayItems.length === 0) return null;

  return (
    <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-border/50">
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
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
              {expandBulletPoint(point)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
