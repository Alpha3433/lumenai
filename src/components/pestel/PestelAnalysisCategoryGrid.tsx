
import React from 'react';
import { PestelData } from '@/utils/pestelUtils';
import PestelAnalysisCard from './PestelAnalysisCard';

interface PestelAnalysisCategoryGridProps {
  pestelData: PestelData;
}

const PestelAnalysisCategoryGrid: React.FC<PestelAnalysisCategoryGridProps> = ({ pestelData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PestelAnalysisCard category="political" points={pestelData.political} />
      <PestelAnalysisCard category="economic" points={pestelData.economic} />
      <PestelAnalysisCard category="social" points={pestelData.social} />
      <PestelAnalysisCard category="technological" points={pestelData.technological} />
      <PestelAnalysisCard category="environmental" points={pestelData.environmental} />
      <PestelAnalysisCard category="legal" points={pestelData.legal} />
    </div>
  );
};

export default PestelAnalysisCategoryGrid;
