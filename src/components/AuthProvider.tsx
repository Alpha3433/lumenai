
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import { SubscriptionPlan, subscriptionService } from '@/utils/subscriptionService';
import { useNavigate } from 'react-router-dom';

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
  const [previousAuthState, setPreviousAuthState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(session);
        setUser(session?.user || null);
        setPreviousAuthState(!!session?.user);
        
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
      // Removed the console.log that was here
      setSession(newSession);
      setUser(newSession?.user || null);
      
      // Update subscription plan on auth change
      if (newSession?.user) {
        const plan = await subscriptionService.getUserPlan(newSession.user.id);
        setSubscriptionPlan(plan);
        
        // Check if user just logged in (previously was not authenticated)
        if (!previousAuthState) {
          navigate('/reports');
        }
        
        setPreviousAuthState(true);
      } else {
        setSubscriptionPlan('free');
        setPreviousAuthState(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, previousAuthState]);

  const signOut = async () => {
    console.log('Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    console.log('Signed out successfully');
    setSubscriptionPlan('free');
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading, subscriptionPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
