
import React from 'react';
import { Target, Users, Megaphone, Calendar, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useMarketingPlan } from '@/hooks/useMarketingPlan';
import MarketingSectionHeader from './marketing/MarketingSectionHeader';
import MarketingRoadmapVisualizer from './marketing/MarketingRoadmapVisualizer';
import MarketingStrategyCard from './marketing/MarketingStrategyCard';
import MarketingSection from './marketing/MarketingSection';
import PositioningStrategySection from './marketing/PositioningStrategySection';
import GeneralSectionsRenderer from './marketing/GeneralSectionsRenderer';
import { extractSections, extractBulletPoints } from './marketing/ExtractSections';

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
  const { parsedData } = useMarketingPlan(
    businessName,
    businessDescription,
    marketingPlanText
  );
  
  const sections = extractSections(marketingPlanText);
  
  return (
    <section className="mb-12">
      <MarketingSectionHeader />
      
      {/* Marketing Roadmap Visualization */}
      <MarketingRoadmapVisualizer 
        businessName={businessName}
        marketingPlanText={marketingPlanText}
      />
      
      {/* Main Marketing Plan Content */}
      <MarketingStrategyCard title="Marketing Strategy">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Audience Section */}
          {parsedData?.targetAudience && parsedData.targetAudience.length > 0 ? (
            <MarketingSection 
              title="Target Audience"
              icon={<Target className="h-4 w-4" />}
              items={parsedData.targetAudience}
            />
          ) : sections.audience.length > 0 ? (
            <MarketingSection 
              title="Target Audience"
              icon={<Users className="h-4 w-4" />}
              items={sections.audience.flatMap(paragraph => extractBulletPoints(paragraph))}
            />
          ) : null}
          
          {/* Positioning Section */}
          {parsedData?.positioningStrategy && parsedData.positioningStrategy.length > 0 ? (
            <PositioningStrategySection paragraphs={parsedData.positioningStrategy} />
          ) : sections.positioning.length > 0 ? (
            <PositioningStrategySection paragraphs={sections.positioning} />
          ) : null}
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Marketing Channels Section */}
          {parsedData?.marketingChannels && parsedData.marketingChannels.length > 0 ? (
            <MarketingSection 
              title="Marketing Channels"
              icon={<Megaphone className="h-4 w-4" />}
              items={parsedData.marketingChannels}
              checkColor="green-500"
            />
          ) : sections.channels.length > 0 ? (
            <MarketingSection 
              title="Marketing Channels"
              icon={<Megaphone className="h-4 w-4" />}
              items={sections.channels.flatMap(paragraph => extractBulletPoints(paragraph))}
              checkColor="green-500"
            />
          ) : null}
          
          {/* Promotional Activities Section */}
          {parsedData?.promotionalActivities && parsedData.promotionalActivities.length > 0 ? (
            <MarketingSection 
              title="Promotional Activities"
              icon={<Calendar className="h-4 w-4" />}
              items={parsedData.promotionalActivities}
              checkColor="amber-500"
            />
          ) : sections.promotional.length > 0 ? (
            <MarketingSection 
              title="Promotional Activities"
              icon={<Calendar className="h-4 w-4" />}
              items={sections.promotional.flatMap(paragraph => extractBulletPoints(paragraph))}
              checkColor="amber-500"
            />
          ) : null}
          
          {/* Customer Acquisition Section */}
          {parsedData?.customerAcquisition && parsedData.customerAcquisition.length > 0 ? (
            <MarketingSection 
              title="Customer Acquisition"
              icon={<Activity className="h-4 w-4" />}
              items={parsedData.customerAcquisition}
              checkColor="blue-500"
            />
          ) : sections.acquisition.length > 0 ? (
            <MarketingSection 
              title="Customer Acquisition"
              icon={<Activity className="h-4 w-4" />}
              items={sections.acquisition.flatMap(paragraph => extractBulletPoints(paragraph))}
              checkColor="blue-500"
            />
          ) : null}
        </div>
        
        {/* Any general/remaining sections */}
        <GeneralSectionsRenderer sections={sections.general} />
      </MarketingStrategyCard>
    </section>
  );
};

export default MarketingPlanSection;
