
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Target, TrendingUp } from 'lucide-react';

interface GoToMarketStrategyProps {
  businessName: string;
  businessDescription: string;
}

const GoToMarketStrategy: React.FC<GoToMarketStrategyProps> = ({
  businessName,
  businessDescription
}) => {
  const { phases, pilotTesting, scalingPlaybook } = generateGTMStrategy(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Go-To-Market (GTM) Strategy
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Launch and growth planning
        </div>
      </div>

      <div className="space-y-6">
        {/* Launch Phases */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Launch Phases</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phases.map((phase, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold mb-2">{phase.name}</h4>
                  <ul className="text-sm space-y-1">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pilot Testing */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              <h3 className="text-lg font-semibold">Pilot Testing</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{pilotTesting.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pilotTesting.partners.map((partner, index) => (
                <div key={index} className="px-3 py-2 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm">
                  {partner}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scaling Playbook */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />
              <h3 className="text-lg font-semibold">Scaling Playbook</h3>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div className="space-y-8 pl-10">
                {scalingPlaybook.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 border-2 border-green-500 flex items-center justify-center">
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{step.milestone}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generateGTMStrategy(businessName: string, businessDescription: string) {
  // This would ideally be dynamic based on the business description
  
  const phases = [
    {
      name: "Pre-launch",
      activities: [
        "Beta testing with 100 users",
        "Collect testimonials and feedback",
        "Refine product based on user insights",
        "Build waiting list and anticipation"
      ]
    },
    {
      name: "Launch",
      activities: [
        "Social media blitz across platforms",
        "Press release to industry publications",
        "Influencer partnerships go live",
        "Limited-time launch promotions"
      ]
    },
    {
      name: "Post-launch",
      activities: [
        "Retention campaigns for early users",
        "Feature enhancements based on usage",
        "Begin affiliate program rollout",
        "Ramp up content marketing efforts"
      ]
    }
  ];

  const pilotTesting = {
    description: `Partner with key organizations to gather real-world feedback and validate ${businessName}'s value proposition before full market launch.`,
    partners: [
      "Industry Leaders Association",
      "Regional Medical Center",
      "University Research Group",
      "Tech Innovation Hub",
      "Consumer Focus Groups",
      "Professional Advisory Board"
    ]
  };

  const scalingPlaybook = [
    {
      milestone: "First 1,000 Users",
      description: "Focus on high-touch support, collecting testimonials, and refining core features."
    },
    {
      milestone: "Strategic Partnerships",
      description: "Partner with complementary platforms to expand reach and add value through integrations."
    },
    {
      milestone: "Geographic Expansion",
      description: "Expand to international markets starting with English-speaking countries, then EU region."
    },
    {
      milestone: "Service Line Extension",
      description: "Add premium service tiers and complementary offerings based on user demand signals."
    }
  ];

  return { phases, pilotTesting, scalingPlaybook };
}

export default GoToMarketStrategy;
