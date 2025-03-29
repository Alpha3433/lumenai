
import React from 'react';
import { CheckCircle2 } from "lucide-react";

interface PlanFeaturesListProps {
  features: string[];
}

const PlanFeaturesList: React.FC<PlanFeaturesListProps> = ({ features }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Plan Features:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanFeaturesList;
