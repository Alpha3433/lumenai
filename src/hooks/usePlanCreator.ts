
import { useState, useEffect } from 'react';
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
    let currentProgress = 0;
    const sections = 7; // Total number of sections to generate
    const progressPerSection = 90 / sections; // Leave 10% for final processing
    let sectionIndex = 0;
    
    const updateProgress = () => {
      // Each section has its own progress that goes from 0 to progressPerSection
      sectionIndex++;
      currentProgress = Math.min(sectionIndex * progressPerSection, 90);
      setGeneratingProgress(currentProgress);
      
      if (currentProgress >= 90) {
        clearInterval(interval);
      }
    };
    
    const interval = setInterval(updateProgress, 4000); // Update every 4 seconds, matching expected section generation time
    
    return () => {
      clearInterval(interval);
      // Ensure we don't leave progress stuck if the process completes early
      if (currentProgress < 100) {
        setGeneratingProgress(100);
      }
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
    
    setGenerating(true);
    const clearProgressSimulation = simulateProgress();
    
    try {
      // Generate the business plan
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: formData.useAIV2
      });
      
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
    }
    
    // Clear the progress simulation when done
    return () => clearProgressSimulation();
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
