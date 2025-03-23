
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Check, LogIn, Shuffle, Truck, Users, Swords } from 'lucide-react';
import { PorterForce, ForcesLevel } from '@/utils/porterFiveUtils';

interface PorterFiveForceCardProps {
  force: PorterForce;
}

const PorterFiveForceCard: React.FC<PorterFiveForceCardProps> = ({ force }) => {
  // Define level-specific styling
  const levelConfig: Record<ForcesLevel, { textColor: string, bgColor: string }> = {
    'Low': {
      textColor: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    'Medium': {
      textColor: 'text-orange-700 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    'High': {
      textColor: 'text-red-700 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    }
  };

  const getIcon = () => {
    const iconProps = { 
      className: "h-5 w-5", 
      "aria-hidden": true 
    };
    
    switch (force.icon) {
      case 'log-in':
        return <LogIn {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'shuffle':
        return <Shuffle {...iconProps} className="h-5 w-5 text-red-500" />;
      case 'truck':
        return <Truck {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'users':
        return <Users {...iconProps} className="h-5 w-5 text-red-500" />;
      case 'swords':
        return <Swords {...iconProps} className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle {...iconProps} className="h-5 w-5 text-yellow-500" />;
    }
  };

  const config = levelConfig[force.level];

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mb-4 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-1 flex items-center gap-2">
              {force.title}
            </h3>
            <div className="flex items-center mb-3">
              <span className="text-sm font-medium mr-2">Level:</span>
              <span className={`text-sm font-bold ${config.textColor}`}>
                {force.level}
              </span>
            </div>
            <ul className="space-y-2">
              {force.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 text-gray-500">•</span>
                  <span>{point}</span>
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
