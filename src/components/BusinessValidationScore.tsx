
import React from 'react';
import { extractValidationData } from '@/utils/businessValidation';
import NewBusinessValidationScore from '@/components/validation/NewBusinessValidationScore';

interface BusinessValidationScoreProps {
  businessText: string;
  businessName?: string;
  previousScore?: number;
}

const BusinessValidationScore: React.FC<BusinessValidationScoreProps> = ({
  businessText,
  businessName = "New Business",
  previousScore
}) => {
  const validationData = extractValidationData(businessText);
  
  const scores = validationData.categories.map(category => ({
    category: category.name.toLowerCase(),
    score: category.score,
    label: category.name,
    description: getCategoryDescription(category.name),
  }));

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <NewBusinessValidationScore 
        businessName={businessName}
        overallScore={validationData.overallScore}
        scores={scores}
        strengths={validationData.positives || []}
        weaknesses={validationData.negatives || []}
      />
    </div>
  );
};

const getCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    'Market Need': 'Analysis of market demand and customer pain points',
    'Profitability': 'Potential for generating sustainable revenue',
    'Competition': 'Competitive landscape and market positioning',
    'Time to Market': 'Speed and feasibility of implementation',
    'Scalability': 'Potential for growth and expansion',
  };
  return descriptions[category] || '';
};

export default BusinessValidationScore;
