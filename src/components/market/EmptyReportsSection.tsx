
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyReportsSection: React.FC = () => {
  const navigate = useNavigate();
  
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
