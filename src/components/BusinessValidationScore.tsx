
import React from 'react';
import { Card } from "@/components/ui/card";
import { extractValidationData } from '@/utils/businessValidation';
import ScoreOverview from './validation/ScoreOverview';

interface BusinessValidationScoreProps {
  businessText: string;
  businessName?: string;
}

const BusinessValidationScore = ({ businessText, businessName = "New Business" }: BusinessValidationScoreProps) => {
  const validationData = extractValidationData(businessText);
  
  return (
    <div className="space-y-6">
      <ScoreOverview 
        score={validationData.overallScore}
        industryAverage={62}
        topCompetitor={78}
        businessName={businessName}
        category={validationData.category || "Business"}
        businessDescription={validationData.description || businessText.slice(0, 150) + "..."}
      />
    </div>
  );
};

export default BusinessValidationScore;
