
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BusinessModel } from './types';

interface BusinessModelCardProps {
  model: BusinessModel;
}

const BusinessModelCard: React.FC<BusinessModelCardProps> = ({ model }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
    if (score >= 5) return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20";
    return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
      case 'Medium':
        return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20";
      case 'High':
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{model.name}</h3>
            <Badge className={cn("px-2.5 py-1", getScoreColor(model.fitScore))}>
              Fit Score: {model.fitScore}/10
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300 mb-5">{model.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Key Benefits</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {model.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Implementation:</span>
              <Badge className={cn(getComplexityColor(model.implementationComplexity))}>
                {model.implementationComplexity}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessModelCard;
