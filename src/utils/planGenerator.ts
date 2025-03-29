
import { toast } from "@/components/ui/use-toast";
import { generateSection } from "./planSections";

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
  
  console.log(`Generating business plan sections with ${aiEngine} AI engine...`);
  
  // We'll generate sections sequentially to provide better context between sections
  const generateExecutiveSummary = async (retries = 2): Promise<string> => {
    try {
      return await generateSection('executive summary', formData);
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying executive summary (${retries} attempts left)...`);
        return generateExecutiveSummary(retries - 1);
      }
      throw new Error(`Failed to generate executive summary after multiple attempts: ${error}`);
    }
  };
  
  const generateWithRetries = async (sectionName: string, retries = 2): Promise<string> => {
    try {
      return await generateSection(sectionName, formData);
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying ${sectionName} (${retries} attempts left)...`);
        return generateWithRetries(sectionName, retries - 1);
      }
      throw new Error(`Failed to generate ${sectionName} after multiple attempts: ${error}`);
    }
  };
  
  try {
    const executiveSummary = await generateExecutiveSummary();
    toast({
      description: "Executive summary created...",
    });
    
    const [marketAnalysis, businessModel] = await Promise.all([
      generateWithRetries('market analysis'),
      generateWithRetries('business model')
    ]);
    toast({
      description: "Market analysis completed...",
    });
    
    const [marketingPlan, financialProjections] = await Promise.all([
      generateWithRetries('marketing plan'),
      generateWithRetries('financial and idea validation')
    ]);
    toast({
      description: "Validating your business idea...",
    });
    
    const [riskAssessment, swotAnalysis] = await Promise.all([
      generateWithRetries('risk assessment'),
      generateWithRetries('swot analysis')
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
      description: `Business plan generated with ${formData.useAIV2 ? 'enhanced' : 'standard'} AI analysis!`,
    });
    
    // Validate the plan data to make sure all sections are populated
    const emptySection = Object.entries(plan).find(([_, content]) => 
      typeof content !== 'string' || content.trim().length === 0
    );
    
    if (emptySection) {
      throw new Error(`Plan generation incomplete: ${emptySection[0]} section is empty or invalid`);
    }
    
    return plan;
  } catch (error) {
    console.error("Error generating business plan:", error);
    
    // Don't silently fall back to mock data - propagate the error so 
    // the UI can show a retry option
    throw new Error(`Failed to generate business plan: ${error.message}`);
  }
};
