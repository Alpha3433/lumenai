
import React from 'react';
import { Target, Users, Megaphone, Calendar, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MarketingSectionHeader from './marketing/MarketingSectionHeader';
import MarketingRoadmapVisualizer from './marketing/MarketingRoadmapVisualizer';
import MarketingStrategyCard from './marketing/MarketingStrategyCard';
import MarketingSection from './marketing/MarketingSection';
import { extractSections, extractBulletPoints } from './marketing/ExtractSections';

// Helper to reduce to 4 concise points
function getFourPoints(points: string[] = []): string[] {
  return points.filter(Boolean).slice(0, 4).map((pt) =>
    pt.length > 120 ? pt.substring(0, 110).trim() + '...' : pt
  );
}

interface MarketingPlanSectionProps {
  marketingPlanText: string;
  businessName?: string;
  businessDescription?: string;
}

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({
  marketingPlanText,
  businessName = "Business",
  businessDescription = ""
}) => {
  // Parse all relevant data
  const sections = extractSections(marketingPlanText);

  // Always extract dot points with fallback and condense to 4 points each
  const dotPoints = {
    targetAudience: getFourPoints(
      sections.audience.flatMap(paragraph => extractBulletPoints(paragraph))
    ),
    positioning: getFourPoints(
      sections.positioning.flatMap(paragraph => extractBulletPoints(paragraph))
    ),
    marketingChannels: getFourPoints(
      sections.channels.flatMap(paragraph => extractBulletPoints(paragraph))
    ),
    promotional: getFourPoints(
      sections.promotional.flatMap(paragraph => extractBulletPoints(paragraph))
    ),
    acquisition: getFourPoints(
      sections.acquisition.flatMap(paragraph => extractBulletPoints(paragraph))
    )
  };

  return (
    <section className="mb-12">
      <MarketingSectionHeader />

      <MarketingRoadmapVisualizer
        businessName={businessName}
        marketingPlanText={marketingPlanText}
      />

      <MarketingStrategyCard title="Marketing Strategy">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketingSection
            title="Target Audience"
            icon={<Target className="h-4 w-4" />}
            items={dotPoints.targetAudience}
          />
          <MarketingSection
            title="Positioning Strategy"
            icon={<Users className="h-4 w-4" />}
            items={dotPoints.positioning}
            checkColor="purple-500"
          />
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketingSection
            title="Marketing Channels"
            icon={<Megaphone className="h-4 w-4" />}
            items={dotPoints.marketingChannels}
            checkColor="green-500"
          />
          <MarketingSection
            title="Promotional Activities"
            icon={<Calendar className="h-4 w-4" />}
            items={dotPoints.promotional}
            checkColor="amber-500"
          />
          <MarketingSection
            title="Customer Acquisition"
            icon={<Activity className="h-4 w-4" />}
            items={dotPoints.acquisition}
            checkColor="blue-500"
          />
        </div>
      </MarketingStrategyCard>
    </section>
  );
};

export default MarketingPlanSection;
