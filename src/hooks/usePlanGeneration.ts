
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { generateBusinessPlan, BusinessPlanData } from '@/utils/planGenerator';
import { simulateProgress } from '@/utils/progressSimulation';

// Default empty business plan
export const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
  swotAnalysis: ''
};

export interface PlanGenerationState {
  generating: boolean;
  generatingProgress: number;
  generationError: boolean;
  retryCount: number;
  businessPlan: BusinessPlanData;
}

export interface FormData {
  businessName: string;
  businessDescription: string;
  useAIV2: boolean;
}

export const usePlanGeneration = () => {
  const [state, setState] = useState<PlanGenerationState>({
    generating: false,
    generatingProgress: 0,
    generationError: false,
    retryCount: 0,
    businessPlan: defaultBusinessPlan,
  });

  const setGenerating = (generating: boolean) => 
    setState(prev => ({ ...prev, generating }));
  
  const setGeneratingProgress = (generatingProgress: number | ((prev: number) => number)) => {
    if (typeof generatingProgress === 'function') {
      setState(prev => ({ 
        ...prev, 
        generatingProgress: generatingProgress(prev.generatingProgress) 
      }));
    } else {
      setState(prev => ({ ...prev, generatingProgress }));
    }
  };
  
  const setGenerationError = (generationError: boolean) => 
    setState(prev => ({ ...prev, generationError }));
  
  const setRetryCount = (retryCount: number) => 
    setState(prev => ({ ...prev, retryCount }));
  
  const setBusinessPlan = (businessPlan: BusinessPlanData) => 
    setState(prev => ({ ...prev, businessPlan }));

  const generatePlan = async (formData: FormData): Promise<boolean> => {
    try {
      console.log("Starting plan generation with form data:", formData);
      
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: formData.useAIV2
      });
      
      // Validate the plan to make sure all sections are populated
      const hasAllSections = Object.values(plan).every(section => 
        typeof section === 'string' && section.trim().length > 0
      );
      
      if (!hasAllSections) {
        throw new Error("Plan generation incomplete: Some sections are missing");
      }
      
      setBusinessPlan(plan);
      setGeneratingProgress(100);
      setGenerationError(false);
      
      return true;
    } catch (error) {
      console.error('Error generating business plan:', error);
      setGenerationError(true);
      return false;
    }
  };

  const startGenerating = () => {
    setGenerating(true);
    setGenerationError(false);
    setRetryCount(0);
  };

  const handleRetry = (formData: FormData, onSuccess: () => void) => {
    setRetryCount(prev => prev + 1);
    setGenerationError(false);
    
    simulateProgress(setGeneratingProgress, async () => {
      const success = await generatePlan(formData);
      if (success) {
        onSuccess();
      } else if (state.retryCount >= 2) {
        // If we still fail after multiple retries, show a different error
        toast({
          title: "Generation issue",
          description: "We're experiencing technical difficulties. Please try again in a few minutes.",
          variant: "destructive"
        });
      }
    });
  };

  return {
    ...state,
    setGenerating,
    setGeneratingProgress, 
    setGenerationError,
    setRetryCount,
    setBusinessPlan,
    generatePlan,
    startGenerating,
    handleRetry,
    simulateProgress
  };
};
