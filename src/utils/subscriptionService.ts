
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionPlan = 'free' | 'entrepreneur' | 'strategist';

export interface UserSubscription {
  id?: string;
  user_id: string;
  plan: SubscriptionPlan;
  is_active: boolean;
  created_at?: string;
  expires_at?: string | null;
}

export const subscriptionService = {
  async getUserPlan(userId: string): Promise<SubscriptionPlan> {
    if (!userId) return 'free';
    
    try {
      // Use type assertion to tell TypeScript this is okay
      const { data, error } = await supabase
        .from('user_subscriptions' as any)
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error || !data) {
        console.log('Error fetching subscription or no subscription found:', error);
        return 'free';
      }
      
      return (data as UserSubscription).plan as SubscriptionPlan;
    } catch (error) {
      console.error('Error in getUserPlan:', error);
      return 'free';
    }
  },
  
  async createTestAdmin(email: string, password: string): Promise<{ user: any, error: any }> {
    // Create a user account
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error || !user) {
      return { user: null, error };
    }
    
    try {
      // Give them entrepreneur plan for testing
      // Use type assertion to tell TypeScript this is okay
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions' as any)
        .insert({
          user_id: user.id,
          plan: 'entrepreneur',
          is_active: true,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        } as UserSubscription);
      
      if (subscriptionError) {
        console.error('Error creating subscription:', subscriptionError);
      }
      
      return { user, error: subscriptionError };
    } catch (error) {
      console.error('Error in createTestAdmin:', error);
      return { user, error };
    }
  }
};
