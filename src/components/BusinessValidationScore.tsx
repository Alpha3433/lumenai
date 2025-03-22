
import React from 'react';
import { extractValidationData } from '@/utils/businessValidationUtils';
import ValidationScoreCard from './validation/ValidationScoreCard';
import StrengthsAndChallenges from './validation/StrengthsAndChallenges';
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
      
      {/* Pros and cons */}
      <StrengthsAndChallenges 
        positives={validationData.positives} 
        negatives={validationData.negatives} 
      />
      
      {/* Recommendations */}
      <RecommendationsCard 
        score={validationData.overallScore} 
        recommendations={validationData.recommendations} 
      />
    </div>
  );
};

export default BusinessValidationScore;
