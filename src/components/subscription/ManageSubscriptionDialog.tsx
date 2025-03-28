
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';

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
          <div className={`p-4 rounded-lg ${planInfo.bgColor} ${planInfo.borderColor} border`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className={`font-medium ${planInfo.color}`}>{planInfo.name}</h3>
              <Badge variant="outline" className={`${planInfo.color} ${planInfo.bgColor} border-none`}>
                Current Plan
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold text-lg">{planInfo.price}</span> billed {planInfo.billing}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <h4 className="font-medium">Plan Features:</h4>
            <ul className="space-y-2">
              {planInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex sm:flex-row sm:justify-between gap-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {subscriptionPlan !== 'strategist' && (
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Upgrade Plan
            </Button>
          )}
          {subscriptionPlan !== 'free' && (
            <Button variant="destructive">Cancel Subscription</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSubscriptionDialog;
