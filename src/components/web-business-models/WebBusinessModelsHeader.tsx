
import React from 'react';
import { RefreshCw, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WebBusinessModelsHeaderProps {
  onRefresh: () => void;
  loading: boolean;
  refreshing: boolean;
  companyName?: string;
  industry?: string;
}

const WebBusinessModelsHeader: React.FC<WebBusinessModelsHeaderProps> = ({ 
  onRefresh, 
  loading, 
  refreshing,
  companyName,
  industry
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold">
          {companyName 
            ? `Web Business Models for ${companyName}` 
            : "Web Business Models"}
          {industry && <span className="text-sm ml-2 text-gray-500">({industry})</span>}
        </h2>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={loading || refreshing}
        className="h-8 gap-1.5"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        <span className="text-xs">Refresh</span>
      </Button>
    </div>
  );
};

export default WebBusinessModelsHeader;
