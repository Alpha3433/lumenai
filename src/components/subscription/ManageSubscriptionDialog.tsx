
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/components/AuthProvider';
import CurrentPlanCard from './CurrentPlanCard';
import PlanFeaturesList from './PlanFeaturesList';
import SubscriptionActions from './SubscriptionActions';

interface ManageSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSubscriptionDialog: React.FC<ManageSubscriptionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { subscriptionPlan } = useAuth();

  const getPlanInfo = () => {
    switch (subscriptionPlan) {
      case 'entrepreneur':
        return {
          name: 'Entrepreneur Plan',
          price: '$19.99',
          billing: 'monthly',
          features: [
            'Full business plan generation',
            'Market analysis tools',
            'Competitor analysis',
            'Up to 5 reports per month',
            'Email support',
          ],
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/30',
          borderColor: 'border-green-100 dark:border-green-800',
        };
      case 'strategist':
        return {
          name: 'Strategist Plan',
          price: '$39.99',
          billing: 'monthly',
          features: [
            'All Entrepreneur features',
            'Unlimited business plans',
            'Advanced financial modeling',
            'Priority support',
            'Custom exports',
            'Team collaboration',
          ],
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-50 dark:bg-purple-900/30',
          borderColor: 'border-purple-100 dark:border-purple-800',
        };
      default:
        return {
          name: 'Free Plan',
          price: '$0',
          billing: 'forever',
          features: [
            'Basic business plan generation',
            'Limited market analysis',
            'Up to 2 reports per month',
          ],
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/30',
          borderColor: 'border-blue-100 dark:border-blue-800',
        };
    }
  };

  const planInfo = getPlanInfo();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Subscription Management</DialogTitle>
          <DialogDescription>
            Manage your subscription plan and billing details.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <CurrentPlanCard planInfo={planInfo} />

          <Separator className="my-4" />

          <PlanFeaturesList features={planInfo.features} />
        </div>

        <DialogFooter>
          <SubscriptionActions 
            subscriptionPlan={subscriptionPlan} 
            onClose={onClose} 
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSubscriptionDialog;
