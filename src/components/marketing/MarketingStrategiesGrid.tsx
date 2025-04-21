
import React from 'react';
import { Compass, Megaphone, Calendar, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketingStrategiesGridProps {
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

const MarketingStrategiesGrid: React.FC<MarketingStrategiesGridProps> = ({
  positioning,
  channels,
  promotional,
  acquisition
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Positioning Strategy */}
      <Card className="border-purple-200 dark:border-purple-800/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400">
              Positioning Strategy
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {positioning.statement}
          </p>
          <div className="space-y-3">
            {positioning.uniqueValue.map((value, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Channels */}
      <Card className="border-green-200 dark:border-green-800/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-lg text-green-600 dark:text-green-400">
              Marketing Channels
            </h3>
          </div>
          <div className="space-y-4">
            {channels.primary.map((channel, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-1">
                  {channel.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {channel.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Promotional Activities */}
      <Card className="border-amber-200 dark:border-amber-800/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-lg text-amber-600 dark:text-amber-400">
              Promotional Activities
            </h3>
          </div>
          <div className="space-y-4">
            {promotional.campaigns.map((campaign, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-900/20">
                <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-1">
                  {campaign.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {campaign.description}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Timeline: {campaign.timeline}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Acquisition */}
      <Card className="border-blue-200 dark:border-blue-800/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">
              Customer Acquisition
            </h3>
          </div>
          <div className="space-y-4">
            {acquisition.strategies.map((strategy, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {strategy.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {strategy.description}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Key Metric: {strategy.metric}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStrategiesGrid;

