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
    return `These individuals are deeply motivated to transform their lives through healthier habits, actively seeking comprehensive programs that provide clear, actionable steps toward their wellness goals while maintaining busy professional schedules.`;
  }
  if (point.toLowerCase().includes('position')) {
    return `Our platform stands as the premier AI-powered wellness companion, uniquely positioned to deliver personalized fitness and nutrition guidance through advanced machine learning algorithms that adapt to each user's progress and preferences.`;
  }
  if (point.toLowerCase().includes('traditional')) {
    return `Unlike conventional fitness solutions that offer one-size-fits-all approaches, our platform provides deeply personalized experiences, combining cutting-edge AI technology with human expertise to deliver tailored wellness programs that evolve with each user's journey.`;
  }
  if (point.toLowerCase().includes('community')) {
    return `We foster a supportive ecosystem where users connect with like-minded individuals, share achievements, and receive encouragement from an engaged community of wellness enthusiasts, creating a powerful blend of technological innovation and human connection.`;
  }
  if (point.toLowerCase().includes('social media')) {
    return `Our comprehensive digital marketing strategy leverages data-driven targeting across major social media platforms, creating engaging content that resonates with our core demographic while showcasing real user success stories and transformation journeys.`;
  }
  if (point.toLowerCase().includes('events')) {
    return `We organize regular virtual wellness events, expert-led webinars, and community challenges that create meaningful engagement opportunities, helping users stay motivated while building a strong, supportive community around our brand.`;
  }
  if (point.toLowerCase().includes('trial')) {
    return `New users experience our premium features through an extensive 30-day trial period, supported by personalized onboarding sessions and AI-driven goal setting, ensuring they discover the full value of our platform's capabilities.`;
  }
  if (point.toLowerCase().includes('partnership')) {
    return `Strategic partnerships with healthcare providers, wellness experts, and fitness influencers enhance our credibility while creating valuable content and resources that address specific health concerns and fitness goals of our target audience.`;
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
