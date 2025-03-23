
import React from 'react';
import { FileBarChart } from 'lucide-react';
import { PorterFiveForcesData } from '@/utils/porterFiveUtils';
import PorterFiveForceCard from './PorterFiveForceCard';

interface PorterFiveForcesSectionProps {
  forcesData: PorterFiveForcesData;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ forcesData }) => {
  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileBarChart className="h-6 w-6 text-blue-500" />
          Porter's Five Forces Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          Competitive industry assessment
        </div>
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
