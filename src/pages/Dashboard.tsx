import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { businessPlanService } from '@/utils/supabaseClient';
import Navbar from '@/components/Navbar';
import { FileText, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ExpertTaskList from '@/components/dashboard/ExpertTaskList';
import MeetingsCalendar from '@/components/dashboard/MeetingsCalendar';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 pt-20">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Business Plans"
            value={2}
            subtext="+1 this month"
            icon={FileText}
            iconClassName="bg-purple-100 dark:bg-purple-900/30"
          />
          <StatsCard
            title="Upcoming Meetings"
            value={3}
            subtext="Next: Today, 9:00 AM"
            icon={Calendar}
            iconClassName="bg-emerald-100 dark:bg-emerald-900/30"
          />
          <StatsCard
            title="Tasks"
            value={12}
            subtext="4 due soon"
            icon={CheckCircle}
            iconClassName="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatsCard
            title="Messages"
            value={5}
            subtext="3 unread"
            icon={MessageSquare}
            iconClassName="bg-pink-100 dark:bg-pink-900/30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpertTaskList />
          <MeetingsCalendar />
        </div>
      </div>
    </div>
  );
}
