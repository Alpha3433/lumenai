
import React from 'react';
import { motion } from 'framer-motion';

const ExamplesHeader: React.FC = () => {
  return (
    <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Business Intelligence Examples</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Explore in-depth analyses of top real-world companies and see how our AI generates comprehensive business reports
      </p>
      <div className="max-w-xl mx-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Disclaimer: These reports contain mock data based on publicly available information about real companies. 
          They are for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default ExamplesHeader;
