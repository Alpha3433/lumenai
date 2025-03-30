
// This file is kept for backwards compatibility
// It re-exports everything from the new module structure

import { 
  generateBusinessPlan, 
  generateSection, 
  getFallbackContent,
  BusinessFormData
} from './plan-generator';

export { 
  generateBusinessPlan, 
  generateSection, 
  getFallbackContent 
};

export type { BusinessFormData };
