
import { BusinessPlanData } from '@/types/businessPlan';

export interface PlanCreatorFormData {
  businessName: string;
  businessDescription: string;
  useAIV2: boolean;
}

export interface PlanCreatorState {
  step: number;
  generating: boolean;
  generatingProgress: number;
  generationError: string | null;
  formData: PlanCreatorFormData;
  businessPlan: BusinessPlanData;
  isPremium: boolean;
}
