import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { businessPlanService, StoredBusinessPlan } from '@/utils/supabaseClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import { Dumbbell, Plus, Trash2, Eye, Paintbrush, Sparkles, ChevronRight, BarChart3, LineChart, Badge, CalendarIcon, ImageIcon } from 'lucide-react';
import ValidationSummaryCard from '@/components/dashboard/ValidationSummaryCard';
import LogoGeneratorModal from '@/components/logo/LogoGeneratorModal';
import MeetingsCalendar from '@/components/dashboard/MeetingsCalendar';
import TaskScheduler from '@/components/dashboard/TaskScheduler';
import ExpertTaskList from '@/components/dashboard/ExpertTaskList';

interface ImageMockupModalProps {
  open: boolean;
  onClose: () => void;
}

const ImageMockupModal = ({ open, onClose }: ImageMockupModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      toast.success("Your mockup is being created!");
      setTimeout(() => {
        toast.info("Mockup created! Check your projects folder.");
        onClose();
      }, 2000);
    } else {
      toast.error("Please select an image first");
    }
  };
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Mockups from Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload an image to create mockups
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                {previewSrc ? (
                  <img src={previewSrc} alt="Preview" className="max-h-40 mb-3 rounded" />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                )}
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {previewSrc ? "Change image" : "Select an image"}
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Create Mockups
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [plans, setPlans] = useState<StoredBusinessPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isImageMockupModalOpen, setIsImageMockupModalOpen] = useState(false);
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
    score: 70,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Business Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}! Manage your business plans and schedule.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsImageMockupModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-5 py-2.5"
            >
              <ImageIcon className="mr-2 h-4 w-4" /> Create Mockups
            </Button>
            <Button 
              onClick={() => setIsLogoModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-5 py-2.5"
            >
              <Paintbrush className="mr-2 h-4 w-4" /> Create Logo
            </Button>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-5 py-2.5"
            >
              <Plus className="mr-2 h-4 w-4" /> New Business Plan
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center py-20 px-8 bg-white/90 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl border border-blue-100 dark:border-blue-800/30 shadow-2xl">
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 p-6">
                  <BarChart3 className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Ready to Create Your First Business Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-10 text-lg">
                Start building your entrepreneurial journey with our AI-powered platform. Create your first business plan to validate ideas and develop winning strategies.
              </p>
              <Button 
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="mr-3 h-5 w-5" /> Create Business Plan
              </Button>
            </div>
            
            <div>
              <MeetingsCalendar />
            </div>
            
            <div className="lg:col-span-2 mt-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" /> 
                Workflow & Tasks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpertTaskList />
                <TaskScheduler />
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" /> 
                    Your Business Plans
                  </h2>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-5 py-2.5 text-sm"
                    onClick={() => navigate('/create')}
                  >
                    <Plus className="h-3 w-3 mr-1" /> New Plan
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="overflow-hidden border border-blue-100 dark:border-blue-800/30 bg-white/90 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group"
                    >
                      <div className="h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="font-bold text-xl">{plan.business_name}</CardTitle>
                          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                            {plan.industry || 'Business'}
                          </div>
                        </div>
                        <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                          <span>{plan.created_at ? formatDate(plan.created_at) : 'Unknown date'}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Completion</span>
                            <span className="font-medium">{Object.keys(plan.plan_data).length} sections</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Object.keys(plan.plan_data).length * 10)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-1">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              Status:
                            </span> 
                            <span className="font-medium px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                              {plan.status || 'draft'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800/60">
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/plan/${plan.id}`)} 
                          className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleDeletePlan(plan.id!)}
                          className="border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" /> 
                  Workflow & Tasks
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  View All <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpertTaskList />
                <TaskScheduler />
              </div>
            </div>
          </div>
        )}
      </div>
      <LogoGeneratorModal 
        open={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
      <ImageMockupModal
        open={isImageMockupModalOpen}
        onClose={() => setIsImageMockupModalOpen(false)}
      />
    </div>
  );
}
