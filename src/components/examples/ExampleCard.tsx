
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
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
  // Get the appropriate logo image based on company.id
  const getLogoImage = () => {
    switch(company.id) {
      case 'tesla':
        return '/lovable-uploads/0e5dc4b2-34c2-4fcf-9c1c-877e2501390d.png';
      case 'apple':
        return '/lovable-uploads/1fcba80c-9322-462e-a894-f9028ee6eb2c.png';
      case 'amazon':
        return '/lovable-uploads/7ffe4f40-f73e-49b5-a23c-f0c590ae7f83.png';
      default:
        return null;
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

  const logoImage = getLogoImage();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card 
        className={`h-full bg-gradient-to-br ${getCardGradient()} hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer`}
        onClick={() => onSelect(company.id)}
      >
        <CardContent className="p-4 flex flex-col items-center h-full">
          <div className="mb-4 mt-2 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-md p-3">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt={`${company.name} logo`} 
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{company.name[0]}</span>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">{company.name}</h3>
          <p className="text-xs font-medium text-primary dark:text-primary-foreground text-center mb-3 inline-block px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
            {company.industry}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 text-center line-clamp-3">
            {company.description}
          </p>
          <div className="flex justify-center mt-auto">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md text-xs">
              View Report <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExampleCard;
