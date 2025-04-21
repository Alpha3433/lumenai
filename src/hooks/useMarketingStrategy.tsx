
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';

export interface MarketingStrategyData {
  targetAudience: {
    segments: { title: string; description: string }[];
    insights: string[];
  };
  positioning: {
    statement: string;
    uniqueValue: string[];
    differentiators: string[];
  };
  channels: {
    primary: { name: string; description: string }[];
    secondary: { name: string; description: string }[];
  };
  promotional: {
    campaigns: { title: string; description: string; timeline: string }[];
    activities: string[];
  };
  acquisition: {
    strategies: { name: string; description: string; metric: string }[];
  };
}

// Default marketing strategy to use as fallback
const defaultMarketingStrategy: MarketingStrategyData = {
  targetAudience: {
    segments: [],
    insights: []
  },
  positioning: {
    statement: '',
    uniqueValue: [],
    differentiators: []
  },
  channels: {
    primary: [],
    secondary: []
  },
  promotional: {
    campaigns: [],
    activities: []
  },
  acquisition: {
    strategies: []
  }
};

export function useMarketingStrategy(businessName: string, businessDescription: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketingStrategy', businessName, businessDescription],
    queryFn: async () => {
      try {
        const result = await generateDynamicContent({
          sectionType: 'marketing-strategy',
          businessName,
          businessDescription
        });
        return result as MarketingStrategyData;
      } catch (err) {
        console.error('Error generating marketing strategy:', err);
        // Return the default structure to prevent undefined errors
        return defaultMarketingStrategy;
      }
    },
    enabled: !!businessName && !!businessDescription,
    // Use default strategy as fallback
    placeholderData: defaultMarketingStrategy 
  });

  return {
    marketingStrategy: data || defaultMarketingStrategy,
    isLoading,
    error,
    refetch
  };
}
