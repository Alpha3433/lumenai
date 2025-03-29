
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { usePlanGeneration, FormData } from './usePlanGeneration';
import { usePlanActions } from './usePlanActions';
import { simulateProgress } from '@/utils/progressSimulation';
import { BusinessFormData } from '@/utils/planGenerator';

export const usePlanCreator = (initialData?: {
  businessName?: string;
  businessDescription?: string;
} | null) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: initialData?.businessName || '',
    businessDescription: initialData?.businessDescription || '',
    useAIV2: false
  });

  const {
    generating,
    generatingProgress,
    generationError,
    retryCount,
    businessPlan,
    setGenerating,
    setGeneratingProgress,
    setGenerationError,
    generatePlan,
    startGenerating,
    handleRetry: baseHandleRetry
  } = usePlanGeneration();

  const {
    isPremium,
    downloadPlan,
    upgradeAccount
  } = usePlanActions();

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

  const handleRetry = () => {
    baseHandleRetry(formData, () => {
      setTimeout(() => {
        setStep(2);
        setGenerating(false);
      }, 800);
    });
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
    
    startGenerating();
    
    // Start the progress simulation
    simulateProgress(setGeneratingProgress, async () => {
      const success = await generatePlan(formData);
      if (success) {
        setTimeout(() => {
          setStep(2);
          setGenerating(false);
        }, 800);
      }
    });
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
    handleRetry,
    downloadPlan,
    upgradeAccount,
    setStep
  };
};

export type { FormData };
