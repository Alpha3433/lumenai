
import { useState, useEffect } from 'react';
import { BusinessFormData } from '@/utils/planGenerator';
import { generateMarketingPlan, MarketingPlanData, extractMarketingPlanData } from '@/utils/marketing/openaiGeneration';

export function useMarketingPlan(
  businessName: string, 
  businessDescription: string,
  existingPlanText?: string
) {
  const [marketingPlan, setMarketingPlan] = useState<string>(existingPlanText || '');
  const [parsedData, setParsedData] = useState<MarketingPlanData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const generatePlan = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const formData: BusinessFormData = {
        businessName,
        businessDescription,
        useAIV2: true
      };
      
      const generatedPlan = await generateMarketingPlan(formData);
      setMarketingPlan(generatedPlan);
      
      const parsedPlan = extractMarketingPlanData(generatedPlan);
      setParsedData(parsedPlan);
      
      setLoading(false);
      return generatedPlan;
    } catch (error) {
      console.error('Error generating marketing plan:', error);
      setError('Failed to generate marketing plan. Please try again.');
      setLoading(false);
      return null;
    }
  };
  
  useEffect(() => {
    if (existingPlanText && existingPlanText.length > 0) {
      const parsedPlan = extractMarketingPlanData(existingPlanText);
      setParsedData(parsedPlan);
    }
  }, [existingPlanText]);
  
  return {
    marketingPlan,
    parsedData,
    loading,
    error,
    generatePlan
  };
}
