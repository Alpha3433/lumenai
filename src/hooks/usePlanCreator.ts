
import { useState, useEffect, useRef } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import { toast } from '@/components/ui/use-toast';
import { BusinessPlanData } from '@/types/businessPlan';

interface FormData {
  businessName: string;
  businessDescription: string;
  useAIV2: boolean;
}

const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
  swotAnalysis: ''
};

export const usePlanCreator = (initialData?: {
  businessName?: string;
  businessDescription?: string;
} | null) => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    businessName: initialData?.businessName || '',
    businessDescription: initialData?.businessDescription || '',
    useAIV2: false
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);
  const [isPremium, setIsPremium] = useState(false);
  const generationAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialData?.businessName || initialData?.businessDescription) {
      setFormData(prev => ({
        ...prev,
        businessName: initialData.businessName || prev.businessName,
        businessDescription: initialData.businessDescription || prev.businessDescription
      }));
      
      toast({
        title: "Business Idea Loaded",
        description: "We've pre-filled your form with the generated business idea."
      });
    }
    
    // Cleanup function to abort any ongoing generation
    return () => {
      if (generationAbortController.current) {
        generationAbortController.current.abort();
      }
    };
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const simulateProgress = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName.trim() || !formData.businessDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill out all fields before generating your plan",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.useAIV2 && !isPremium) {
      toast({
        title: "Premium Feature",
        description: "Enhanced AI engine is only available for premium users. Upgrade to access this feature.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new abort controller for this operation
    if (generationAbortController.current) {
      generationAbortController.current.abort();
    }
    generationAbortController.current = new AbortController();
    
    setGenerating(true);
    setGenerationError(null);
    const clearProgressSimulation = simulateProgress();
    
    try {
      console.log('Starting business plan generation process...');
      // Generate the business plan
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: formData.useAIV2
      });
      
      console.log('Business plan generation completed successfully');
      
      // Set the business plan data
      setBusinessPlan(plan);
      
      // Complete the progress
      setGeneratingProgress(100);
      
      // Wait a short time to show the completion state
      setTimeout(() => {
        setStep(2);
        setGenerating(false);
      }, 800);
      
    } catch (error) {
      console.error('Error generating business plan:', error);
      setGenerationError(error instanceof Error ? error.message : 'Unknown error occurred');
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating your business plan. Please try again with a different description.",
        variant: "destructive"
      });
      
      // Wait a moment before allowing retry
      setTimeout(() => {
        setGenerating(false);
        setGeneratingProgress(0);
      }, 1500);
    } finally {
      // Always clear the progress simulation
      clearProgressSimulation();
      generationAbortController.current = null;
    }
  };

  const downloadPlan = () => {
    toast({
      title: "Success",
      description: "Your business plan is being prepared for download!",
    });
    setTimeout(() => {
      toast({
        description: "In a production app, this would download the generated business plan as a PDF",
      });
    }, 1500);
  };

  const upgradeAccount = () => {
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
  };

  return {
    step,
    formData,
    businessPlan,
    generating,
    generatingProgress,
    generationError,
    isPremium,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
    downloadPlan,
    upgradeAccount,
    setStep
  };
};
