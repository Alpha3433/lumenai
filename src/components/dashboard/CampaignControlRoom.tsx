
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

// This component is kept for backwards compatibility but is not used in the dashboard anymore
const CampaignControlRoom = () => {
  // Sample campaign data - in a real app, these would come from a database
  const campaignData = {
    facebookAds: {
      impressions: '24,500',
      clicks: '1,230',
      conversions: '78',
      ctr: '5.02%',
      change: '+15%'
    },
    websiteTraffic: {
      visitors: '9,845',
      pageviews: '32,456',
      avgTime: '2:34',
      bounceRate: '38.2%',
      change: '+8%'
    }
  };
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Campaign Control Room
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook Ads Panel */}
          <div className="p-4 bg-white dark:bg-gray-800/60 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-1">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-md">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                Facebook Ads
              </h3>
              <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                {campaignData.facebookAds.change} <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Impressions</p>
                <p className="text-lg font-semibold">{campaignData.facebookAds.impressions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
                <p className="text-lg font-semibold">{campaignData.facebookAds.clicks}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Conversions</p>
                <p className="text-lg font-semibold">{campaignData.facebookAds.conversions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">CTR</p>
                <p className="text-lg font-semibold">{campaignData.facebookAds.ctr}</p>
              </div>
            </div>
          </div>
          
          {/* Website Traffic Panel */}
          <div className="p-4 bg-white dark:bg-gray-800/60 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-1">
                <div className="bg-violet-100 dark:bg-violet-900/40 p-1 rounded-md">
                  <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                Website Traffic
              </h3>
              <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                {campaignData.websiteTraffic.change} <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Visitors</p>
                <p className="text-lg font-semibold">{campaignData.websiteTraffic.visitors}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Pageviews</p>
                <p className="text-lg font-semibold">{campaignData.websiteTraffic.pageviews}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Avg. Time</p>
                <p className="text-lg font-semibold">{campaignData.websiteTraffic.avgTime}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">Bounce Rate</p>
                <p className="text-lg font-semibold">{campaignData.websiteTraffic.bounceRate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignControlRoom;
