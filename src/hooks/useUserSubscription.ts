
import { useState, useEffect } from 'react';
import { subscriptionService, SubscriptionPlan } from '@/utils/subscriptionService';
import { toast } from '@/components/ui/use-toast';

export interface SubscriptionStatus {
  isPremium: boolean;
  isLoading: boolean;
  subscriptionPlan: SubscriptionPlan;
  isTrialPeriod: boolean;
  daysRemaining: number | null;
  isExpiringSoon: boolean;
  isExpired: boolean;
  nextTier: SubscriptionPlan | null;
}

export function useUserSubscription(userId?: string): SubscriptionStatus {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('free');
  const [isTrialPeriod, setIsTrialPeriod] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [nextTier, setNextTier] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      setIsLoading(true);
      
      try {
        if (!userId) {
          resetSubscriptionState();
          return;
        }
        
        const { plan, expiresAt, createdAt } = await subscriptionService.getUserSubscriptionDetails(userId);
        
        // Determine if this is a trial period (created less than 14 days ago)
        const isInTrialPeriod = createdAt ? isWithinTrialPeriod(createdAt) : false;
        setIsTrialPeriod(isInTrialPeriod);
        
        // Calculate days remaining if expiration date exists
        const remaining = expiresAt ? calculateDaysRemaining(expiresAt) : null;
        setDaysRemaining(remaining);
        
        // Consider a subscription as expiring soon if less than 7 days remaining
        const expiringSoon = remaining !== null && remaining <= 7 && remaining > 0;
        setIsExpiringSoon(expiringSoon);
        
        // Check if subscription is expired
        const expired = remaining !== null && remaining <= 0;
        setIsExpired(expired);
        
        // Set the subscription plan and premium status
        setSubscriptionPlan(plan);
        
        // Consider 'entrepreneur', 'strategist', and 'enterprise' plans as premium
        setIsPremium(
          plan === 'entrepreneur' || 
          plan === 'strategist' || 
          plan === 'enterprise'
        );
        
        // Determine next tier recommendation
        setNextTier(getNextTierRecommendation(plan));

        // Show warning toast if subscription is expiring soon
        if (expiringSoon && !isInTrialPeriod) {
          toast({
            title: "Subscription Expiring Soon",
            description: `Your ${formatPlanName(plan)} subscription will expire in ${remaining} days.`,
            // Fixed the variant to use a valid value
            variant: "destructive"
          });
        }
        
        // Show error toast if subscription is expired
        if (expired) {
          toast({
            title: "Subscription Expired",
            description: `Your ${formatPlanName(plan)} subscription has expired.`,
            variant: "destructive"
          });
        }
        
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        
        // Handle the error gracefully and reset to free plan
        resetSubscriptionState();
        
        toast({
          title: "Subscription Error",
          description: "Unable to fetch your subscription details. Default access level applied.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSubscriptionStatus();
  }, [userId]);

  // Helper function to determine if a date is within the trial period
  const isWithinTrialPeriod = (createdAt: string): boolean => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const trialDuration = 14; // 14 days trial period
    
    // Calculate the difference in days
    const differenceMs = now.getTime() - creationDate.getTime();
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    
    return differenceDays <= trialDuration;
  };

  // Helper function to calculate days remaining until expiration
  const calculateDaysRemaining = (expiresAt: string): number => {
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    
    // Calculate the difference in days
    const differenceMs = expirationDate.getTime() - now.getTime();
    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  };

  // Helper function to reset subscription state to defaults
  const resetSubscriptionState = () => {
    setIsPremium(false);
    setSubscriptionPlan('free');
    setIsTrialPeriod(false);
    setDaysRemaining(null);
    setIsExpiringSoon(false);
    setIsExpired(false);
    setNextTier('entrepreneur');
  };

  // Helper function to get the next recommended tier
  const getNextTierRecommendation = (currentPlan: SubscriptionPlan): SubscriptionPlan | null => {
    switch (currentPlan) {
      case 'free':
        return 'entrepreneur';
      case 'entrepreneur':
        return 'strategist';
      case 'strategist':
        return 'enterprise';
      case 'enterprise':
        return null; // Already at highest tier
      default:
        return 'entrepreneur';
    }
  };

  // Helper function to format plan name for display
  const formatPlanName = (plan: SubscriptionPlan): string => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  return {
    isPremium,
    isLoading,
    subscriptionPlan,
    isTrialPeriod,
    daysRemaining,
    isExpiringSoon,
    isExpired,
    nextTier
  };
}

export default useUserSubscription;
