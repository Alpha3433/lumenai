
import React from 'react';
import { Separator } from '@/components/ui/separator';
import MarketingSectionHeader from './marketing/MarketingSectionHeader';
import MarketingStrategiesGrid from './marketing/MarketingStrategiesGrid';
import TargetAudienceSection from './marketing/TargetAudienceSection';
import { useMarketingStrategy } from '@/hooks/useMarketingStrategy';

interface MarketingPlanSectionProps {
  businessName: string;
  businessDescription: string;
}

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({
  businessName,
  businessDescription
}) => {
  const { marketingStrategy, isLoading, error } = useMarketingStrategy(
    businessName,
    businessDescription
  );

  if (error) {
    return (
      <div className="p-8 text-center text-gray-500">
        Unable to load marketing strategy. Please try again later.
      </div>
    );
  }

  if (isLoading || !marketingStrategy) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-100 dark:bg-gray-900 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <MarketingSectionHeader />
      
      <div className="space-y-6">
        <TargetAudienceSection 
          segments={marketingStrategy.targetAudience.segments}
          insights={marketingStrategy.targetAudience.insights}
        />
        
        <Separator className="my-8" />
        
        <MarketingStrategiesGrid 
          positioning={marketingStrategy.positioning}
          channels={marketingStrategy.channels}
          promotional={marketingStrategy.promotional}
          acquisition={marketingStrategy.acquisition}
        />
      </div>
    </section>
  );
};

export default MarketingPlanSection;

