
import React from 'react';
import { Card } from "@/components/ui/card";
import { extractValidationData } from '@/utils/businessValidation';
import ScoreOverview from './validation/ScoreOverview';
import StrengthsAndChallenges from './validation/StrengthsAndChallenges';

interface BusinessValidationScoreProps {
  businessText: string;
  businessName?: string;
  previousScore?: number;
}

const BusinessValidationScore = ({ 
  businessText, 
  businessName = "New Business",
  previousScore
}: BusinessValidationScoreProps) => {
  const validationData = extractValidationData(businessText);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreOverview 
          score={validationData.overallScore}
          previousScore={previousScore}
          industryAverage={62}
          topCompetitor={78}
          businessName={businessName}
          category={validationData.category || "Business"}
          businessDescription={validationData.description || businessText.slice(0, 150) + "..."}
        />
        <StrengthsAndChallenges
          positives={validationData.positives}
          negatives={validationData.negatives}
        />
      </div>
    </div>
  );
};

export default BusinessValidationScore;
