
import { useState, useEffect } from 'react';
import { callOpenAI } from '@/utils/openaiService';
import { toast } from '@/components/ui/use-toast';
import { BusinessModel } from './types';

// Sample business model data to use as fallback
const getFallbackBusinessModels = (businessName: string): BusinessModel[] => [
  {
    name: "Subscription Service",
    description: `A recurring revenue model where customers pay monthly or annual fees to access ${businessName}'s platform and services.`,
    fitScore: 8,
    keyBenefits: ["Predictable revenue", "Higher customer lifetime value", "Scalable growth model"],
    implementationComplexity: "Medium"
  },
  {
    name: "Freemium Model",
    description: `Offer basic ${businessName} services for free, with premium features and functionality available for paying customers.`,
    fitScore: 7,
    keyBenefits: ["Large user acquisition potential", "Upsell opportunities", "Lower barrier to entry"],
    implementationComplexity: "Medium"
  },
  {
    name: "Marketplace Platform",
    description: `Connect buyers and sellers within the ${businessName} ecosystem, taking a commission on transactions or charging listing fees.`,
    fitScore: 9,
    keyBenefits: ["Network effects", "Multiple revenue streams", "Scalable with minimal inventory"],
    implementationComplexity: "High"
  }
];

export const useBusinessModels = (
  businessName: string, 
  businessDescription: string,
  isPremium: boolean
) => {
  const [businessModels, setBusinessModels] = useState<BusinessModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Only generate business models if we have enough information
    if (businessName && businessDescription) {
      generateBusinessModels();
    }
  }, [businessName, businessDescription]);

  const generateBusinessModels = async () => {
    setLoading(true);
    setError('');

    try {
      // Create a prompt for the business model generation
      const prompt = `Generate 3 viable business models for the following business:
      Business Name: ${businessName}
      Business Description: ${businessDescription}
      
      For each business model, provide the following in JSON format:
      {
        "models": [
          {
            "name": "Name of the model",
            "description": "Detailed description of how this model works for ${businessName}",
            "fitScore": A number from 1-10 indicating how well this model fits the business,
            "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
            "implementationComplexity": "Low, Medium, or High"
          }
        ]
      }
      
      Ensure the models are diverse and specific to this business. Focus on practical, revenue-generating approaches.`;
      
      const systemPrompt = "You are a business model expert generating practical, innovative revenue models in a structured JSON format.";
      
      // Call OpenAI API
      const response = await callOpenAI({
        prompt,
        systemPrompt,
        model: isPremium ? 'gpt-4o' : 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1500,
        isAuthenticated: isPremium,
        forceLiveResponse: true
      });
      
      if (response.success && response.text) {
        try {
          // Extract the JSON object from the response
          const jsonMatch = response.text.match(/\{[\s\S]*\}/);
          const jsonString = jsonMatch ? jsonMatch[0] : null;
          
          if (jsonString) {
            const parsedData = JSON.parse(jsonString);
            if (parsedData.models && Array.isArray(parsedData.models)) {
              setBusinessModels(parsedData.models);
              console.log('Successfully generated business models from API');
              return;
            }
          }
          
          // If parsing fails, throw error to use fallback
          throw new Error('Failed to parse API response');
        } catch (parseError) {
          console.warn('Error parsing business models JSON, using fallback:', parseError);
          // If we can't parse the response, use fallback data
          setBusinessModels(getFallbackBusinessModels(businessName));
        }
      } else {
        // If API call fails, use fallback data
        console.warn('API response unsuccessful, using fallback data');
        setBusinessModels(getFallbackBusinessModels(businessName));
      }
    } catch (e) {
      console.error('Error generating business models:', e);
      setError('An error occurred while generating business models');
      toast({
        title: "Error",
        description: "An error occurred while generating business models",
        variant: "destructive"
      });
      
      // Even on error, set fallback models
      setBusinessModels(getFallbackBusinessModels(businessName));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    generateBusinessModels();
  };

  return {
    businessModels,
    loading,
    error,
    refreshing,
    generateBusinessModels,
    handleRefresh
  };
};
