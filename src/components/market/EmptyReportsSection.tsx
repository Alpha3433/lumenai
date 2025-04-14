import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StoredBusinessPlan } from '@/utils/supabaseClient';

interface EmptyReportsSectionProps {
  plans?: StoredBusinessPlan[];
}

const EmptyReportsSection: React.FC<EmptyReportsSectionProps> = ({ plans = [] }) => {
  const navigate = useNavigate();
  
  // If we have plans, show the most recent one
  if (plans && plans.length > 0) {
    const latestPlan = plans[0]; // Assuming plans are sorted by date (newest first)
    
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Recent Reports</h2>
            <p className="text-sm text-muted-foreground">Your latest market research projects</p>
          </div>

          {/* Latest Plan Summary */}
          <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">{latestPlan.business_name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {latestPlan.industry || 'Business'} • Created on {new Date(latestPlan.created_at).toLocaleDateString()}
            </p>
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/plan/${latestPlan.id}`)}
                className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                View Report
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/create')}
                className="text-sm"
              >
                <FilePlus className="mr-1.5 h-3.5 w-3.5" />
                Create New
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Otherwise show empty state
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Recent Reports</h2>
          <p className="text-sm text-muted-foreground">Your latest market research projects</p>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">You haven't created any reports yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Get started by creating your first market research report to uncover profitable niches
          </p>
          <Button 
            onClick={() => navigate('/create')} 
            className="bg-black hover:bg-black/90 text-white"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Create your first report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyReportsSection;
