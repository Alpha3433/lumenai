
import React from 'react';
import { Globe } from 'lucide-react';
import { PestelData } from '@/utils/pestel';
import PestelAnalysisCategoryGrid from './PestelAnalysisCategoryGrid';
import PestelSectionHeader from './PestelSectionHeader';

interface PestelAnalysisSectionProps {
  pestelData: PestelData;
}

const PestelAnalysisSection: React.FC<PestelAnalysisSectionProps> = ({ pestelData }) => {
  return (
    <section className="mb-12 animate-fade-in space-y-6">
      <PestelSectionHeader />
      <PestelAnalysisCategoryGrid pestelData={pestelData} />
    </section>
  );
};

export default PestelAnalysisSection;
