
import React from 'react';
import { extractValidationData } from '@/utils/businessValidationUtils';
import ValidationScoreCard from './validation/ValidationScoreCard';
import RecommendationsCard from './validation/RecommendationsCard';

interface BusinessValidationScoreProps {
  businessText: string;
}

const BusinessValidationScore = ({ businessText }: BusinessValidationScoreProps) => {
  const validationData = extractValidationData(businessText);
  
  return (
    <div className="space-y-6">
      {/* Overall score card */}
      <ValidationScoreCard validationData={validationData} />
      
      {/* Recommendations - summary only */}
      <RecommendationsCard 
        score={validationData.overallScore} 
      />
    </div>
  );
};

export default BusinessValidationScore;
