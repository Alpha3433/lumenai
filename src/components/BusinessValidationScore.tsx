
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        />
        <Card className="p-6 bg-white/95 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-semibold">{businessName}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {validationData.description || businessText.slice(0, 100) + "..."}
            </p>
            <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {validationData.category || "Sustainable Food"}
            </Badge>
          </div>
          <StrengthsAndChallenges
            positives={validationData.positives}
            negatives={validationData.negatives}
          />
        </Card>
      </div>
    </div>
  );
};

export default BusinessValidationScore;
