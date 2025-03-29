
import React from 'react';
import { PestelData } from '@/utils/pestel';
import PestelAnalysisCard from './PestelAnalysisCard';

interface PestelAnalysisCategoryGridProps {
  pestelData: PestelData;
  companyName?: string;
  industry?: string;
}

const PestelAnalysisCategoryGrid: React.FC<PestelAnalysisCategoryGridProps> = ({ 
  pestelData,
  companyName,
  industry
}) => {
  // Ensure each category has exactly 4 concise points
  const processPoints = (category: keyof PestelData) => {
    // Take first 4 points or fill with empty if less than 4
    const points = pestelData[category].slice(0, 4);
    
    // Ensure points are concise (trim to 120 chars if longer)
    return points.map(point => 
      point.length > 120 ? `${point.substring(0, 120)}...` : point
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PestelAnalysisCard 
        category="political" 
        points={processPoints('political')}
        companyName={companyName}
        industry={industry} 
      />
      <PestelAnalysisCard 
        category="economic" 
        points={processPoints('economic')}
        companyName={companyName}
        industry={industry} 
      />
      <PestelAnalysisCard 
        category="social" 
        points={processPoints('social')}
        companyName={companyName}
        industry={industry} 
      />
      <PestelAnalysisCard 
        category="technological" 
        points={processPoints('technological')}
        companyName={companyName}
        industry={industry} 
      />
      <PestelAnalysisCard 
        category="environmental" 
        points={processPoints('environmental')}
        companyName={companyName}
        industry={industry} 
      />
      <PestelAnalysisCard 
        category="legal" 
        points={processPoints('legal')}
        companyName={companyName}
        industry={industry} 
      />
    </div>
  );
};

export default PestelAnalysisCategoryGrid;
