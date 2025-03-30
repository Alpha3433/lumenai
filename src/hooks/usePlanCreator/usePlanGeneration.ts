
import { useState, useRef } from 'react';
import { BusinessPlanData } from '@/types/businessPlan';
import { generateBusinessPlan } from '@/utils/plan-generator';
import { toast } from '@/components/ui/use-toast';
import { PlanCreatorFormData } from './types';
import { simulateProgress, validateFormInput } from './utils';
import { useAuth } from '@/components/AuthProvider';

interface UsePlanGenerationProps {
  formData: PlanCreatorFormData;
  isPremium: boolean;
  onSuccess: (plan: BusinessPlanData) => void;
  onError: (error: string) => void;
}

export const usePlanGeneration = ({ 
  formData, 
  isPremium, 
  onSuccess, 
  onError 
}: UsePlanGenerationProps) => {
  const [generating, setGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const generationAbortController = useRef<AbortController | null>(null);
  const { user } = useAuth();

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    console.log("🔍 [DIAGNOSIS] usePlanGeneration.handleGenerate started", new Date().toISOString());
    
    // Validate form input
    const validationError = validateFormInput(formData, isPremium);
    if (validationError) {
      console.log("🔍 [DIAGNOSIS] Form validation error:", validationError);
      toast({
        title: "Form Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }
    
    // Create new abort controller for this operation
    if (generationAbortController.current) {
      generationAbortController.current.abort();
      console.log("🔍 [DIAGNOSIS] Aborted previous generation request");
    }
    generationAbortController.current = new AbortController();
    
    setGenerating(true);
    setGenerationError(null);
    const clearProgressSimulation = simulateProgress(setGeneratingProgress, setGenerationError);
    
    try {
      console.log("🔍 [DIAGNOSIS] Starting business plan generation with model:", formData.useAIV2 ? "gpt-4o" : "gpt-4o-mini");
      console.time("businessPlanGeneration");
      
      // Generate the business plan with the user's authentication status
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: formData.useAIV2,
        isAuthenticated: !!user // Pass authentication status
      });
      
      console.timeEnd("businessPlanGeneration");
      console.log("🔍 [DIAGNOSIS] Business plan generation completed successfully");
      
      // Clear simulation and set to completion
      clearProgressSimulation();
      
      // Wait a short time to show the completion state
      setTimeout(() => {
        onSuccess(plan);
        setGenerating(false);
      }, 1000);
      
    } catch (error: any) {
      console.timeEnd("businessPlanGeneration");
      console.error("❌ [DIAGNOSIS] Error generating business plan:", error);
      
      // Create detailed error analysis
      let errorDetails = '';
      if (error instanceof Error) {
        errorDetails = `${error.name}: ${error.message}`;
        if (error.stack) {
          console.error("❌ [DIAGNOSIS] Error stack:", error.stack);
        }
      } else {
        errorDetails = String(error);
      }
      
      console.log("❌ [DIAGNOSIS] Error details:", errorDetails);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setGenerationError(errorMessage);
      
      toast({
        title: "Generation Issue",
        description: "There was a problem generating your business plan. Please try again.",
        variant: "destructive"
      });
      
      onError(errorMessage);
      
      // Clear progress simulation and wait a moment before allowing retry
      clearProgressSimulation();
      setTimeout(() => {
        setGenerating(false);
        setGeneratingProgress(0);
      }, 1500);
    }
  };

  return {
    generating,
    generatingProgress,
    generationError,
    handleGenerate
  };
};
