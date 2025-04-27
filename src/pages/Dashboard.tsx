import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { businessPlanService } from '@/utils/supabaseClient';
import Navbar from '@/components/Navbar';
import { FileText, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ExpertTaskList from '@/components/dashboard/ExpertTaskList';
import EmptyReportsSection from '@/components/market/EmptyReportsSection';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UpcomingMeetingsList from '@/components/dashboard/UpcomingMeetingsList';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: plans } = useQuery({
    queryKey: ['business-plans', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await businessPlanService.getUserPlans(user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  const { data: meetings } = useQuery({
    queryKey: ['upcoming-meetings-count'],
    queryFn: async () => {
      if (!user?.id) return { count: 0, nextMeeting: null };
      const { data, error } = await supabase
        .from('meeting_requests')
        .select('*')
        .gte('selected_date', new Date().toISOString().split('T')[0])
        .order('selected_date', { ascending: true })
        .order('selected_time', { ascending: true });
      
      if (error) throw error;
      return {
        count: data.length,
        nextMeeting: data.length > 0 ? data[0] : null
      };
    },
    enabled: !!user?.id,
    staleTime: 30000 // Don't refetch this query for 30 seconds
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="container mx-auto py-8">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Skeleton className="h-8 w-64 mb-4 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 pt-20">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Business Plans"
            value={plans?.length || 0}
            subtext={plans?.length === 1 ? "1 plan created" : `${plans?.length || 0} plans created`}
            icon={FileText}
            iconClassName="bg-purple-100 dark:bg-purple-900/30"
          />
          <StatsCard
            title="Upcoming Meetings"
            value={meetings?.count || 0}
            subtext={meetings?.nextMeeting ? `Next: ${format(new Date(meetings.nextMeeting.selected_date), 'MMM d')}, ${meetings.nextMeeting.selected_time}` : 'No upcoming meetings'}
            icon={Calendar}
            iconClassName="bg-emerald-100 dark:bg-emerald-900/30"
          />
          <StatsCard
            title="Tasks"
            value={0}
            subtext="No tasks due soon"
            icon={CheckCircle}
            iconClassName="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatsCard
            title="Messages"
            value={0}
            subtext="No unread messages"
            icon={MessageSquare}
            iconClassName="bg-pink-100 dark:bg-pink-900/30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <EmptyReportsSection plans={plans} />
            <ExpertTaskList />
          </div>
          <div className="flex h-full">
            <UpcomingMeetingsList />
          </div>
        </div>
      </div>
    </div>
  );
}
