
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Edit2 } from 'lucide-react';

interface BusinessPlanActionBarProps {
  businessName: string;
  onStartOver: () => void;
  onDownload: () => void;
  onEdit?: () => void; // Added optional edit handler
}

const BusinessPlanActionBar: React.FC<BusinessPlanActionBarProps> = ({
  businessName,
  onStartOver,
  onDownload,
  onEdit
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{businessName} Strategic Business Report</h1>
        <p className="text-gray-600 dark:text-gray-300">Professional analysis based on your inputs</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={onStartOver}
        >
          Start Over
        </Button>
        
        {onEdit && (
          <Button 
            variant="outline" 
            className="rounded-full flex items-center gap-2"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" /> Edit Info
          </Button>
        )}
        
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
