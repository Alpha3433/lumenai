
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";

// Helper function to generate a complete section with retries
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 3): Promise<string> => {
  const promptTemplate = `Create a detailed and professional ${sectionName} section for a business plan with the following details:
  
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

The ${sectionName} should be comprehensive, data-driven, and tailored specifically to this business concept.`;

  // Always use gpt-4o for all users (free and premium)
  const model = 'gpt-4o';
  
  // Adjust token limits for detailed responses
  const maxTokens = 1500;
  
  let attempts = 0;
  let error = null;
  
  while (attempts <= retryCount) {
    try {
      console.log(`Generating ${sectionName}, attempt ${attempts + 1}/${retryCount + 1} using model: ${model}`);
      
      // Always force live response
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: maxTokens,
        forceLiveResponse: true,
        isAuthenticated: formData.isAuthenticated
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
      
      // Increased delay before retry to give APIs more time to recover
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // After all attempts fail, throw the error instead of falling back to mock data
  console.error(`All ${retryCount + 1} attempts failed for ${sectionName}`);
  throw error || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
};

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Always use GPT-4o regardless of plan
  const aiEngine = 'GPT-4o';
  
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
  console.log(`User authenticated: ${formData.isAuthenticated ? 'Yes' : 'No'}`);
  
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
      
      toast({
        title: "Error",
        description: `Failed to generate ${section.name}. Please try again later.`,
        variant: "destructive"
      });
      
      // Throw the error instead of falling back to mock data
      throw new Error(`Failed to generate ${section.name}: ${error.message}`);
    }
  }
  
  toast({
    title: "Success",
    description: `Business plan generated with GPT-4o AI analysis!`,
  });
  
  console.log('Business plan generation completed successfully');
  
  // Type assertion is safe here because we've fully populated the plan
  return plan as BusinessPlanData;
};

// Export the BusinessFormData type so it can be imported by other files
export type { BusinessFormData };
