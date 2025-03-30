
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Zap, Apple, ShoppingCart, Workflow, MonitorPlay, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExampleCompany {
  id: string;
  name: string;
  description: string;
  industry: string;
  logoIcon: string;
}

interface ExampleCardProps {
  company: ExampleCompany;
  onSelect: (companyId: string) => void;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ company, onSelect }) => {
  // Map company logoIcon string to the actual Lucide icon component
  const getLogo = () => {
    switch(company.logoIcon) {
      case 'Zap':
        return <Zap className="h-20 w-20 text-blue-500" />;
      case 'Apple':
        return <Apple className="h-20 w-20 text-gray-800 dark:text-white" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-20 w-20 text-orange-500" />;
      case 'Workflow':
        return <Workflow className="h-20 w-20 text-blue-600" />;
      case 'MonitorPlay':
        return <MonitorPlay className="h-20 w-20 text-red-600" />;
      case 'Share2':
        return <Share2 className="h-20 w-20 text-blue-400" />;
      default:
        return <ExternalLink className="h-20 w-20 text-primary" />;
    }
  };

  // Define card colors based on company
  const getCardGradient = () => {
    switch(company.id) {
      case 'tesla':
        return 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20';
      case 'apple':
        return 'from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20';
      case 'amazon':
        return 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20';
      case 'microsoft':
        return 'from-blue-50 to-purple-100 dark:from-blue-950/30 dark:to-purple-900/20';
      case 'netflix':
        return 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20';
      case 'meta':
        return 'from-blue-50 to-cyan-100 dark:from-blue-950/30 dark:to-cyan-900/20';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card 
        className={`h-full bg-gradient-to-br ${getCardGradient()} hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer`}
        onClick={() => onSelect(company.id)}
      >
        <CardContent className="p-8 flex flex-col items-center h-full">
          <div className="mb-8 mt-4 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg p-4">
              {getLogo()}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center mb-3">{company.name}</h3>
          <p className="text-sm font-medium text-primary dark:text-primary-foreground text-center mb-4 inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
            {company.industry}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center flex-grow">
            {company.description}
          </p>
          <div className="flex justify-center">
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg">
              View Business Report <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExampleCard;
