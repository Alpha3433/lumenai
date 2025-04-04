
import React from 'react';
import { Globe } from 'lucide-react';

const PestelSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-6 relative">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        PESTEL Analysis
      </h2>
      <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
        Macro-environmental factors
      </div>
    </div>
  );
};

export default PestelSectionHeader;
