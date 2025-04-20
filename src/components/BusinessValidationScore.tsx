
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { extractValidationData } from '@/utils/businessValidation';
import ScoreOverview from './validation/ScoreOverview';
import ValidationMetrics from './validation/ValidationMetrics';

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
        
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{businessName}</h2>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {validationData.category || "Sustainable Food"}
              </Badge>
            </div>
            
            <ValidationMetrics
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
