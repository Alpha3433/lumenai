
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";

// Optimized version that reduces token count and improves performance
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 3): Promise<string> => {
  // Optimized prompt that focuses on essential information only
  const promptTemplate = `Create a professional ${sectionName} section for a business plan with these details:
  
Business: ${formData.businessName}
Description: ${formData.businessDescription}

Make the ${sectionName} comprehensive, data-driven, and specific to this business concept.`;

  // Always use gpt-4o-mini for faster responses (except financial and SWOT which need gpt-4o)
  const model = sectionName.includes('financial') || sectionName.includes('swot') ? 'gpt-4o' : 'gpt-4o-mini';
  
  // Adjust token limits based on section importance
  const maxTokens = sectionName.includes('executive') ? 800 : 
                   sectionName.includes('financial') ? 1500 : 1000;
  
  let attempts = 0;
  let error = null;
  let backoffTime = 1000; // Start with 1 second backoff
  
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
      
      if (response.success && response.text.length > 50) {
        console.log(`Successfully generated ${sectionName} (${response.text.length} chars)`);
        return response.text;
      } else if (response.text && response.text.includes("high demand")) {
        // If we got the fallback message about high demand, we should wait a bit longer
        console.warn(`AI service busy for ${sectionName}, waiting before retry...`);
        error = new Error(`AI service is busy. Try again later.`);
      } else {
        console.warn(`Generated content too short: ${response.text?.length || 0} chars`);
        throw new Error(`Generated content for ${sectionName} is too short or incomplete`);
      }
    } catch (err) {
      error = err;
      attempts++;
      console.log(`Attempt ${attempts} failed for ${sectionName}, retrying...`, err);
      
      // Exponential backoff before retry to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      backoffTime = Math.min(backoffTime * 2, 10000); // Double the backoff time, max 10 seconds
    }
  }
  
  // After all attempts fail, throw the error
  console.error(`All ${retryCount + 1} attempts failed for ${sectionName}`);
  throw error || new Error(`Failed to generate ${sectionName} after ${retryCount} attempts`);
};

export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Always use GPT-4o-mini for most sections to improve speed
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
  
  // Generate multiple sections in parallel to speed up the process
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
    // Generate sections in parallel with a concurrency limit of 2 to avoid rate limiting
    const generateSectionsInBatches = async () => {
      // Create batches of 2 sections to run concurrently (reduced from 3 to avoid timeouts)
      const batches = [];
      for (let i = 0; i < sections.length; i += 2) {
        batches.push(sections.slice(i, i + 2));
      }
      
      // Process each batch sequentially, but sections within a batch in parallel
      for (const batch of batches) {
        const batchResults = await Promise.all(batch.map(async (section) => {
          toast({ description: section.message });
          try {
            const content = await generateSection(section.name, formData, 3); // Increased retries
            return { section, content, error: null };
          } catch (error) {
            console.error(`Error generating ${section.name}:`, error);
            return { section, content: null, error };
          }
        }));
        
        // Process results from this batch
        for (const result of batchResults) {
          if (result.error) {
            toast({
              title: "Error",
              description: `Failed to generate ${result.section.name}. Please try again.`,
              variant: "destructive"
            });
            throw result.error;
          }
          
          plan[result.section.key] = result.content;
          console.log(`Generated ${result.section.key} successfully, length: ${result.content.length} chars`);
        }
      }
    };
    
    await generateSectionsInBatches();
    
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
