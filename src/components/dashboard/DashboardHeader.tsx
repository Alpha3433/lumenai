
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { FileText, Calendar, CheckCircle, Globe, Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoGeneratorModal from '@/components/logo/LogoGeneratorModal';

const DashboardHeader = () => {
  const { user } = useAuth();
  const [showLogoModal, setShowLogoModal] = useState(false);
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  const handleRedditInsights = () => {
    window.location.href = '/reddit-insights';
  };

  return <div className="mb-8 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-xl">
      <h1 className="text-2xl font-bold mb-2">Welcome back, {firstName}</h1>
      <p className="text-muted-foreground mb-6">Here's what's happening with your business today.</p>
      
      <div className="flex gap-3 flex-wrap">
        <Button variant="secondary" className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50" onClick={() => window.location.href = '/create'}>
          <FileText className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
        <Button variant="secondary" className="bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50" onClick={() => window.location.href = '/schedule-meeting'}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
        <Button variant="secondary" className="bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50">
          <CheckCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
        <Button variant="secondary" onClick={() => setShowLogoModal(true)} className="bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50">
          <Wand className="mr-2 h-4 w-4" />
          Create Logo
        </Button>
        <Button variant="secondary" onClick={handleRedditInsights} className="bg-[#FF4500]/20 hover:bg-[#FF4500]/40 dark:bg-[#FF4500]/20 dark:hover:bg-[#FF4500]/40 text-zinc-950">
          <Globe className="mr-2 h-4 w-4" />
          Reddit Insights
        </Button>
      </div>

      <LogoGeneratorModal 
        open={showLogoModal}
        onClose={() => setShowLogoModal(false)}
      />
    </div>;
};

export default DashboardHeader;
