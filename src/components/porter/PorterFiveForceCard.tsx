
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Shuffle, Truck, Users, Swords } from 'lucide-react';
import { PorterForce, ForcesLevel } from '@/utils/porter';
import { cn } from '@/lib/utils';

interface PorterFiveForceCardProps {
  force: PorterForce;
}

const PorterFiveForceCard: React.FC<PorterFiveForceCardProps> = ({ force }) => {
  // Define level-specific styling and display names
  const levelConfig: Record<ForcesLevel, { 
    textColor: string, 
    bgColor: string,
    displayName: string 
  }> = {
    'Low': {
      textColor: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      displayName: 'Low'
    },
    'Medium': {
      textColor: 'text-orange-700 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      displayName: 'Moderate'
    },
    'High': {
      textColor: 'text-red-700 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      displayName: 'High'
    }
  };

  const getIcon = () => {
    const className = "h-5 w-5 text-primary";
    
    switch (force.icon) {
      case 'log-in':
        return <LogIn className={className} />;
      case 'shuffle':
        return <Shuffle className={className} />;
      case 'truck':
        return <Truck className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'swords':
        return <Swords className={className} />;
      default:
        return <LogIn className={className} />;
    }
  };

  const config = levelConfig[force.level];

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b p-4">
            <div className="flex items-center gap-2 text-primary">
              {getIcon()}
              <h3 className="text-lg font-medium">{force.title}</h3>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              config.textColor,
              config.bgColor
            )}>
              {config.displayName}
            </span>
          </div>
          
          <div className="p-4">
            <ul className="space-y-3">
              {force.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PorterFiveForceCard;
