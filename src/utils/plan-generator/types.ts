
import { BusinessFormData, BusinessPlanData } from "@/types/businessPlan";

export interface GenerationOptions {
  model: string;
  maxTokens: number;
  temperature?: number;
  forceLiveResponse?: boolean;
  isAuthenticated?: boolean;
}

export interface SectionGenerationResult {
  content: string;
  success: boolean;
  error?: string;
}

export type { BusinessFormData, BusinessPlanData };
