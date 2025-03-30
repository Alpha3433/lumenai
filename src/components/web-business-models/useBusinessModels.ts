
import { useState, useEffect } from 'react';
import { callOpenAI } from '@/utils/openaiService';
import { toast } from '@/components/ui/use-toast';
import { BusinessModel } from './types';

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
    if (isPremium) {
      generateBusinessModels();
    }
  }, [isPremium, businessName, businessDescription]);

  const generateBusinessModels = async () => {
    setLoading(true);
    setError('');

    try {
      const prompt = `Based on the business named "${businessName}" with the following description: "${businessDescription}", 
      suggest 3 optimal web-based business models that would work well for this concept. 
      
      For each model, include:
      1. A name for the business model
      2. A brief description (30-40 words)
      3. A fit score from 1-10 indicating how well it matches the business concept
      4. 2-3 key benefits of this model for this specific business
      5. Implementation complexity (Low, Medium, or High)
      
      Format your response as a JSON array like this:
      [
        {
          "name": "Model Name",
          "description": "Brief description...",
          "fitScore": 8,
          "keyBenefits": ["Benefit 1", "Benefit 2"],
          "implementationComplexity": "Medium"
        }
      ]
      
      Only include these fields in your response, formatted as valid JSON that can be parsed directly.`;

      const response = await callOpenAI({
        prompt,
        model: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1000
      });

      if (response.success) {
        try {
          // Parse the JSON response
          const modelData = JSON.parse(response.text);
          setBusinessModels(modelData);
        } catch (parseError) {
          console.error('Error parsing business models JSON:', parseError);
          setError('Failed to parse business models data');
          toast({
            title: "Error",
            description: "Failed to parse business models data",
            variant: "destructive"
          });
        }
      } else {
        setError('Failed to generate business models');
        toast({
          title: "Error",
          description: "Failed to generate business models",
          variant: "destructive"
        });
      }
    } catch (e) {
      console.error('Error generating business models:', e);
      setError('An error occurred while generating business models');
      toast({
        title: "Error",
        description: "An error occurred while generating business models",
        variant: "destructive"
      });
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
