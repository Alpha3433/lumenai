
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
        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
          <ScoreOverview 
            score={validationData.overallScore}
            previousScore={previousScore}
            industryAverage={62}
            topCompetitor={78}
          />
        </Card>
        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{businessName}</h2>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100">
                {validationData.category || "Sustainable Food"}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {validationData.description || businessText.slice(0, 100) + "..."}
            </p>
            <StrengthsAndChallenges
              positives={validationData.positives}
              negatives={validationData.negatives}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusinessValidationScore;
