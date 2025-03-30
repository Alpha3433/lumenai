
import { useState, useRef } from 'react';
import { BusinessPlanData } from '@/types/businessPlan';
import { generateBusinessPlan } from '@/utils/planGenerator';
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
    
    // Validate form data - but ignore premium check since all users get GPT-4o now
    const validationError = validateFormInput(formData, true);
    if (validationError) {
      return;
    }
    
    // Create new abort controller for this operation
    if (generationAbortController.current) {
      generationAbortController.current.abort();
    }
    generationAbortController.current = new AbortController();
    
    setGenerating(true);
    setGenerationError(null);
    const clearProgressSimulation = simulateProgress(setGeneratingProgress, setGenerationError);
    
    try {
      console.log('Starting business plan generation process...');
      console.log('User authenticated:', !!user);
      
      // Generate the business plan, passing user authentication status
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: true, // Always use the advanced model for everyone
        isAuthenticated: !!user // Pass authentication status to prioritize requests
      });
      
      console.log('Business plan generation completed successfully');
      
      // Set the business plan data
      setGeneratingProgress(100);
      
      // Wait a short time to show the completion state
      setTimeout(() => {
        onSuccess(plan);
        setGenerating(false);
      }, 800);
      
    } catch (error) {
      console.error('Error generating business plan:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setGenerationError(errorMessage);
      
      toast({
        title: "Generation Issue",
        description: "There was a problem generating some sections of your business plan. You can try again or use what we've generated so far.",
        variant: "destructive"
      });
      
      onError(errorMessage);
      
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

  return {
    generating,
    generatingProgress,
    generationError,
    handleGenerate
  };
};
