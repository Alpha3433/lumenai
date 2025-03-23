
import React, { useMemo } from 'react';
import { Globe } from 'lucide-react';
import { extractPestelData } from '@/utils/pestelUtils';
import PestelAnalysisCard from './pestel/PestelAnalysisCard';

interface PestelAnalysisSectionProps {
  analysisText: string;
}

const PestelAnalysisSection: React.FC<PestelAnalysisSectionProps> = ({ analysisText }) => {
  // Extract PESTEL data from analysis text
  const pestelData = useMemo(() => extractPestelData(analysisText), [analysisText]);

  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mx-auto md:mx-0">
          <Globe className="h-6 w-6 text-blue-500" />
          PESTEL Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          Macro-environmental factors
        </div>
      </div>

      {/* PESTEL Grid - 2x3 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PestelAnalysisCard category="political" points={pestelData.political} />
        <PestelAnalysisCard category="economic" points={pestelData.economic} />
        <PestelAnalysisCard category="social" points={pestelData.social} />
        <PestelAnalysisCard category="technological" points={pestelData.technological} />
        <PestelAnalysisCard category="environmental" points={pestelData.environmental} />
        <PestelAnalysisCard category="legal" points={pestelData.legal} />
      </div>
    </section>
  );
};

export default PestelAnalysisSection;
