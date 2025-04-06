
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Users } from 'lucide-react';

interface PartnershipPipelineProps {
  businessName: string;
  businessDescription: string;
}

const PartnershipPipeline: React.FC<PartnershipPipelineProps> = ({
  businessName,
  businessDescription
}) => {
  const { influencers } = generatePartnershipData(businessName);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Handshake className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Partnership Pipeline
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Strategic relationship development
        </div>
      </div>

      <div className="space-y-6">
        {/* Influencers */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold">Influencer Partnerships</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{influencers.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {influencers.targets.map((influencer, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{influencer.name}</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{influencer.platform}</div>
                    <div className="text-xs font-medium mt-1">{influencer.audience}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generatePartnershipData(businessName: string) {
  const influencers = {
    description: `Collaborate with relevant influencers who can authentically promote ${businessName} to their engaged audiences.`,
    targets: [
      {
        name: "Health & Wellness",
        platform: "Instagram/YouTube",
        audience: "1M+ followers"
      },
      {
        name: "Medical Professionals",
        platform: "LinkedIn/Twitter",
        audience: "Industry respect"
      },
      {
        name: "Transformation Stories",
        platform: "TikTok/Instagram",
        audience: "Authentic journeys"
      },
      {
        name: "Corporate Wellness",
        platform: "LinkedIn/Podcasts",
        audience: "B2B decision makers"
      },
      {
        name: "Fitness Experts",
        platform: "YouTube/Instagram",
        audience: "Dedicated followers"
      },
      {
        name: "Lifestyle Bloggers",
        platform: "Blogs/Instagram",
        audience: "High engagement"
      }
    ]
  };

  return { influencers };
}

export default PartnershipPipeline;
