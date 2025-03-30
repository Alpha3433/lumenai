
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';

interface ExampleCompany {
  id: string;
  name: string;
  description: string;
  industry: string;
}

interface ExampleCardProps {
  company: ExampleCompany;
  onSelect: (companyId: string) => void;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ company, onSelect }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => onSelect(company.id)}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{company.name}</h3>
        <p className="text-sm text-muted-foreground text-center mb-3">{company.industry}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {company.description}
        </p>
        <div className="flex justify-center">
          <Button variant="outline" size="sm" className="rounded-full">
            View Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExampleCard;
