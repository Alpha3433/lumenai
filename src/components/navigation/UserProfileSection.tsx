
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/AuthProvider';
import SubscriptionBadge from './SubscriptionBadge';
import { useUserSubscription } from '@/hooks/useUserSubscription';

interface UserProfileSectionProps {
  onClose?: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { subscriptionTier } = useUserSubscription();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-2 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300">
        {user.email?.substring(0, 2).toUpperCase() || 'JD'}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
        </div>
        <div className="mt-1">
          <SubscriptionBadge tier={subscriptionTier} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
