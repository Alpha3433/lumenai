
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, LogIn, Shuffle, Truck, Users, Swords } from 'lucide-react';
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
    displayName?: string,
    iconColor: string 
  }> = {
    'Low': {
      textColor: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      displayName: 'Low',
      iconColor: 'text-green-500'
    },
    'Medium': {
      textColor: 'text-orange-700 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      displayName: 'Moderate',
      iconColor: 'text-orange-500'
    },
    'High': {
      textColor: 'text-red-700 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      displayName: 'High',
      iconColor: 'text-red-500'
    }
  };

  const getIcon = () => {
    const iconProps = { 
      className: `h-5 w-5 ${levelConfig[force.level].iconColor}`, 
      "aria-hidden": true 
    };
    
    switch (force.icon) {
      case 'log-in':
        return <LogIn {...iconProps} />;
      case 'shuffle':
        return <Shuffle {...iconProps} />;
      case 'truck':
        return <Truck {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'swords':
        return <Swords {...iconProps} />;
      default:
        return <AlertTriangle {...iconProps} className="h-5 w-5 text-yellow-500" />;
    }
  };

  const config = levelConfig[force.level];
  const displayLevel = config.displayName || force.level;

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getIcon()}
              <h3 className="text-lg font-medium">{force.title}</h3>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              config.textColor,
              config.bgColor
            )}>
              {displayLevel}
            </span>
          </div>
          
          <ul className="space-y-2.5 mt-2">
            {force.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm">
                <span className={cn(
                  "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                  force.level === 'Low' ? "bg-green-500" : 
                  force.level === 'Medium' ? "bg-orange-500" : "bg-red-500"
                )}></span>
                <span className="text-gray-700 dark:text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PorterFiveForceCard;
