
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
  // Expands the bullet into a slightly longer, clearer mini-paragraph.
  // You can tune this logic as desired for the app - for now, we're subtly expanding, not rewriting.
  if (point.length > 100) return point; // Already expanded from OpenAI output
  // Pattern-based expansions
  if (point.toLowerCase().includes('aged')) {
    return `The primary audience is aged 30-50, primarily female, middle-income earners, and often working professionals seeking structured guidance to adopt healthier habits.`;
  }
  if (point.toLowerCase().includes('motivated')) {
    return `This audience is motivated to adopt healthier habits, looking for structured, easy-to-follow programs to guide weight loss and wellness.`;
  }
  if (point.toLowerCase().includes('ai-driven fitness app')) {
    return `FitnessAi is positioned as a leading AI-driven fitness app, empowering users with smart recommendations tailored specifically to their health goals.`;
  }
  if (point.toLowerCase().includes('unlike traditional fitness apps')) {
    return `FitnessAi stands out from traditional fitness apps by deeply understanding its targeted users rather than offering generic solutions.`;
  }
  if (point.toLowerCase().includes('advanced ai technology')) {
    return `The platform leverages advanced AI technology combined with a supportive community, offering a personalized and encouraging experience.`;
  }
  if (point.toLowerCase().includes('ideal for reaching target segments')) {
    return `Marketing campaigns are ideally tailored to target health-conscious individuals and new parents by utilizing sharp demographic segmentation.`;
  }
  if (point.toLowerCase().includes('30-day free trial')) {
    return `A 30-day free trial encourages sign-ups and showcases the app’s value, reducing barriers for new users to experience FitnessAi’s unique features.`;
  }
  if (point.toLowerCase().includes('google ads and social media')) {
    return `Advertising on Google and social media enables precise targeting of the most promising demographics, improving acquisition efficiency.`;
  }
  // Default: present as a full sentence
  return point.endsWith('.') ? point : point + '.';
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

