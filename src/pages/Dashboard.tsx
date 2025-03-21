
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { businessPlanService, StoredBusinessPlan } from '@/utils/supabaseClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [plans, setPlans] = useState<StoredBusinessPlan[]>([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Business Plans</h1>
          <Button onClick={() => navigate('/create')}>Create New Plan</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="h-60">
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
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Business Plans Yet</h2>
            <p className="text-gray-600 mb-6">Create your first business plan to get started!</p>
            <Button onClick={() => navigate('/create')}>Create Business Plan</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="h-full">
                <CardHeader>
                  <CardTitle>{plan.business_name}</CardTitle>
                  <CardDescription>
                    {plan.industry || 'No industry specified'} • 
                    Created on {plan.created_at ? formatDate(plan.created_at) : 'Unknown date'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {Object.keys(plan.plan_data).length} sections completed
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    Status: {plan.status || 'draft'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate(`/plan/${plan.id}`)}>
                    View Plan
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeletePlan(plan.id!)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
