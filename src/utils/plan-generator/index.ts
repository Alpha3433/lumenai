
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { generateSection } from "./sectionGenerator";
import { getFallbackContent } from "./fallbackContent";

/**
 * Generates a complete business plan with all sections
 */
export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Set AI model based on user preference
  const aiEngine = formData.useAIV2 ? 'Enhanced AI (GPT-4o)' : 'Standard AI (GPT-4o-mini)';
  
  const startTime = Date.now();
  console.log(`🔍 [DIAGNOSIS] generateBusinessPlan started at ${new Date().toISOString()}`);
  
  toast({
    description: `Creating your business plan with ${aiEngine}...`,
  });
  
  if (!formData.businessName || !formData.businessDescription) {
    console.log("🔍 [DIAGNOSIS] Missing required fields");
    toast({
      title: "Error",
      description: "Business name and description are required",
      variant: "destructive"
    });
    throw new Error("Business name and description are required");
  }
  
  console.log(`🔍 [DIAGNOSIS] Starting business plan generation for: ${formData.businessName}`);
  console.log(`🔍 [DIAGNOSIS] Description length: ${formData.businessDescription.length} chars`);
  console.log(`🔍 [DIAGNOSIS] Using AI engine: ${aiEngine}`);
  
  const plan: Partial<BusinessPlanData> = {};
  
  // Define all sections that need to be generated
  const sections = [
    { key: 'executiveSummary', name: 'executive summary', message: 'Creating executive summary...' },
    { key: 'marketAnalysis', name: 'market analysis', message: 'Analyzing market dynamics...' },
    { key: 'businessModel', name: 'business model', message: 'Developing business model...' },
    { key: 'marketingPlan', name: 'marketing plan', message: 'Building marketing strategy...' },
    { key: 'financialProjections', name: 'financial projections', message: 'Calculating financial projections...' },
    { key: 'riskAssessment', name: 'risk assessment', message: 'Evaluating potential risks...' },
    { key: 'swotAnalysis', name: 'swot analysis', message: 'Completing SWOT analysis...' },
  ];
  
  toast({ description: 'Processing your business information...' });
  
  try {
    // Generate executive summary first - this is critical
    const executiveSummarySection = sections[0];
    try {
      toast({ description: executiveSummarySection.message });
      console.log(`🔍 [DIAGNOSIS] Generating ${executiveSummarySection.name}...`);
      console.time(`generate_${executiveSummarySection.key}`);
      
      const result = await generateSection(executiveSummarySection.name, formData, 0, 2);
      
      console.timeEnd(`generate_${executiveSummarySection.key}`);
      
      if (!result.content || result.content.trim() === '') {
        console.error(`❌ [DIAGNOSIS] Generated empty ${executiveSummarySection.name}, using fallback`);
        plan[executiveSummarySection.key] = getFallbackContent(executiveSummarySection.name, formData);
      } else {
        plan[executiveSummarySection.key] = result.content;
        console.log(`🔍 [DIAGNOSIS] Generated ${executiveSummarySection.key} successfully, length: ${result.content.length} chars`);
      }
    } catch (error) {
      console.error(`❌ [DIAGNOSIS] Error generating ${executiveSummarySection.name}:`, error);
      plan[executiveSummarySection.key] = getFallbackContent(executiveSummarySection.name, formData);
    }
    
    // Generate remaining sections SEQUENTIALLY to avoid API rate limits
    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      toast({ description: section.message });
      
      try {
        // Generate each section with built-in retry mechanism
        console.log(`🔍 [DIAGNOSIS] Generating ${section.name}...`);
        console.time(`generate_${section.key}`);
        
        const result = await generateSection(section.name, formData);
        
        console.timeEnd(`generate_${section.key}`);
        
        // Add the content to the plan
        plan[section.key] = result.content;
        console.log(`🔍 [DIAGNOSIS] Generated ${section.key} successfully, length: ${result.content.length} chars`);
        
      } catch (error) {
        console.timeEnd(`generate_${section.key}`);
        console.error(`❌ [DIAGNOSIS] Error generating ${section.name}:`, error);
        
        // Show warning toast for errors
        toast({
          title: "Warning",
          description: `Error generating ${section.name}. Using simplified content.`,
          variant: "destructive"
        });
        
        // Add fallback content for the section
        plan[section.key] = getFallbackContent(section.name, formData);
      }
    }
    
    const totalTime = Date.now() - startTime;
    console.log(`🔍 [DIAGNOSIS] Business plan generation completed in ${totalTime}ms`);
    
    toast({
      title: "Success",
      description: `Business plan generated successfully!`,
    });
    
    // Return the plan
    return plan as BusinessPlanData;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ [DIAGNOSIS] Business plan generation failed after ${totalTime}ms:`, error);
    throw error;
  }
};

// Re-export types and other functions for backward compatibility
export * from "./types";
export { generateSection } from "./sectionGenerator";
export { getFallbackContent } from "./fallbackContent";
