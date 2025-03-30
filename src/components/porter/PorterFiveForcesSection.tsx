
import React from 'react';
import { FileBarChart } from 'lucide-react';
import { PorterFiveForcesData } from '@/utils/porter';
import PorterFiveForceCard from './PorterFiveForceCard';

interface PorterFiveForcesSectionProps {
  marketAnalysis?: string;
  forcesData?: PorterFiveForcesData;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ forcesData, marketAnalysis }) => {
  // Ensure forcesData is defined before trying to access its properties
  if (!forcesData) {
    return (
      <section className="mb-12 animate-fade-in space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <FileBarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-lg font-medium">Porter's Five Forces Analysis</span>
        </div>
        <div className="text-center py-8 text-gray-500">
          Analysis data is being processed...
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <FileBarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-lg font-medium">Porter's Five Forces Analysis</span>
      </div>

      <div className="space-y-4">
        <PorterFiveForceCard force={forcesData['threat-new-entry']} />
        <PorterFiveForceCard force={forcesData['threat-substitution']} />
        <PorterFiveForceCard force={forcesData['supplier-power']} />
        <PorterFiveForceCard force={forcesData['buyer-power']} />
        <PorterFiveForceCard force={forcesData['competitive-rivalry']} />
      </div>
    </section>
  );
};

export default PorterFiveForcesSection;
