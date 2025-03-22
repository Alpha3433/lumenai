
import React from 'react';
import { extractValidationData } from '@/utils/businessValidation';
import ValidationScoreCard from './validation/ValidationScoreCard';
import RecommendationsCard from './validation/RecommendationsCard';
import FormattedValidationContent from './validation/FormattedValidationContent';

interface BusinessValidationScoreProps {
  businessText: string;
}

const BusinessValidationScore = ({ businessText }: BusinessValidationScoreProps) => {
  const validationData = extractValidationData(businessText);
  
  return (
    <div className="space-y-6">
      {/* Overall score card */}
      <ValidationScoreCard validationData={validationData} />
      
      {/* Formatted validation content with improved parsing */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <FormattedValidationContent validationText={businessText} />
      </div>
      
      {/* Recommendations */}
      <RecommendationsCard 
        score={validationData.overallScore} 
      />
    </div>
  );
};

export default BusinessValidationScore;
