
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from "@/hooks/use-toast";
import { generateMarketTrendData, type MarketTrendStats } from '@/utils/marketTrendsData';
import MarketHubHeader from '@/components/market/MarketHubHeader';
import MarketStatsCards from '@/components/market/MarketStatsCards';
import EmptyReportsSection from '@/components/market/EmptyReportsSection';
import LoadingState from '@/components/market/LoadingState';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GanttChart, Rocket, TrendingUp } from 'lucide-react';

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const MarketTrends: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [marketData, setMarketData] = useState<MarketTrendStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to load and update market data
  const updateMarketData = () => {
    setLoading(true);
    
    // Add a slight delay to simulate loading
    setTimeout(() => {
      // Generate new mock data
      const newData = generateMarketTrendData();
      
      // Update state with new data
      setMarketData(newData);
      setLoading(false);
    }, 600);
  };

  // Initialize data and set up refresh timer
  useEffect(() => {
    // Load initial data
    updateMarketData();
    
    // Set up timer to refresh data every 12 hours
    const intervalId = setInterval(() => {
      updateMarketData();
    }, TWELVE_HOURS_MS);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading || !marketData) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <div className="mt-16">
        <MarketHubHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className="mr-4 bg-blue-100 dark:bg-blue-800/40 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Market Insights</h3>
                <p className="text-sm text-muted-foreground">Discover market trends and opportunities</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800 shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className="mr-4 bg-purple-100 dark:bg-purple-800/40 p-3 rounded-full">
                <GanttChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Competitor Analysis</h3>
                <p className="text-sm text-muted-foreground">Track your competitors' strategies</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-100 dark:border-green-800 shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className="mr-4 bg-green-100 dark:bg-green-800/40 p-3 rounded-full">
                <Rocket className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Business Opportunities</h3>
                <p className="text-sm text-muted-foreground">Find niches with growth potential</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <MarketStatsCards marketData={marketData} />
        <EmptyReportsSection />
      </div>
    </div>
  );
};

export default MarketTrends;
