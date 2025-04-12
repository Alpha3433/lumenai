import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { businessPlanService, StoredBusinessPlan } from '@/utils/supabaseClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import { Dumbbell, Plus, Trash2, Eye, Paintbrush } from 'lucide-react';
import ValidationSummaryCard from '@/components/dashboard/ValidationSummaryCard';
import LogoGeneratorModal from '@/components/logo/LogoGeneratorModal';
import MeetingsCalendar from '@/components/dashboard/MeetingsCalendar';
import TaskScheduler from '@/components/dashboard/TaskScheduler';
import ExpertTaskList from '@/components/dashboard/ExpertTaskList';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [plans, setPlans] = useState<StoredBusinessPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await businessPlanService.getUserPlans(user.id);
        
        if (error) {
          console.error('Error fetching plans:', error);
          toast.error('Failed to load your business plans');
        } else {
          setPlans(data || []);
        }
      } catch (error) {
        console.error('Error in fetchPlans:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPlans();
    }
  }, [user]);

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this business plan?')) {
      return;
    }

    try {
      const { error } = await businessPlanService.deletePlan(planId);
      
      if (error) {
        console.error('Error deleting plan:', error);
        toast.error('Failed to delete business plan');
      } else {
        setPlans(plans.filter(plan => plan.id !== planId));
        toast.success('Business plan deleted successfully');
      }
    } catch (error) {
      console.error('Error in handleDeletePlan:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const sampleValidation = {
    score: 70, // Score out of 100
    positives: [
      "Strong unique selling proposition", 
      "Growing market with low competition"
    ],
    negatives: [
      "High initial capital requirements"
    ],
    businessName: plans.length > 0 ? plans[0].business_name : "Your Business"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8 border-b border-blue-100 dark:border-blue-800/30 pb-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Your Business Plans
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              size="sm"
              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-2"
              onClick={() => setIsLogoModalOpen(true)}
            >
              <Paintbrush className="h-4 w-4" />
              <span>Create New Logo</span>
            </Button>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Plan
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="h-60 border border-blue-100 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <MeetingsCalendar />
            </div>
            
            <div className="text-center py-20 px-6 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-blue-100 dark:border-blue-800/30 shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-5">
                  <Dumbbell className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Ready to Create Your First Business Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
                Start building your entrepreneurial journey with our AI-powered platform. Create your first business plan to validate ideas and develop winning strategies.
              </p>
              <Button 
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Plus className="mr-2 h-5 w-5" /> Create Business Plan
              </Button>
            </div>
            
            <div className="lg:col-span-2 mt-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Collaboration & Workflow</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskScheduler />
                <ExpertTaskList />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {plans.length > 0 && (
              <ValidationSummaryCard 
                score={sampleValidation.score}
                positives={sampleValidation.positives}
                negatives={sampleValidation.negatives}
                businessName={sampleValidation.businessName}
              />
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="overflow-hidden border border-blue-100 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md hover:shadow-xl transition-all group"
                    >
                      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                      <CardHeader>
                        <CardTitle className="font-bold text-xl">{plan.business_name}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="capitalize">{plan.industry || 'No industry specified'}</span>
                          <span className="mx-2">•</span>
                          <span>{plan.created_at ? formatDate(plan.created_at) : 'Unknown date'}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Completion</span>
                            <span className="font-medium">{Object.keys(plan.plan_data).length} sections</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Object.keys(plan.plan_data).length * 10)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-4">
                            Status: <span className="font-medium">{plan.status || 'draft'}</span>
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/plan/${plan.id}`)} 
                          className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View Plan
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleDeletePlan(plan.id!)}
                          className="border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <MeetingsCalendar />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">Collaboration & Workflow</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskScheduler />
                <ExpertTaskList />
              </div>
            </div>
          </div>
        )}
      </div>
      <LogoGeneratorModal 
        open={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}
