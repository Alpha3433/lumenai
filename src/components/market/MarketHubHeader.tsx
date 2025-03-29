
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface MarketHubHeaderProps {
  onRefresh?: () => void;
}

const MarketHubHeader: React.FC<MarketHubHeaderProps> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast({
        title: "Refreshing data",
        description: "Fetching the latest market insights for you",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-10 pt-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Business Hub</h1>
        <p className="text-muted-foreground">Your command center for market trends and business intelligence</p>
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          size="sm"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
        <Button 
          className="flex items-center gap-2"
          size="sm"
          onClick={() => navigate('/create')}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Report</span>
        </Button>
      </div>
    </div>
  );
};

export default MarketHubHeader;
