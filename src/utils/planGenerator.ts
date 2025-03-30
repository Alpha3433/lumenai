
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";
import { createPromptForSection } from "./planSections";

// Optimized version with improved error handling and retries
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 5): Promise<string> => {
  // Use the improved prompt templates
  const promptTemplate = createPromptForSection(sectionName, formData);
  
  // Always use gpt-4o for better quality and reliability
  const model = 'gpt-4o';
  
  // Adjust token limits based on section complexity
  const maxTokens = sectionName.includes('financial') ? 2000 : 
                   sectionName.includes('swot') ? 1500 : 
                   sectionName.includes('market') ? 2000 : 1500;
  
  let attempts = 0;
  let lastError = null;
  let backoffTime = 3000; // Start with 3 seconds backoff
  
  while (attempts < retryCount) {
    try {
      console.log(`Generating ${sectionName} with ${model}, attempt ${attempts + 1}/${retryCount}`);
      
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: maxTokens,
        forceLiveResponse: true,
        isAuthenticated: formData.isAuthenticated
      });
      
      // Accept any non-empty response
      if (response.success && response.text) {
        console.log(`Successfully generated ${sectionName} (${response.text.length} chars)`);
        return response.text;
      } else if (response.text && response.text.includes("taking longer")) {
        // If we got the fallback message about timeouts, wait longer before retry
        console.warn(`AI service timeout for ${sectionName}, waiting before retry...`);
        lastError = new Error(`AI service timeout. Try again later.`);
      } else if (!response.success) {
        console.warn(`Failed to generate content: ${response.error}`);
        throw new Error(response.error || `Failed to generate ${sectionName}`);
      }
    } catch (err) {
      lastError = err;
      console.log(`Attempt ${attempts + 1} failed for ${sectionName}, retrying...`, err);
    }
    
    attempts++;
    
    // Exponential backoff before retry
    if (attempts < retryCount) {
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      backoffTime = Math.min(backoffTime * 1.5, 30000); // Increase backoff time with a cap at 30 seconds
    }
  }
  
  console.error(`All ${retryCount} attempts failed for ${sectionName}`);
  throw lastError || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
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
  
  // Define all sections that need to be generated
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
    // Generate sections SEQUENTIALLY to avoid API rate limits
    for (const section of sections) {
      toast({ description: section.message });
      
      try {
        // Try to generate each section with increased retry count
        const content = await generateSection(section.name, formData, 5);
        
        // If we get a valid response, add it to the plan
        if (content && content.length > 0) {
          plan[section.key] = content;
          console.log(`✅ Generated ${section.key} successfully, length: ${content.length} chars`);
        } else {
          // Fallback content if generation fails
          console.warn(`⚠️ Using fallback content for ${section.key}`);
          plan[section.key] = `We couldn't generate the ${section.name} section at this time. Please try again later.`;
        }
      } catch (error) {
        console.error(`❌ Error generating ${section.name}:`, error);
        
        // Provide a fallback response even on error
        plan[section.key] = `We couldn't generate the ${section.name} section at this time. Please try again later.`;
        
        toast({
          title: "Warning",
          description: `Some sections may be incomplete. You can regenerate the plan if needed.`,
          variant: "destructive"
        });
      }
    }
    
    toast({
      title: "Success",
      description: `Business plan generated successfully!`,
    });
    
    console.log('Business plan generation completed');
    
    // Return the plan - even if some sections have fallback content
    return plan as BusinessPlanData;
  } catch (error) {
    console.error('Business plan generation failed:', error);
    throw error;
  }
};

export type { BusinessFormData };
