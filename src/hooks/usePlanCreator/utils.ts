
import { toast } from '@/components/ui/use-toast';
import { PlanCreatorFormData } from './types';

// Validate form input before generating a plan
export const validateFormInput = (formData: PlanCreatorFormData, isPremium: boolean): string | null => {
  if (!formData.businessName.trim() || !formData.businessDescription.trim()) {
    toast({
      title: "Error",
      description: "Please fill out all fields before generating your plan",
      variant: "destructive"
    });
    return "Missing required fields";
  }
  
  // Check if description is too long, which might cause OpenAI to timeout
  if (formData.businessDescription.length > 2000) {
    toast({
      title: "Error",
      description: "Your business description is too long. Please limit it to 2000 characters for better results.",
      variant: "destructive"
    });
    return "Description too long";
  }
  
  // For testing: Always treat as premium
  return null;
};

// Simulate progress for the plan generation
export const simulateProgress = (
  setGeneratingProgress: (value: number) => void,
  setGenerationError: (value: string | null) => void
): () => void => {
  setGeneratingProgress(0);
  setGenerationError(null);
  
  // More realistic progress simulation that ensures progress reaches 100%
  const totalTime = 180000; // 3 minutes expected total time
  const updateInterval = 5000; // Update every 5 seconds
  const updates = totalTime / updateInterval;
  const progressPerUpdate = 85 / updates; // Reserve 15% for final processing
  
  let currentProgress = 0;
  let progressInterval: NodeJS.Timeout | null = null;
  
  const advanceProgress = () => {
    // Add a small random factor to make progress look more natural
    const randomFactor = Math.random() * 0.5 + 0.75; // Between 0.75 and 1.25
    currentProgress += progressPerUpdate * randomFactor;
    
    // Ensure we don't exceed 85% until final completion
    if (currentProgress > 85) {
      currentProgress = 85;
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }
    
    setGeneratingProgress(Math.min(Math.round(currentProgress), 85));
  };
  
  progressInterval = setInterval(advanceProgress, updateInterval);
  
  return () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
    
    // When called to complete, advance to 90% immediately
    setGeneratingProgress(90);
    
    // Then advance to 100% after a short delay to show completion
    setTimeout(() => {
      setGeneratingProgress(100);
    }, 500);
  };
};

// Actions that would normally involve backend services
export const mockActions = {
  downloadPlan: () => {
    toast({
      title: "Success",
      description: "Your business plan is being prepared for download!",
    });
    setTimeout(() => {
      toast({
        description: "In a production app, this would download the generated business plan as a PDF",
      });
    }, 1500);
  },
  
  // Updated to support authenticated users
  upgradeAccount: () => {
    toast({
      title: "Success",
      description: "Premium access granted!",
    });
    setTimeout(() => {
      toast({
        description: "In a production app, this would redirect to a payment page",
      });
    }, 1500);
  }
};
