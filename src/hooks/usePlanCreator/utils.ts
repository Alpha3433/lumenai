
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
  
  if (formData.useAIV2 && !isPremium) {
    toast({
      title: "Premium Feature",
      description: "Enhanced AI engine is only available for premium users. Upgrade to access this feature.",
      variant: "destructive"
    });
    return "Premium feature not available";
  }
  
  return null;
};

// Simulate progress for the plan generation
export const simulateProgress = (
  setGeneratingProgress: (value: number) => void,
  setGenerationError: (value: string | null) => void
): () => void => {
  setGeneratingProgress(0);
  setGenerationError(null);
  
  // More reliable progress simulation
  const sections = 7; // Total number of sections to generate
  const progressPerSection = 90 / sections; // Leave 10% for final processing
  
  let currentProgress = 0;
  const updateProgressInterval = 4000; // Update every 4 seconds
  
  const interval = setInterval(() => {
    // Increment progress based on sections
    currentProgress += progressPerSection / 3; // Divide by 3 to make multiple updates per section
    
    // Ensure we don't exceed 90% until final completion
    if (currentProgress > 90) {
      currentProgress = 90;
      clearInterval(interval);
    }
    
    setGeneratingProgress(Math.min(Math.round(currentProgress), 90));
  }, updateProgressInterval / 3);
  
  return () => {
    clearInterval(interval);
    // Complete progress to 100% if needed
    setGeneratingProgress(100);
  };
};

// Mock actions that would normally involve backend services
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
  
  upgradeAccount: (setIsPremium: (value: boolean) => void) => {
    setIsPremium(true);
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
