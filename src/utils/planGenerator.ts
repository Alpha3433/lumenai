
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";

// Helper function to generate a complete section with retries
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 2): Promise<string> => {
  const promptTemplate = `Create a detailed and professional ${sectionName} section for a business plan with the following details:
  
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

The ${sectionName} should be comprehensive, data-driven, and tailored specifically to this business concept.`;

  // Enhanced model selection:
  // - For useAIV2 (premium users who selected enhanced AI): Use gpt-4o (most powerful)
  // - For regular users: Use gpt-4o-mini (standard model)
  const model = formData.useAIV2 ? 'gpt-4o' : 'gpt-4o-mini';
  
  // Adjust token limits based on model capability
  const maxTokens = formData.useAIV2 ? 1500 : 1000;
  
  let attempts = 0;
  let error = null;
  
  while (attempts <= retryCount) {
    try {
      console.log(`Generating ${sectionName}, attempt ${attempts + 1}/${retryCount + 1} using model: ${model}`);
      
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: maxTokens,
        forceLiveResponse: true // Force using the actual OpenAI API rather than mock data
      });
      
      if (response.success && response.text.length > 100) {
        console.log(`Successfully generated ${sectionName} (${response.text.length} chars)`);
        return response.text;
      } else {
        console.warn(`Generated content for ${sectionName} is too short or incomplete: ${response.text.length} chars`);
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
  
  // If all attempts fail, throw an error rather than defaulting to mock data
  console.error(`All ${retryCount + 1} attempts failed for ${sectionName}`);
  throw error || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
};

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Use more specific description of the AI engine based on the useAIV2 flag
  const aiEngine = formData.useAIV2 ? 'Advanced GPT-4o' : 'Standard GPT-4o-mini';
  
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
  
  console.log(`Starting business plan generation for: ${formData.businessName}`);
  console.log(`Description length: ${formData.businessDescription.length} chars`);
  console.log(`Using AI engine: ${aiEngine}`);
  
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
      // Allow up to 3 retries for each section
      const content = await generateSection(section.name, formData, 3);
      plan[section.key] = content;
      
      console.log(`Generated ${section.key} successfully, length: ${content.length} chars`);
    } catch (error) {
      console.error(`Error generating ${section.name}:`, error);
      
      // Show error toast and propagate the error rather than using mock content
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
  
  console.log('Business plan generation completed successfully');
  
  // Type assertion is safe here because we've either fully populated the plan or thrown an error
  return plan as BusinessPlanData;
};

// Export the BusinessFormData type so it can be imported by other files
export type { BusinessFormData };
