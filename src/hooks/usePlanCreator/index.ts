
import { useState, useEffect } from 'react';
import { BusinessPlanData } from '@/types/businessPlan';
import { usePlanGeneration } from './usePlanGeneration';
import { mockActions } from './utils';
import { PlanCreatorFormData, PlanCreatorState } from './types';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useAuth } from '@/components/AuthProvider';

interface PlanCreatorInitialData {
  businessName?: string;
  businessDescription?: string;
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

export function usePlanCreator(initialData?: PlanCreatorInitialData | null) {
  const [step, setStep] = useState<PlanCreatorState['step']>(1);
  const [formData, setFormData] = useState<PlanCreatorFormData>({
    businessName: initialData?.businessName || '',
    businessDescription: initialData?.businessDescription || '',
    useAIV2: false
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);
  
  // Get user information from auth context
  const { user } = useAuth();
  
  // Use the enhanced subscription hook to get detailed subscription information
  const { 
    isPremium, 
    isTrialPeriod, 
    isExpiringSoon 
  } = useUserSubscription(user?.id);

  // Handle successful plan generation
  const handlePlanSuccess = (plan: BusinessPlanData) => {
    setBusinessPlan(plan);
    setStep(2);
  };
  
  // Handle plan generation error
  const handlePlanError = (error: string) => {
    console.error('Plan generation error:', error);
    // Error is already handled in usePlanGeneration
  };

  // Use the plan generation hook
  const {
    generating,
    generatingProgress,
    generationError,
    handleGenerate
  } = usePlanGeneration({
    formData,
    isPremium,
    onSuccess: handlePlanSuccess,
    onError: handlePlanError
  });

  useEffect(() => {
    if (initialData?.businessName || initialData?.businessDescription) {
      setFormData(prev => ({
        ...prev,
        businessName: initialData.businessName || prev.businessName,
        businessDescription: initialData.businessDescription || prev.businessDescription
      }));
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleGenerate(e);
  };

  const downloadPlan = () => {
    mockActions.downloadPlan();
  };

  const upgradeAccount = () => {
    mockActions.upgradeAccount(setIsPremium);
  };

  return {
    step,
    formData,
    businessPlan,
    generating,
    generatingProgress,
    generationError,
    isPremium,
    isTrialPeriod,
    isExpiringSoon,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
    downloadPlan,
    upgradeAccount,
    setStep
  };
}

export * from './types';
