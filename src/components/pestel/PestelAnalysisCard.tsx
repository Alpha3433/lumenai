
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Users, Cpu, Leaf, Scale } from 'lucide-react';

interface PestelAnalysisCardProps {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
  companyName?: string;
  industry?: string;
}

const PestelAnalysisCard: React.FC<PestelAnalysisCardProps> = ({ 
  category, 
  points,
  companyName,
  industry
}) => {
  const getCategoryConfig = () => {
    switch (category) {
      case 'political':
        return {
          title: 'Political Factors',
          icon: <Building className="h-5 w-5 text-red-500" />,
          bgClass: 'bg-red-50 dark:bg-red-900/10',
          borderClass: 'border-red-100 dark:border-red-800/30',
          textClass: 'text-red-800 dark:text-red-200'
        };
      case 'economic':
        return {
          title: 'Economic Factors',
          icon: <DollarSign className="h-5 w-5 text-blue-500" />,
          bgClass: 'bg-blue-50 dark:bg-blue-900/10',
          borderClass: 'border-blue-100 dark:border-blue-800/30',
          textClass: 'text-blue-800 dark:text-blue-200'
        };
      case 'social':
        return {
          title: 'Social Factors',
          icon: <Users className="h-5 w-5 text-amber-500" />,
          bgClass: 'bg-amber-50 dark:bg-amber-900/10',
          borderClass: 'border-amber-100 dark:border-amber-800/30',
          textClass: 'text-amber-800 dark:text-amber-200'
        };
      case 'technological':
        return {
          title: 'Technological Factors',
          icon: <Cpu className="h-5 w-5 text-purple-500" />,
          bgClass: 'bg-purple-50 dark:bg-purple-900/10',
          borderClass: 'border-purple-100 dark:border-purple-800/30',
          textClass: 'text-purple-800 dark:text-purple-200'
        };
      case 'environmental':
        return {
          title: 'Environmental Factors',
          icon: <Leaf className="h-5 w-5 text-green-500" />,
          bgClass: 'bg-green-50 dark:bg-green-900/10',
          borderClass: 'border-green-100 dark:border-green-800/30',
          textClass: 'text-green-800 dark:text-green-200'
        };
      case 'legal':
        return {
          title: 'Legal Factors',
          icon: <Scale className="h-5 w-5 text-orange-500" />,
          bgClass: 'bg-orange-50 dark:bg-orange-900/10',
          borderClass: 'border-orange-100 dark:border-orange-800/30',
          textClass: 'text-orange-800 dark:text-orange-200'
        };
    }
  };

  const config = getCategoryConfig();

  return (
    <Card className={`${config.bgClass} ${config.borderClass} shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {config.icon}
          <span className={config.textClass}>{config.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`${config.textClass} mt-1 text-lg`}>•</span>
              <p className="text-gray-700 dark:text-gray-300 leading-tight">{point}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PestelAnalysisCard;
