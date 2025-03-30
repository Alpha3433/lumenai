
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null; user: User | null }>;
}

// Create a test user for bypassing authentication during testing
const TEST_USER = {
  id: 'test-user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString()
} as User;

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  error: null,
  signIn: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  signUp: async () => ({ error: null, user: null }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Always initialize with test user and don't try to contact any external service
  const [user, setUser] = useState<User | null>(TEST_USER);
  const [session, setSession] = useState<Session | null>({
    access_token: 'test-token',
    token_type: 'bearer',
    user: TEST_USER
  } as Session);
  const [loading, setLoading] = useState(false); // Set to false since we're bypassing auth
  const [error, setError] = useState<Error | null>(null);

  // Removed all external auth state checks entirely

  // Simplified functions that do nothing but return success
  const signIn = async () => {
    return { error: null };
  };

  const signOut = async () => {
    return { error: null };
  };

  const signUp = async () => {
    return { error: null, user: TEST_USER };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      error,
      signIn,
      signOut,
      signUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
