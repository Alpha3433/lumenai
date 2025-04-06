
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Check, Share2, Users, Award } from 'lucide-react';

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

  const { referralProgram, affiliateProgram } = generateReferralData(businessName, businessDescription);

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

        {/* Affiliate & Partnership Program */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold">Affiliate & Partnership Program</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Commission Structure */}
              <div className="border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-300">Commission Structure</h4>
                <p className="text-sm mb-3">{affiliateProgram.commissionDescription}</p>
                <div className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-full h-20 w-20 mx-auto shadow-sm border border-amber-100 dark:border-amber-900/30">
                  <span className="text-xl font-bold text-amber-600">{affiliateProgram.commissionRate}</span>
                </div>
              </div>
              
              {/* Partner Tiers */}
              <div className="border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-300">Partner Tiers</h4>
                <div className="space-y-2">
                  {affiliateProgram.partnerTiers.map((tier, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded border border-amber-100 dark:border-amber-900/30">
                      <div className="w-2 h-2 rounded-full" 
                           style={{ backgroundColor: tier.color }}></div>
                      <div>
                        <span className="text-sm font-medium">{tier.name}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Co-Branding Opportunities */}
              <div className="border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-300">Co-Branding Opportunities</h4>
                <div className="space-y-2">
                  {affiliateProgram.coBrandingOpportunities.map((opportunity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm text-center text-gray-600 dark:text-gray-400">
              <p>Interested partners can email partnerships@{businessName.toLowerCase().replace(/\s/g, '')}.com for more information</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generateReferralData(businessName: string, businessDescription: string) {
  // This function would ideally use AI to generate this content based on the business description
  // For now, we'll generate content based on some basic logic and business type detection
  
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                           businessDescription.toLowerCase().includes('fitness') || 
                           businessDescription.toLowerCase().includes('wellness');
  
  const isTechBusiness = businessDescription.toLowerCase().includes('tech') || 
                         businessDescription.toLowerCase().includes('software') || 
                         businessDescription.toLowerCase().includes('app');
  
  const isEducationBusiness = businessDescription.toLowerCase().includes('education') || 
                              businessDescription.toLowerCase().includes('learning') || 
                              businessDescription.toLowerCase().includes('teaching');
  
  // Basic referral program
  const referralProgram = {
    tagline: `Get 1 month free for every friend who subscribes to ${businessName}`,
    benefits: [
      { name: "Win-Win", description: "Both referrer and new user receive rewards" },
      { name: "Unlimited", description: "No cap on how many referrals you can make" },
      { name: "Easy Sharing", description: "One-click social media and email sharing" }
    ]
  };

  // Affiliate program tailored to business type
  const affiliateProgram = {
    commissionRate: "20%",
    commissionDescription: `Partners earn ${isHealthBusiness ? '20%' : isTechBusiness ? '15%' : '25%'} of referred user revenue for the first year of subscription.`,
    partnerTiers: [
      {
        name: "Bronze",
        description: isHealthBusiness ? "Fitness Bloggers & Influencers" : 
                     isTechBusiness ? "Tech Reviewers & Bloggers" : 
                     isEducationBusiness ? "Educational Content Creators" : "Content Creators",
        color: "#CD7F32"
      },
      {
        name: "Silver", 
        description: isHealthBusiness ? "Personal Trainers & Coaches" : 
                     isTechBusiness ? "Software Developers & Agencies" : 
                     isEducationBusiness ? "Teachers & Educational Institutions" : "Business Partners",
        color: "#C0C0C0"
      },
      {
        name: "Gold",
        description: isHealthBusiness ? "Clinics & Healthcare Providers" : 
                     isTechBusiness ? "Enterprise Partners & Platforms" : 
                     isEducationBusiness ? "Universities & EdTech Companies" : "Premium Partners",
        color: "#FFD700"
      }
    ],
    coBrandingOpportunities: isHealthBusiness ? 
      [
        `${businessName} x Peloton challenges`,
        `${businessName} branded fitness equipment`,
        `Joint wellness retreats with luxury spas`
      ] : isTechBusiness ? 
      [
        `${businessName} x Microsoft integration`,
        `Co-hosted tech webinars with industry leaders`,
        `Joint hackathons with tech communities`
      ] : isEducationBusiness ? 
      [
        `${businessName} certified educator program`,
        `Co-branded educational materials`,
        `Joint scholarship programs with universities`
      ] : 
      [
        `${businessName} co-branded campaigns`,
        `Joint webinars with industry experts`,
        `Collaborative product launches`
      ]
  };

  return { referralProgram, affiliateProgram };
}

export default MonetizationExperiments;
