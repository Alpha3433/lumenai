
import { toast } from "sonner";
import { generateSection } from "./planSections";
import { 
  generateExecutiveSummary,
  generateMarketAnalysis,
  generateBusinessModel,
  generateMarketingPlan,
  generateFinancialProjections,
  generateRiskAssessment,
  generateImplementationTimeline,
  generateSwotAnalysis
} from "./mockPlanSections";

export interface BusinessFormData {
  businessName: string;
  businessDescription: string;
}

export interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  implementationTimeline: string;
  swotAnalysis: string;
}

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  toast.success("Generating your business plan...");
  
  try {
    // Generate each section using OpenAI
    const [
      executiveSummary,
      marketAnalysis,
      businessModel,
      marketingPlan,
      financialProjections,
      riskAssessment,
      implementationTimeline,
      swotAnalysis
    ] = await Promise.all([
      generateSection('executive summary', formData),
      generateSection('market analysis', formData),
      generateSection('business model', formData),
      generateSection('marketing plan', formData),
      generateSection('financial projections', formData),
      generateSection('risk assessment', formData),
      generateSection('implementation timeline', formData),
      generateSection('swot analysis', formData)
    ]);
    
    const plan: BusinessPlanData = {
      executiveSummary,
      marketAnalysis,
      businessModel,
      marketingPlan,
      financialProjections,
      riskAssessment,
      implementationTimeline,
      swotAnalysis
    };
    
    toast.success("Business plan generated successfully!");
    return plan;
  } catch (error) {
    console.error("Error generating business plan:", error);
    toast.error("Failed to generate business plan. Please try again.");
    
    // Fallback to mock data if OpenAI fails
    return {
      executiveSummary: generateExecutiveSummary(formData),
      marketAnalysis: generateMarketAnalysis(formData),
      businessModel: generateBusinessModel(formData),
      marketingPlan: generateMarketingPlan(formData),
      financialProjections: generateFinancialProjections(formData),
      riskAssessment: generateRiskAssessment(formData),
      implementationTimeline: generateImplementationTimeline(formData),
      swotAnalysis: generateSwotAnalysis(formData)
    };
  }
};
