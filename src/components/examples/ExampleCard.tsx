
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Apple, ShoppingCart } from 'lucide-react';
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
        return <Zap className="h-12 w-12 text-blue-500" />;
      case 'Apple':
        return <Apple className="h-12 w-12 text-gray-800" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-12 w-12 text-orange-500" />;
      default:
        return <ArrowRight className="h-12 w-12 text-primary" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900" 
        onClick={() => onSelect(company.id)}
      >
        <CardContent className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-md">
              {getLogo()}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center mb-2">{company.name}</h3>
          <p className="text-sm font-medium text-primary dark:text-primary-foreground text-center mb-3 inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
            {company.industry}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            {company.description}
          </p>
          <div className="flex justify-center">
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg">
              View Report <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExampleCard;
