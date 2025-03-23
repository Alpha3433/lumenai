
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Check, LogIn, Shuffle, Truck, Users, Swords } from 'lucide-react';
import { PorterForce, ForcesLevel } from '@/utils/porter';

interface PorterFiveForceCardProps {
  force: PorterForce;
}

const PorterFiveForceCard: React.FC<PorterFiveForceCardProps> = ({ force }) => {
  // Define level-specific styling and display names
  const levelConfig: Record<ForcesLevel, { 
    textColor: string, 
    displayName?: string,
    iconColor: string 
  }> = {
    'Low': {
      textColor: 'text-green-700 dark:text-green-400',
      displayName: 'Low',
      iconColor: 'text-green-500'
    },
    'Medium': {
      textColor: 'text-orange-700 dark:text-orange-400',
      displayName: 'Moderate',
      iconColor: 'text-green-500'
    },
    'High': {
      textColor: 'text-red-700 dark:text-red-400',
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
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mb-4 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1">
              {getIcon()}
              <h3 className="text-lg font-medium">{force.title}</h3>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">Level:</span>
              <span className={`text-sm font-bold ${config.textColor}`}>
                {displayLevel}
              </span>
            </div>
          </div>
          <ul className="flex-1 space-y-2 ml-4">
            {force.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1 text-gray-500">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PorterFiveForceCard;
