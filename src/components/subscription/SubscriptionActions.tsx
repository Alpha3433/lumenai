
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
  // Add handlers to prevent default behavior
  const handleUpgrade = (e: React.MouseEvent) => {
    e.preventDefault();
    // Upgrade plan logic here
    console.log('Upgrade plan clicked');
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    // Cancel subscription logic here
    console.log('Cancel subscription clicked');
  };

  return (
    <div className="flex sm:flex-row sm:justify-between gap-4">
      <Button variant="outline" onClick={onClose}>Close</Button>
      {subscriptionPlan !== 'strategist' && (
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleUpgrade}
        >
          Upgrade Plan
        </Button>
      )}
      {subscriptionPlan !== 'free' && (
        <Button 
          variant="destructive"
          onClick={handleCancel}
        >
          Cancel Subscription
        </Button>
      )}
    </div>
  );
};

export default SubscriptionActions;
