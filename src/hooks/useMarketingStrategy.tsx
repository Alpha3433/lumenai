
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

export function useMarketingStrategy(businessName: string, businessDescription: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketingStrategy', businessName, businessDescription],
    queryFn: async () => {
      const result = await generateDynamicContent({
        sectionType: 'marketing-strategy',
        businessName,
        businessDescription
      });
      return result as MarketingStrategyData;
    },
    enabled: !!businessName && !!businessDescription
  });

  return {
    marketingStrategy: data,
    isLoading,
    error,
    refetch
  };
}

