
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Clock, TrendingUp, TrendingDown, Flame, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';

const MarketTrends = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-6">
        {/* Reports Available Card */}
        <Card className="border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-blue-600">999/999</div>
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-sm font-medium mb-1">Reports Available</div>
              <div className="flex items-center text-xs text-blue-600">
                <Clock className="h-3 w-3 mr-1" />
                <span>Available now</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Unlimited Plan</div>
            </div>
          </CardContent>
        </Card>

        {/* Sustainable Products Card */}
        <Card className="border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-green-600">+15%</div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm font-medium mb-1">Sustainable products</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last 24hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Newspapers Card */}
        <Card className="border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-red-600">-24%</div>
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-sm font-medium mb-1">Print newspapers</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last 24hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hot Opportunity Card */}
        <Card className="border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-amber-600">27.3K</div>
                <Flame className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-sm font-medium mb-1">Hot Opportunity</div>
              <div className="text-xs font-medium text-amber-600">AI-Powered Cooking Tools</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span> High
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span> Low
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Section */}
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
    </div>
  );
};

export default MarketTrends;
