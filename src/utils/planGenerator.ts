
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";

// Helper function to generate a complete section with retries
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 2): Promise<string> => {
  const promptTemplate = `Create a detailed and professional ${sectionName} section for a business plan with the following details:
  
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

The ${sectionName} should be comprehensive, data-driven, and tailored specifically to this business concept.`;

  const model = formData.useAIV2 ? 'gpt-4' : 'gpt-3.5-turbo';
  
  let attempts = 0;
  let error = null;
  
  while (attempts <= retryCount) {
    try {
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: 1000
      });
      
      if (response.success && response.text.length > 100) {
        return response.text;
      } else {
        throw new Error(`Generated content for ${sectionName} is too short or incomplete`);
      }
    } catch (err) {
      error = err;
      attempts++;
      console.log(`Attempt ${attempts} failed for ${sectionName}, retrying...`, err);
      // Short delay before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw error || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
};

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
  
  const plan: Partial<BusinessPlanData> = {};
  
  // Generate sections sequentially with progress notifications
  const sections = [
    { key: 'executiveSummary', name: 'executive summary', message: 'Creating executive summary...' },
    { key: 'marketAnalysis', name: 'market analysis', message: 'Analyzing market dynamics...' },
    { key: 'businessModel', name: 'business model', message: 'Developing business model...' },
    { key: 'marketingPlan', name: 'marketing plan', message: 'Building marketing strategy...' },
    { key: 'financialProjections', name: 'financial and idea validation', message: 'Calculating financial projections...' },
    { key: 'riskAssessment', name: 'risk assessment', message: 'Evaluating potential risks...' },
    { key: 'swotAnalysis', name: 'swot analysis', message: 'Completing SWOT analysis...' },
  ];
  
  for (const section of sections) {
    toast({ description: section.message });
    
    try {
      const content = await generateSection(section.name, formData, 3);
      plan[section.key] = content;
      
      console.log(`Generated ${section.key} successfully, length: ${content.length}`);
    } catch (error) {
      console.error(`Error generating ${section.name}:`, error);
      
      // Instead of using mock data, we'll throw an error to be handled by the caller
      toast({
        title: "Error",
        description: `Could not generate ${section.name}. Please try again.`,
        variant: "destructive"
      });
      
      throw new Error(`Failed to generate ${section.name}. Please try with a different description or try again later.`);
    }
  }
  
  toast({
    title: "Success",
    description: `Business plan generated with ${formData.useAIV2 ? 'enhanced' : 'standard'} AI analysis!`,
  });
  
  // Type assertion is safe here because we've either fully populated the plan or thrown an error
  return plan as BusinessPlanData;
};
