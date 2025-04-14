
import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  subtext: string;
  icon: LucideIcon;
  iconClassName?: string;
}

const StatsCard = ({ title, value, subtext, icon: Icon, iconClassName }: StatsCardProps) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-sm text-muted-foreground">{subtext}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
