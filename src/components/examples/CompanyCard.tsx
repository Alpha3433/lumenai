
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CompanyCardProps {
  company: any;
  onViewReport: (company: any) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onViewReport }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-800">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
        <img 
          src={company.logoUrl} 
          alt={`${company.name} logo`} 
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 text-xs font-medium px-2.5 py-1 rounded-full text-gray-800 dark:text-gray-200 backdrop-blur-sm">
          {company.industry}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{company.name}</CardTitle>
        <CardDescription>{company.shortDescription}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <ul className="space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className="font-medium">Founded:</span> 
            <span>{company.founded}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-medium">HQ:</span> 
            <span>{company.headquarters}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-medium">Revenue:</span> 
            <span className="text-green-600 dark:text-green-500 font-medium">{company.revenue}</span>
          </li>
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onViewReport(company)} 
          className="w-full"
        >
          View Business Report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
