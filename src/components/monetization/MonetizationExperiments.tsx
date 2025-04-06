
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Check, Share2 } from 'lucide-react';

interface MonetizationExperimentsProps {
  businessName: string;
  businessDescription: string;
}

const MonetizationExperiments: React.FC<MonetizationExperimentsProps> = ({
  businessName,
  businessDescription
}) => {
  // For demonstration purposes, we're using hardcoded pricing tiers and referral program info
  // In a real application, this would come from an API or configuration
  const pricingTiers = [
    {
      name: "Basic",
      price: "$9.99/month",
      features: [
        "Core platform features",
        "Basic analytics dashboard",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$29.99/month",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority support",
        "Personalized recommendations",
        "1:1 expert coaching"
      ],
      popular: true
    },
    {
      name: "Family",
      price: "$49.99/month",
      features: [
        "Up to 4 user accounts",
        "All Premium features",
        "Family dashboard",
        "Group challenges",
        "Shared resources"
      ],
      popular: false
    }
  ];

  const referralProgram = {
    tagline: "Get 1 month free for every friend who subscribes",
    benefits: [
      { name: "Win-Win", description: "Both referrer and new user receive rewards" },
      { name: "Unlimited", description: "No cap on how many referrals you can make" },
      { name: "Easy Sharing", description: "One-click social media and email sharing" }
    ]
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Monetization Experiments
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Revenue generation strategies
        </div>
      </div>

      <div className="space-y-6">
        {/* Tiered Pricing */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tiered Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`border ${tier.popular ? 'border-blue-400 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'} rounded-lg overflow-hidden`}
                >
                  {tier.popular && (
                    <div className="bg-blue-600 text-white text-center text-sm py-1">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-2">{tier.name}</h4>
                    <div className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">{tier.price}</div>
                    <div className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Share2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold">Referral Program</h3>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-5">
              <p className="text-lg font-medium text-center text-indigo-800 dark:text-indigo-300">{referralProgram.tagline}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {referralProgram.benefits.map((benefit, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-1">{benefit.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MonetizationExperiments;
