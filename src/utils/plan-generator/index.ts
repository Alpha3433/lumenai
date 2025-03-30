
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { generateSection } from "./sectionGenerator";

/**
 * Generates a complete business plan with all sections
 */
export const generateBusinessPlan = async (formData: BusinessFormData): Promise<BusinessPlanData> => {
  // Set AI model based on user preference
  const aiEngine = formData.useAIV2 ? 'Enhanced AI (GPT-4o)' : 'Standard AI (GPT-4o-mini)';
  
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
        // Generate each section with built-in retry mechanism
        const result = await generateSection(section.name, formData);
        
        // Add the content to the plan
        plan[section.key] = result.content;
        console.log(`✅ Generated ${section.key} successfully, length: ${result.content.length} chars`);
        
        // If generation wasn't successful (used fallback), show a warning but continue
        if (!result.success) {
          console.warn(`⚠️ Used fallback content for ${section.key}`);
        }
      } catch (error) {
        console.error(`❌ Error generating ${section.name}:`, error);
        
        // Show warning toast for fallback usage
        toast({
          title: "Warning",
          description: `Some sections may be using example content. You can regenerate the plan if needed.`,
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

// Re-export types and other functions for backward compatibility
export * from "./types";
export { generateSection } from "./sectionGenerator";
export { getFallbackContent } from "./fallbackContent";
