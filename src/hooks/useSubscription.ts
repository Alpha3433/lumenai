
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { SubscriptionTier } from './useUserSubscription';

type PlanType = 'startup' | 'entrepreneur' | 'founder' | 'partner';
type PaymentMode = 'subscription' | 'payment';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async (planType: PlanType, mode: PaymentMode = 'subscription') => {
    if (!user) {
      toast.error('You must be logged in to subscribe');
      return;
    }

    // Free tier doesn't need checkout
    if (planType === 'startup') {
      toast.success('You are now on the Startup plan!');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: { planType, mode },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // For partner application, we'll use a different approach
  const handlePartnerApplication = (open: boolean) => {
    // This is handled by the PartnerApplicationModal component
    return open;
  };

  return {
    loading,
    handleCheckout,
    handlePartnerApplication,
  };
};
