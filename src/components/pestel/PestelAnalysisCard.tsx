
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Users, Cpu, Leaf, Scale } from 'lucide-react';
import { PestelFactor } from '@/utils/pestelUtils';

interface PestelAnalysisCardProps {
  category: PestelFactor['category'];
  points: string[];
}

const PestelAnalysisCard: React.FC<PestelAnalysisCardProps> = ({ category, points }) => {
  // Define category-specific styling and icons
  const categoryConfig = {
    political: {
      title: 'Political',
      icon: <Building className="h-5 w-5 text-red-500" />,
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      textColor: 'text-red-800 dark:text-red-300',
      borderColor: 'border-red-200 dark:border-red-800/30'
    },
    economic: {
      title: 'Economic',
      icon: <DollarSign className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      textColor: 'text-blue-800 dark:text-blue-300',
      borderColor: 'border-blue-200 dark:border-blue-800/30'
    },
    social: {
      title: 'Social',
      icon: <Users className="h-5 w-5 text-yellow-500" />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      textColor: 'text-yellow-800 dark:text-yellow-300',
      borderColor: 'border-yellow-200 dark:border-yellow-800/30'
    },
    technological: {
      title: 'Technological',
      icon: <Cpu className="h-5 w-5 text-purple-500" />,
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      textColor: 'text-purple-800 dark:text-purple-300',
      borderColor: 'border-purple-200 dark:border-purple-800/30'
    },
    environmental: {
      title: 'Environmental',
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      textColor: 'text-green-800 dark:text-green-300',
      borderColor: 'border-green-200 dark:border-green-800/30'
    },
    legal: {
      title: 'Legal',
      icon: <Scale className="h-5 w-5 text-orange-500" />,
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      textColor: 'text-orange-800 dark:text-orange-300',
      borderColor: 'border-orange-200 dark:border-orange-800/30'
    }
  };

  const config = categoryConfig[category];

  return (
    <Card className={`border ${config.borderColor} shadow-sm h-full ${config.bgColor}`}>
      <CardContent className="p-6">
        <h3 className={`text-lg font-medium mb-4 ${config.textColor} flex items-center gap-2`}>
          {config.icon}
          {config.title}
        </h3>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className={`text-${category}-500 font-bold mt-1`}>•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PestelAnalysisCard;
