
import { toast } from "@/components/ui/use-toast";
import { generateSection } from "./planSections";
import { 
  generateExecutiveSummary,
  generateMarketAnalysis,
  generateBusinessModel,
  generateMarketingPlan,
  generateFinancialProjections,
  generateRiskAssessment,
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
  swotAnalysis: string;
}

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  toast({
    description: "Analyzing your business concept...",
  });
  
  if (!formData.businessName || !formData.businessDescription) {
    toast({
      title: "Error",
      description: "Business name and description are required",
      variant: "destructive"
    });
    throw new Error("Business name and description are required");
  }
  
  try {
    console.log("Generating business plan sections with OpenAI...");
    
    // We'll generate sections sequentially to provide better context between sections
    const executiveSummary = await generateSection('executive summary', formData);
    toast({
      description: "Executive summary created...",
    });
    
    const [marketAnalysis, businessModel] = await Promise.all([
      generateSection('market analysis', formData),
      generateSection('business model', formData)
    ]);
    toast({
      description: "Market analysis completed...",
    });
    
    const [marketingPlan, financialProjections] = await Promise.all([
      generateSection('marketing plan', formData),
      generateSection('financial and idea validation', formData)
    ]);
    toast({
      description: "Validating your business idea...",
    });
    
    const [riskAssessment, swotAnalysis] = await Promise.all([
      generateSection('risk assessment', formData),
      generateSection('swot analysis', formData)
    ]);
    
    const plan: BusinessPlanData = {
      executiveSummary,
      marketAnalysis,
      businessModel,
      marketingPlan,
      financialProjections,
      riskAssessment,
      swotAnalysis
    };
    
    toast({
      title: "Success",
      description: "Business plan generated with idea validation!",
    });
    return plan;
  } catch (error) {
    console.error("Error generating business plan:", error);
    toast({
      title: "Error",
      description: "Failed to generate business plan. Using placeholder data instead.",
      variant: "destructive"
    });
    
    // Fallback to mock data
    return {
      executiveSummary: generateExecutiveSummary(formData),
      marketAnalysis: generateMarketAnalysis(formData),
      businessModel: generateBusinessModel(formData),
      marketingPlan: generateMarketingPlan(formData),
      financialProjections: generateFinancialProjections(formData),
      riskAssessment: generateRiskAssessment(formData),
      swotAnalysis: generateSwotAnalysis(formData)
    };
  }
};
