
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface BusinessPlanActionBarProps {
  businessName: string;
  onStartOver: () => void;
  onDownload: () => void;
}

const BusinessPlanActionBar: React.FC<BusinessPlanActionBarProps> = ({
  businessName,
  onStartOver,
  onDownload
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{businessName} Business Plan</h1>
        <p className="text-gray-600 dark:text-gray-300">Generated based on your inputs</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={onStartOver}
        >
          Start Over
        </Button>
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>
    </div>
  );
};

export default BusinessPlanActionBar;
