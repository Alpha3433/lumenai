
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, Plus } from 'lucide-react';
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
      <Card className="border border-purple-100 dark:border-purple-800/30 shadow-md mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 p-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-full">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold">Business Plans</h3>
          </div>
          <Button 
            onClick={() => navigate('/create')}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Plan
          </Button>
        </CardHeader>

        <CardContent className="p-5">
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
  
  // Empty state
  return (
    <Card className="border border-purple-100 dark:border-purple-800/30 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 p-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-full">
            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold">Business Plans</h3>
        </div>
        <Button 
          onClick={() => navigate('/create')}
          className="bg-indigo-600 hover:bg-indigo-700"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Plan
        </Button>
      </CardHeader>

      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
            <FileText className="h-10 w-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to Create Your First Business Plan</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Start building your entrepreneurial journey with our AI-powered platform. Create your first business plan to validate ideas and develop winning strategies.
          </p>
          <Button 
            onClick={() => navigate('/create')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Business Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyReportsSection;
