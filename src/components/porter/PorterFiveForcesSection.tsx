
import React from 'react';
import { FileBarChart } from 'lucide-react';
import { PorterFiveForcesData } from '@/utils/porter';
import PorterFiveForceCard from './PorterFiveForceCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PorterFiveForcesSectionProps {
  marketAnalysis?: string;
  forcesData?: PorterFiveForcesData;
  isLoading?: boolean;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ 
  forcesData, 
  marketAnalysis,
  isLoading = false
}) => {
  // Section header with title
  const renderSectionHeader = () => (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <FileBarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <span className="text-lg font-medium">Porter's Five Forces Analysis</span>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <section className="mb-12 animate-fade-in space-y-6">
        {renderSectionHeader()}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (!forcesData) {
    return (
      <section className="mb-12 animate-fade-in space-y-6">
        {renderSectionHeader()}
        <div className="text-center py-8 text-gray-500">
          Analysis data is being processed...
        </div>
      </section>
    );
  }

  // Render forces data
  return (
    <section className="mb-12 animate-fade-in space-y-6">
      {renderSectionHeader()}
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
