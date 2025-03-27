
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from "@/hooks/use-toast";
import { generateMarketTrendData, type MarketTrendStats } from '@/utils/marketTrendsData';
import MarketTrendHeader from '@/components/market/MarketTrendHeader';
import MarketStatsCards from '@/components/market/MarketStatsCards';
import EmptyReportsSection from '@/components/market/EmptyReportsSection';
import LoadingState from '@/components/market/LoadingState';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';

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
        <MarketTrendHeader />
        
        <MarketStatsCards marketData={marketData} />
        
        <BusinessIdeaGenerator />
        
        <EmptyReportsSection />
      </div>
    </div>
  );
};

export default MarketTrends;
