
import React from 'react';
import { Globe } from 'lucide-react';
import { PestelData } from '@/utils/pestel';
import PestelAnalysisCategoryGrid from './PestelAnalysisCategoryGrid';
import { usePestelAnalysis } from '@/hooks/usePestelAnalysis';
import { Skeleton } from '@/components/ui/skeleton';

interface PestelAnalysisSectionProps {
  analysisText?: string;
  businessName?: string;
  businessDescription?: string;
  pestelData?: PestelData | null;
}

const PestelAnalysisSection: React.FC<PestelAnalysisSectionProps> = ({ 
  pestelData: providedPestelData, 
  analysisText = '', 
  businessName = '',
  businessDescription = ''
}) => {
  // Use the custom hook to get PESTEL data
  const { pestelData: generatedPestelData, isLoading } = usePestelAnalysis(
    analysisText,
    businessName,
    businessDescription
  );
  
  // Use provided pestelData if available, otherwise use the generated data
  const finalPestelData = providedPestelData || generatedPestelData;

  // Section header with title
  const renderSectionHeader = () => (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <span className="text-lg font-medium">PESTEL Analysis</span>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <section className="mb-12 animate-fade-in space-y-6">
        {renderSectionHeader()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-32" />
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

  return (
    <section className="mb-12 animate-fade-in space-y-6">
      {renderSectionHeader()}
      {finalPestelData && <PestelAnalysisCategoryGrid pestelData={finalPestelData} />}
      {!finalPestelData && (
        <div className="text-center py-8 text-gray-500">
          Analysis data is being processed...
        </div>
      )}
    </section>
  );
};

export default PestelAnalysisSection;
