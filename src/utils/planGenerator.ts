
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
  useAIV2?: boolean;
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
  const aiEngine = formData.useAIV2 ? 'Premium' : 'Standard';
  
  toast({
    description: `Analyzing your business concept with ${aiEngine} AI engine...`,
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
    console.log(`Generating business plan sections with ${aiEngine} AI engine...`);
    
    // Generate sections in parallel with individual error handling to ensure partial results can still be returned
    const generateSectionSafely = async (sectionName: string) => {
      try {
        return await generateSection(sectionName, formData);
      } catch (error) {
        console.error(`Error generating ${sectionName}:`, error);
        return ''; // Return empty string on failure
      }
    };
    
    // Generate executive summary first and notify the user
    console.log(`Generating executive summary with prompt...`);
    let executiveSummary;
    try {
      executiveSummary = await generateSection('executive summary', formData);
      toast({
        description: "Executive summary created...",
      });
    } catch (error) {
      console.error("Error generating executive summary:", error);
      executiveSummary = generateExecutiveSummary(formData);
    }
    
    // Generate other sections in parallel
    const [marketAnalysis, businessModel, marketingPlan, financialProjections, riskAssessment, swotAnalysis] = await Promise.all([
      generateSectionSafely('market analysis'),
      generateSectionSafely('business model'),
      generateSectionSafely('marketing plan'),
      generateSectionSafely('financial and idea validation'),
      generateSectionSafely('risk assessment'),
      generateSectionSafely('swot analysis')
    ]);
    
    // Use fallback data for any sections that failed to generate
    const plan: BusinessPlanData = {
      executiveSummary: executiveSummary || generateExecutiveSummary(formData),
      marketAnalysis: marketAnalysis || generateMarketAnalysis(formData),
      businessModel: businessModel || generateBusinessModel(formData),
      marketingPlan: marketingPlan || generateMarketingPlan(formData),
      financialProjections: financialProjections || generateFinancialProjections(formData),
      riskAssessment: riskAssessment || generateRiskAssessment(formData),
      swotAnalysis: swotAnalysis || generateSwotAnalysis(formData)
    };
    
    toast({
      title: "Success",
      description: `Business plan generated with ${formData.useAIV2 ? 'enhanced' : 'standard'} AI analysis!`,
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
