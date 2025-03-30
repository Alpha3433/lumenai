
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Users, Cpu, Leaf, Scale } from 'lucide-react';
import { PestelFactor } from '@/utils/pestel';

interface PestelAnalysisCardProps {
  category: PestelFactor['category'];
  points: string[];
}

const PestelAnalysisCard: React.FC<PestelAnalysisCardProps> = ({ category, points }) => {
  // Define category-specific styling and icons
  const categoryConfig = {
    political: {
      icon: <Building className="h-5 w-5 text-red-500" />,
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800/30',
      dotColor: 'bg-red-500'
    },
    economic: {
      icon: <DollarSign className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800/30',
      dotColor: 'bg-blue-500'
    },
    social: {
      icon: <Users className="h-5 w-5 text-yellow-500" />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800/30',
      dotColor: 'bg-yellow-500'
    },
    technological: {
      icon: <Cpu className="h-5 w-5 text-purple-500" />,
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800/30',
      dotColor: 'bg-purple-500'
    },
    environmental: {
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800/30',
      dotColor: 'bg-green-500'
    },
    legal: {
      icon: <Scale className="h-5 w-5 text-orange-500" />,
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800/30',
      dotColor: 'bg-orange-500'
    }
  };

  const config = categoryConfig[category];
  
  // Limit to 3 points and clean up any heading format
  const cleanedPoints = points.map(point => 
    point
      .replace(/^(political|economic|social|technological|environmental|legal):\s*/i, '')
      .replace(/^(#|\*|\-)+\s*/g, '')
      .replace(/^[A-Z\s]+:\s*/g, '')
      .replace(/^\d+\.\s*/, '')
      .trim()
  ).slice(0, 3);

  return (
    <Card className={`border ${config.borderColor} shadow-sm h-full overflow-hidden ${config.bgColor}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {config.icon}
          <span className="ml-2 font-medium capitalize">{category}</span>
        </div>
        <ul className="space-y-3">
          {cleanedPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm">
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${config.dotColor}`}></span>
              <span className="text-gray-700 dark:text-gray-300">{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PestelAnalysisCard;
