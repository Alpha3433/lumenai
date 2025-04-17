
import React from 'react';
import { CircleDot, Briefcase, Crown, Handshake } from 'lucide-react';

type SubscriptionTier = 'free' | 'entrepreneur' | 'founder' | 'partner';

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ tier }) => {
  const getBadgeContent = () => {
    switch (tier) {
      case 'entrepreneur':
        return {
          icon: <Briefcase className="h-3 w-3 text-purple-500" />,
          label: 'Entrepreneur',
          className: 'bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-300'
        };
      case 'founder':
        return {
          icon: <Crown className="h-3 w-3 text-amber-500" />,
          label: 'Founder',
          className: 'bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-300'
        };
      case 'partner':
        return {
          icon: <Handshake className="h-3 w-3 text-emerald-500" />,
          label: 'Partner',
          className: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
        };
      case 'free':
      default:
        return {
          icon: <CircleDot className="h-3 w-3 text-blue-500" />,
          label: 'Free Plan',
          className: 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300'
        };
    }
  };

  const { icon, label, className } = getBadgeContent();

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${className}`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};

export default SubscriptionBadge;
