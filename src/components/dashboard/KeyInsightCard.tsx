
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LucideIcon, 
  TrendingUp, 
  Zap, 
  Shield, 
  DollarSign, 
  Globe, 
  Users 
} from 'lucide-react';

interface KeyInsightCardProps {
  title: string;
  value: string;
  icon: string | LucideIcon;
  color: string;
  className?: string;
  insights?: string[];
  prefix?: string;
  badgeColors?: {
    bg: string;
    darkBg: string;
    text: string;
    darkText: string;
    border: string;
    darkBorder: string;
  };
}

const KeyInsightCard: React.FC<KeyInsightCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  className = '',
  insights = [],
  prefix = '',
  badgeColors
}) => {
  // Map string icon names to actual icon components
  const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Zap,
    Shield,
    DollarSign,
    Globe,
    Users
  };

  // Determine which icon to use
  const IconComponent = typeof icon === 'string' && iconMap[icon] 
    ? iconMap[icon] 
    : typeof icon === 'function' 
      ? icon 
      : TrendingUp; // Default fallback

  return (
    <Card className={`border border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <IconComponent className={`h-4 w-4 ${color}`} />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>

        {insights && insights.length > 0 ? (
          <div className="space-y-2">
            {insights.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                {badgeColors && (
                  <Badge 
                    variant="outline" 
                    className={`${badgeColors.bg} dark:${badgeColors.darkBg} ${badgeColors.text} dark:${badgeColors.darkText} ${badgeColors.border} dark:${badgeColors.darkBorder}`}
                  >
                    {prefix}{index + 1}
                  </Badge>
                )}
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base font-medium mt-1">{value}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyInsightCard;
