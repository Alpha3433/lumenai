
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';

interface KeyInsightCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  insights: string[];
  prefix: string;
  badgeColors: {
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
  icon: Icon, 
  iconColor, 
  insights, 
  prefix,
  badgeColors 
}) => {
  // Filter out empty insights and ensure we have complete sentences
  const validInsights = insights
    .filter(insight => insight && insight.trim().length > 0)
    .map(insight => insight.trim());

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <div className="space-y-2">
          {validInsights.length > 0 ? (
            validInsights.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge 
                  variant="outline" 
                  className={`${badgeColors.bg} dark:${badgeColors.darkBg} ${badgeColors.text} dark:${badgeColors.darkText} ${badgeColors.border} dark:${badgeColors.darkBorder} flex-shrink-0`}
                >
                  {prefix}{index + 1}
                </Badge>
                <p className="text-sm">{insight}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">{title} analysis pending</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyInsightCard;
