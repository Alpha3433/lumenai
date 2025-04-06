
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Medal, Heart, Users } from 'lucide-react';

interface UserRetentionStrategyProps {
  businessName: string;
  businessDescription: string;
}

const UserRetentionStrategy: React.FC<UserRetentionStrategyProps> = ({
  businessName,
  businessDescription
}) => {
  const { gamification, loyaltyRewards, communityHub } = generateRetentionStrategies(businessName);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          User Retention Strategy
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Keeping users engaged long-term
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gamification */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Medal className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">Gamification</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{gamification.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {gamification.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-800/50 text-amber-500 dark:text-amber-300 text-lg font-semibold">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{badge.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Rewards */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold">Loyalty Rewards</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{loyaltyRewards.description}</p>
            <div className="space-y-3">
              {loyaltyRewards.tiers.map((tier, index) => (
                <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-100 dark:border-red-800/30">
                  <div className="font-semibold">{tier.milestone}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{tier.reward}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Hub */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Community Hub</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{communityHub.description}</p>
            <div className="space-y-3">
              {communityHub.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{feature.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</div>
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

function generateRetentionStrategies(businessName: string) {
  const gamification = {
    description: `Keep users motivated with achievement milestones, badges, and challenges that make progress visible and rewarding.`,
    badges: [
      {
        icon: "🏆",
        name: "First Step",
        description: "Complete onboarding"
      },
      {
        icon: "🔥",
        name: "7-Day Streak",
        description: "Use app for a week straight"
      },
      {
        icon: "⚡",
        name: "Power User",
        description: "Use all core features"
      },
      {
        icon: "🌟",
        name: "10 Milestones",
        description: "Achieve 10 personal goals"
      }
    ]
  };

  const loyaltyRewards = {
    description: `Reward long-term users with special perks, discounts, and exclusive features to encourage ongoing engagement.`,
    tiers: [
      {
        milestone: "3 Months Active",
        reward: "10% discount on premium subscription"
      },
      {
        milestone: "6 Months Active",
        reward: "Free premium feature unlock"
      },
      {
        milestone: "1 Year Active",
        reward: "One free month of service"
      },
      {
        milestone: "Referral Champion",
        reward: "Exclusive VIP benefits and priority support"
      }
    ]
  };

  const communityHub = {
    description: `Build a sense of belonging with user forums, live challenges, and collaborative activities to strengthen platform engagement.`,
    features: [
      {
        name: "Live Challenges",
        description: "Weekly competitions with leaderboards and prizes"
      },
      {
        name: "User Forums",
        description: "Topic-based discussion groups moderated by experts"
      },
      {
        name: "Success Stories",
        description: "Highlighted user achievements and testimonials"
      },
      {
        name: "Expert Q&A",
        description: "Regular sessions with industry professionals"
      }
    ]
  };

  return { gamification, loyaltyRewards, communityHub };
}

export default UserRetentionStrategy;
