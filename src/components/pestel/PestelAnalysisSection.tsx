
import React from 'react';
import { Globe } from 'lucide-react';
import { PestelData } from '@/utils/pestel';
import PestelAnalysisCategoryGrid from './PestelAnalysisCategoryGrid';

interface PestelAnalysisSectionProps {
  pestelData: PestelData;
}

const PestelAnalysisSection: React.FC<PestelAnalysisSectionProps> = ({ pestelData }) => {
  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-lg font-medium">PESTEL Analysis</span>
      </div>
      <PestelAnalysisCategoryGrid pestelData={pestelData} />
    </section>
  );
};

export default PestelAnalysisSection;
