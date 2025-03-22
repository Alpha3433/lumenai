
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface RiskAssessmentSectionProps {
  riskAssessmentText: string;
}

const RiskAssessmentSection: React.FC<RiskAssessmentSectionProps> = ({ riskAssessmentText }) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-red-500" />
        Risk Assessment
      </h2>
      <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-5">
          <div className="prose dark:prose-invert max-w-none text-sm">
            <p className="leading-relaxed">{riskAssessmentText || "Loading..."}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RiskAssessmentSection;
