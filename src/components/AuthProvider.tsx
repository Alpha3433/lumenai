
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import { SubscriptionPlan, subscriptionService } from '@/utils/subscriptionService';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
  subscriptionPlan: SubscriptionPlan;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  subscriptionPlan: 'free',
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('free');

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(session);
        setUser(session?.user || null);
        
        // Fetch subscription plan for the user
        if (session?.user) {
          const plan = await subscriptionService.getUserPlan(session.user.id);
          setSubscriptionPlan(plan);
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      // Update subscription plan on auth change
      if (newSession?.user) {
        const plan = await subscriptionService.getUserPlan(newSession.user.id);
        setSubscriptionPlan(plan);
      } else {
        setSubscriptionPlan('free');
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSubscriptionPlan('free');
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading, subscriptionPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
