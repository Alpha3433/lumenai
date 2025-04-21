
import React from 'react';
import { Globe, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WebBusinessModelsHeaderProps {
  onRefresh: () => void;
  loading: boolean;
  refreshing: boolean;
}

const WebBusinessModelsHeader: React.FC<WebBusinessModelsHeaderProps> = ({ 
  onRefresh, 
  loading, 
  refreshing 
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center">Web Business Models</h2>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={loading || refreshing}
        className="text-xs mt-3"
      >
        {refreshing ? (
          <>
            <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
            Refreshing...
          </>
        ) : (
          <>
            <RefreshCw className="mr-1 h-3 w-3" />
            Refresh Models
          </>
        )}
      </Button>
    </div>
  );
};

export default WebBusinessModelsHeader;
