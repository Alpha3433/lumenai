
import { useState, useEffect } from 'react';
import { subscriptionService } from '@/utils/subscriptionService';

export function useUserSubscription(userId?: string) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>('free');

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      setIsLoading(true);
      
      try {
        if (!userId) {
          setIsPremium(false);
          setSubscriptionPlan('free');
          return;
        }
        
        const plan = await subscriptionService.getUserPlan(userId);
        
        // Consider 'entrepreneur' and 'strategist' plans as premium
        setIsPremium(plan === 'entrepreneur' || plan === 'strategist');
        setSubscriptionPlan(plan);
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        setIsPremium(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSubscriptionStatus();
  }, [userId]);

  return { isPremium, isLoading, subscriptionPlan };
}
