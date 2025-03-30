
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
      // For testing purposes, use mock data with a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the business name to customize the fallback models
      const modelData = getFallbackBusinessModels(businessName);
      setBusinessModels(modelData);
      
      console.log('Generated business models using fallback data');
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
