
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";
import { createPromptForSection } from "./planSections";

// Optimized version that reduces token count and improves performance
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 3): Promise<string> => {
  // Use the improved prompt templates from planSections.ts
  const promptTemplate = createPromptForSection(sectionName, formData);
  
  // Always use gpt-4o for better quality and reliability
  // This is more expensive but produces more reliable results
  const model = 'gpt-4o';
  
  // Adjust token limits based on section complexity
  const maxTokens = sectionName.includes('financial') ? 1500 : 
                   sectionName.includes('swot') ? 1200 : 1000;
  
  let attempts = 0;
  let error = null;
  let backoffTime = 2000; // Start with 2 seconds backoff
  
  while (attempts <= retryCount) {
    try {
      console.log(`Generating ${sectionName} with ${model}, attempt ${attempts + 1}/${retryCount + 1}`);
      
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: maxTokens,
        forceLiveResponse: true,
        isAuthenticated: formData.isAuthenticated
      });
      
      // More stringent check for content quality
      if (response.success && response.text.length > 100) {
        console.log(`Successfully generated ${sectionName} (${response.text.length} chars)`);
        return response.text;
      } else if (response.text && response.text.includes("high demand")) {
        // If we got the fallback message about high demand, wait longer before retry
        console.warn(`AI service busy for ${sectionName}, waiting before retry...`);
        error = new Error(`AI service is busy. Try again later.`);
      } else if (!response.success || response.text.length <= 100) {
        console.warn(`Generated content too short or failed: ${response.text?.length || 0} chars`);
        throw new Error(`Generated content for ${sectionName} is too short or incomplete`);
      }
    } catch (err) {
      error = err;
      attempts++;
      console.log(`Attempt ${attempts} failed for ${sectionName}, retrying...`, err);
      
      // Longer exponential backoff before retry
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      backoffTime = Math.min(backoffTime * 2, 15000); // Double the backoff time, max 15 seconds
    }
  }
  
  // After all attempts fail, throw the error
  console.error(`All ${retryCount + 1} attempts failed for ${sectionName}`);
  throw error || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
};

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Always use GPT-4o for most reliable results
  const aiEngine = 'Enhanced AI';
  
  toast({
    description: `Creating your business plan with ${aiEngine}...`,
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
  
  // Generate sections one at a time with reduced parallelism to ensure reliability
  const sections = [
    { key: 'executiveSummary', name: 'executive summary', message: 'Creating executive summary...' },
    { key: 'marketAnalysis', name: 'market analysis', message: 'Analyzing market dynamics...' },
    { key: 'businessModel', name: 'business model', message: 'Developing business model...' },
    { key: 'marketingPlan', name: 'marketing plan', message: 'Building marketing strategy...' },
    { key: 'financialProjections', name: 'financial and idea validation', message: 'Calculating financial projections...' },
    { key: 'riskAssessment', name: 'risk assessment', message: 'Evaluating potential risks...' },
    { key: 'swotAnalysis', name: 'swot analysis', message: 'Completing SWOT analysis...' },
  ];
  
  toast({ description: 'Processing your business information...' });
  
  try {
    // Generate sections sequentially to avoid timeouts and rate limits
    // Sequential generation reduces likelihood of API timeouts and increases reliability
    for (const section of sections) {
      toast({ description: section.message });
      
      try {
        // Generate each section with increased retry limit
        const content = await generateSection(section.name, formData, 4);
        plan[section.key] = content;
        console.log(`Generated ${section.key} successfully, length: ${content.length} chars`);
      } catch (error) {
        console.error(`Error generating ${section.name}:`, error);
        toast({
          title: "Error",
          description: `Failed to generate ${section.name}. Please try again.`,
          variant: "destructive"
        });
        throw error;
      }
    }
    
    toast({
      title: "Success",
      description: `Business plan generated successfully!`,
    });
    
    console.log('Business plan generation completed successfully');
    
    // Type assertion is safe here because we've fully populated the plan
    return plan as BusinessPlanData;
  } catch (error) {
    console.error('Business plan generation failed:', error);
    throw error;
  }
};

// Export the BusinessFormData type so it can be imported by other files
export type { BusinessFormData };
