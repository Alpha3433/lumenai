
import React from 'react';
import { Globe } from 'lucide-react';

const PestelSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-6 relative">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Globe className="h-6 w-6 text-blue-500" />
        PESTEL Analysis
      </h2>
      <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full absolute right-0 top-1">
        Macro-environmental factors
      </div>
    </div>
  );
};

export default PestelSectionHeader;
