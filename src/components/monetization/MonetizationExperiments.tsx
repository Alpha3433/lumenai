
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, CreditCard, Users, Award } from 'lucide-react';

interface MonetizationExperimentsProps {
  businessName: string;
  businessDescription: string;
}

const MonetizationExperiments: React.FC<MonetizationExperimentsProps> = ({
  businessName,
  businessDescription
}) => {
  const { tieredPricing, partnerships, referralProgram } = generateMonetizationStrategies(businessName);

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
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Tiered Pricing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tieredPricing.map((tier, index) => (
                <div 
                  key={index} 
                  className={`p-5 rounded-lg border ${
                    tier.popular 
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
                  }`}
                >
                  {tier.popular && (
                    <div className="mb-2 py-1 px-2 bg-blue-500 text-white text-xs font-semibold rounded inline-block">
                      MOST POPULAR
                    </div>
                  )}
                  <h4 className="font-semibold text-lg mb-1">{tier.name}</h4>
                  <div className="mb-3">
                    <span className="text-2xl font-bold">${tier.price}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partnership Revenue */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold">Partnership Revenue</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{partnerships.description}</p>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Partner referral fee</span>
                  <div className="text-xl font-bold">${partnerships.referralFee} <span className="text-sm font-normal">per user</span></div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Estimated annual revenue</span>
                  <div className="text-xl font-bold">${partnerships.estimatedRevenue}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold">Referral Program</h3>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-100 dark:border-amber-800/30">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">{referralProgram.tagline}</div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{referralProgram.description}</p>
              </div>
              <div className="mt-4 border-t border-amber-200 dark:border-amber-800/30 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {referralProgram.benefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="font-semibold mb-1">{benefit.title}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generateMonetizationStrategies(businessName: string) {
  const tieredPricing = [
    {
      name: "Basic",
      price: "9.99",
      popular: false,
      features: [
        "Core platform features",
        "Basic analytics dashboard",
        "Email support",
        "Mobile app access"
      ]
    },
    {
      name: "Premium",
      price: "29.99",
      popular: true,
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority support",
        "Personalized recommendations",
        "1:1 expert coaching"
      ]
    },
    {
      name: "Family",
      price: "49.99",
      popular: false,
      features: [
        "Up to 4 user accounts",
        "All Premium features",
        "Family dashboard",
        "Group challenges",
        "Shared resources"
      ]
    }
  ];

  const partnerships = {
    description: `Strategic partners can refer users to ${businessName} in exchange for a fee, creating a mutually beneficial relationship while accelerating growth.`,
    referralFee: 100,
    estimatedRevenue: "250,000"
  };

  const referralProgram = {
    tagline: `Get 1 month free for every friend who subscribes`,
    description: `Share ${businessName} with friends and colleagues to earn free subscription time and special perks.`,
    benefits: [
      {
        title: "Win-Win",
        description: "Both referrer and new user receive rewards"
      },
      {
        title: "Unlimited",
        description: "No cap on how many referrals you can make"
      },
      {
        title: "Easy Sharing",
        description: "One-click social media and email sharing"
      }
    ]
  };

  return { tieredPricing, partnerships, referralProgram };
}

export default MonetizationExperiments;
