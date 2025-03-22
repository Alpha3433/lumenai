
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';

interface TargetAudienceCardProps {
  audience: string | undefined;
  growth: string | undefined;
}

const TargetAudienceCard: React.FC<TargetAudienceCardProps> = ({ audience, growth }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-muted-foreground">Target Audience</h3>
          <Users className="h-4 w-4 text-purple-500" />
        </div>
        <div className="mt-3">
          <p className="text-base font-medium">{audience || "Multi-segment Approach"}</p>
          <p className="text-sm text-muted-foreground mt-1">{growth || "Growth analysis pending"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetAudienceCard;
