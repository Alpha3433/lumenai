
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanTemplateProps {
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  popular?: boolean;
}

const PlanTemplate: React.FC<PlanTemplateProps> = ({
  title,
  description,
  imageSrc,
  category,
  popular = false
}) => {
  return (
    <Card className="overflow-hidden hover-scale border-0 shadow-lg rounded-xl bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {popular && (
          <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>
        )}
        
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
          {description}
        </p>
        
        <Link to="/create">
          <Button variant="outline" className="w-full rounded-lg border-gray-200 dark:border-gray-700 group">
            <span>Use This Template</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlanTemplate;
