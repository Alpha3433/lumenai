
import { toast } from "@/components/ui/use-toast";
import { BusinessPlanData, BusinessFormData } from "@/types/businessPlan";
import { callOpenAI } from "./openaiService";

// Helper function to generate a complete section with retries
export const generateSection = async (sectionName: string, formData: BusinessFormData, retryCount = 2): Promise<string> => {
  const promptTemplate = `Create a detailed and professional ${sectionName} section for a business plan with the following details:
  
Business Name: ${formData.businessName}
Business Description: ${formData.businessDescription}

The ${sectionName} should be comprehensive, data-driven, and tailored specifically to this business concept.`;

  const model = formData.useAIV2 ? 'gpt-4o' : 'gpt-4o-mini';
  
  let attempts = 0;
  let error = null;
  
  while (attempts <= retryCount) {
    try {
      console.log(`Generating ${sectionName}, attempt ${attempts + 1}/${retryCount + 1}`);
      
      const response = await callOpenAI({
        prompt: promptTemplate,
        model: model,
        temperature: 0.7,
        maxTokens: 1000
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
  
  // If all attempts fail, try to use a mock response in development
  if (import.meta.env.DEV) {
    console.log(`All ${retryCount + 1} attempts failed for ${sectionName}, using mock data in dev mode`);
    
    // Basic mock data based on section
    const mockSections: Record<string, string> = {
      'executive summary': `Executive summary for ${formData.businessName}: This business aims to ${formData.businessDescription.substring(0, 100)}...`,
      'market analysis': `Market analysis for ${formData.businessName}: Based on current industry trends, this business targets a market with significant growth potential.`,
      'business model': `Business model for ${formData.businessName}: This business will generate revenue through a combination of subscription services and one-time purchases.`,
      'marketing plan': `Marketing plan for ${formData.businessName}: The marketing strategy will focus on digital channels, content marketing, and strategic partnerships.`,
      'financial and idea validation': `Financial projections for ${formData.businessName}: Initial investment required is estimated at $50,000 with projected break-even in 18 months.`,
      'risk assessment': `Risk assessment for ${formData.businessName}: Key risks include market competition, regulatory changes, and operational scalability challenges.`,
      'swot analysis': `**Strengths**\n• Innovative business concept\n• Experienced team\n• Low overhead costs\n• Scalable model\n\n**Weaknesses**\n• Limited initial capital\n• New market entrant\n• Unproven track record\n• Dependency on key personnel\n\n**Opportunities**\n• Growing market demand\n• Digital transformation trends\n• Partnership potential\n• International expansion\n\n**Threats**\n• Established competitors\n• Economic uncertainty\n• Regulatory changes\n• Technological disruption`
    };
    
    return mockSections[sectionName.toLowerCase()] || 
      `This is a mock ${sectionName} section for ${formData.businessName}. In a production environment, this would contain detailed analysis and recommendations.`;
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
      
      // Provide a fallback response for development environments
      if (import.meta.env.DEV) {
        console.log(`Using fallback content for ${section.name} in development environment`);
        plan[section.key] = `This is fallback content for the ${section.name} section. In production, this would be generated by AI based on your business description.`;
      } else {
        // In production, we'll throw an error to be handled by the caller
        toast({
          title: "Error",
          description: `Could not generate ${section.name}. Please try again.`,
          variant: "destructive"
        });
        
        throw new Error(`Failed to generate ${section.name}. Please try with a different description or try again later.`);
      }
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
