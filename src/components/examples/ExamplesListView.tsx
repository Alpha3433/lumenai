import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import ExampleCard from './ExampleCard';
import { ExampleCompany } from '@/data/exampleCompanies';

interface ExamplesListViewProps {
  companies: ExampleCompany[];
  onSelectCompany: (companyId: string) => void;
}

const ExamplesListView: React.FC<ExamplesListViewProps> = ({ 
  companies, 
  onSelectCompany 
}) => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const featuredCompanies = companies.filter(company => 
    ['tesla', 'apple', 'amazon'].includes(company.id)
  );
  
  const otherCompanies = companies.filter(company => 
    !['tesla', 'apple', 'amazon'].includes(company.id)
  );

  return (
    <motion.main 
      className="flex-1 w-full mx-auto px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl blur-3xl opacity-50 -z-10"></div>
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-medium text-sm mb-4">
              <Sparkles className="inline-block h-4 w-4 mr-2" />
              Expert Business Analysis
            </span>
            <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Example Business Reports
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore business intelligence reports for industry leaders
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
          {featuredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="h-full"
            >
              <ExampleCard 
                company={company} 
                onSelect={onSelectCompany} 
              />
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12">
          {otherCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              custom={index + 3}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="h-full"
            >
              <ExampleCard 
                company={company} 
                onSelect={onSelectCompany} 
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-3">Ready to generate your own report?</h2>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
              Our AI-powered platform can analyze your business and provide customized intelligence.
            </p>
            <Link to="/create">
              <Button size="sm" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg px-6">
                Create Your Business Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default ExamplesListView;
