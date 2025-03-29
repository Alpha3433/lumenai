
import { useState, useEffect } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import { toast } from '@/components/ui/use-toast';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

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
    
    // Adjusted progress simulation to ensure it reaches completion
    const totalSimulationTime = 10000; // 10 seconds total
    const updateInterval = 100; // Update every 100ms
    const steps = totalSimulationTime / updateInterval;
    const incrementPerStep = 95 / steps; // Only go to 95%, final 5% when generation completes

    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += incrementPerStep;
      setGeneratingProgress(Math.min(95, currentProgress));
      
      if (currentProgress >= 95) {
        clearInterval(interval);
      }
    }, updateInterval);
    
    return () => clearInterval(interval);
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
      toast({
        title: "Error",
        description: "There was an error generating your business plan. Please try again.",
        variant: "destructive"
      });
      setGenerating(false);
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
    isPremium,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
    downloadPlan,
    upgradeAccount,
    setStep
  };
};
