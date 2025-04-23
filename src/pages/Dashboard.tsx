import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BusinessSubmissionsCard from '@/components/dashboard/BusinessSubmissionsCard';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Check if user is admin
  const { data: isAdmin } = useQuery({
    queryKey: ['is-admin'],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      return data;
    },
    enabled: !!user
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 space-y-6">
        {/* Regular dashboard content */}
        {isAdmin && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Admin Section</h2>
            <BusinessSubmissionsCard />
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
