
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ExampleCard from './ExampleCard';

interface ExampleCompany {
  id: string;
  name: string;
  description: string;
  industry: string;
}

interface ExamplesListViewProps {
  companies: ExampleCompany[];
  onSelectCompany: (companyId: string) => void;
}

const ExamplesListView: React.FC<ExamplesListViewProps> = ({ 
  companies, 
  onSelectCompany 
}) => {
  return (
    <motion.main 
      className="flex-1 container max-w-7xl mx-auto px-4 py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Example Business Intelligence Reports</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore comprehensive business analysis reports for top global companies
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {companies.map((company) => (
          <ExampleCard 
            key={company.id} 
            company={company} 
            onSelect={onSelectCompany} 
          />
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-lg mb-6">Ready to generate your own business intelligence report?</p>
        <Link to="/create">
          <Button size="lg" className="bg-black hover:bg-black/90 text-white">
            Create Your Business Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.main>
  );
};

export default ExamplesListView;
