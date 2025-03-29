
import React from 'react';
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from '@/utils/subscriptionService';

interface SubscriptionActionsProps {
  subscriptionPlan: SubscriptionPlan;
  onClose: () => void;
}

const SubscriptionActions: React.FC<SubscriptionActionsProps> = ({
  subscriptionPlan,
  onClose
}) => {
  return (
    <div className="flex sm:flex-row sm:justify-between gap-4">
      <Button variant="outline" onClick={onClose}>Close</Button>
      {subscriptionPlan !== 'strategist' && (
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Upgrade Plan
        </Button>
      )}
      {subscriptionPlan !== 'free' && (
        <Button variant="destructive">Cancel Subscription</Button>
      )}
    </div>
  );
};

export default SubscriptionActions;
