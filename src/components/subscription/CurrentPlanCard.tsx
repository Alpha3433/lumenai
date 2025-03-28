
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface PlanInfo {
  name: string;
  price: string;
  billing: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface CurrentPlanCardProps {
  planInfo: PlanInfo;
}

const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ planInfo }) => {
  return (
    <div className={`p-4 rounded-lg ${planInfo.bgColor} ${planInfo.borderColor} border`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-medium ${planInfo.color}`}>{planInfo.name}</h3>
        <Badge variant="outline" className={`${planInfo.color} ${planInfo.bgColor} border-none`}>
          Current Plan
        </Badge>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="font-bold text-lg">{planInfo.price}</span> billed {planInfo.billing}
      </p>
    </div>
  );
};

export default CurrentPlanCard;
