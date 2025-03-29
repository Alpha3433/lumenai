
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PorterForce } from '@/utils/porter';
import { LogIn, Shuffle, Truck, Users, Swords } from 'lucide-react';

interface PorterFiveForceCardProps {
  force: PorterForce;
  companyName?: string;
  industry?: string;
}

const PorterFiveForceCard: React.FC<PorterFiveForceCardProps> = ({ 
  force,
  companyName,
  industry
}) => {
  const getForceConfig = () => {
    const threatLevel = force.level.toLowerCase();
    
    let config = {
      icon: <LogIn className="h-5 w-5" />,
      colorClass: 'text-gray-600 dark:text-gray-300',
      bgClass: 'bg-gray-50 dark:bg-gray-800/50',
      borderClass: 'border-gray-200 dark:border-gray-700/50',
      threatBadgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300'
    };
    
    // Set icon based on force category
    switch (force.category) {
      case 'threat-new-entry':
        config.icon = <LogIn className="h-5 w-5" />;
        break;
      case 'threat-substitution':
        config.icon = <Shuffle className="h-5 w-5" />;
        break;
      case 'supplier-power':
        config.icon = <Truck className="h-5 w-5" />;
        break;
      case 'buyer-power':
        config.icon = <Users className="h-5 w-5" />;
        break;
      case 'competitive-rivalry':
        config.icon = <Swords className="h-5 w-5" />;
        break;
    }
    
    // Set colors based on threat level
    switch (threatLevel) {
      case 'high':
        config.colorClass = 'text-red-600 dark:text-red-400';
        config.bgClass = 'bg-red-50 dark:bg-red-900/10';
        config.borderClass = 'border-red-100 dark:border-red-800/30';
        config.threatBadgeClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        break;
      case 'medium':
        config.colorClass = 'text-amber-600 dark:text-amber-400';
        config.bgClass = 'bg-amber-50 dark:bg-amber-900/10';
        config.borderClass = 'border-amber-100 dark:border-amber-800/30';
        config.threatBadgeClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        break;
      case 'low':
        config.colorClass = 'text-green-600 dark:text-green-400';
        config.bgClass = 'bg-green-50 dark:bg-green-900/10';
        config.borderClass = 'border-green-100 dark:border-green-800/30';
        config.threatBadgeClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        break;
    }
    
    return config;
  };
  
  const config = getForceConfig();

  // Ensure we have a consistent set of points (max 4)
  const points = force.points.slice(0, 4).map(point => 
    point.length > 120 ? `${point.substring(0, 120)}...` : point
  );
  
  // Fill with empty space if less than 4 points
  while (points.length < 4) {
    points.push("");
  }
  
  // Filter out empty points
  const filteredPoints = points.filter(point => point.length > 0);

  return (
    <Card className={`${config.bgClass} ${config.borderClass} shadow-sm overflow-hidden`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${config.bgClass} ${config.colorClass} mt-1`}>
            {config.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {force.title}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.threatBadgeClass}`}>
                {force.level}
              </span>
            </div>
            
            <ul className="space-y-2 text-sm">
              {filteredPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${config.colorClass} mt-1`}>•</span>
                  <p className="text-gray-700 dark:text-gray-300">{point}</p>
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
