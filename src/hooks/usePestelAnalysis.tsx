
import { useState, useEffect } from 'react';
import { extractPestelData, PestelData } from '@/utils/pestel';
import { generatePestelDataWithAI } from '@/utils/pestel/openaiGeneration';

export const usePestelAnalysis = (
  analysisText: string,
  businessName?: string,
  businessDescription?: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pestelData, setPestelData] = useState<PestelData | null>(null);
  
  useEffect(() => {
    const generateAnalysis = async () => {
      // Use AI generation when business name and description are available
      if (businessName && businessDescription) {
        setIsLoading(true);
        try {
          const aiGeneratedData = await generatePestelDataWithAI(businessName, businessDescription);
          if (aiGeneratedData) {
            setPestelData(aiGeneratedData);
          } else {
            // Fallback to extracted data if AI generation fails
            const extractedData = extractPestelData(analysisText);
            setPestelData(extractedData);
          }
        } catch (error) {
          console.error('Error generating PESTEL analysis:', error);
          // Fallback to extracted data on error
          const extractedData = extractPestelData(analysisText);
          setPestelData(extractedData);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use extracted data if business name or description is not provided
        const extractedData = extractPestelData(analysisText);
        setPestelData(extractedData);
      }
    };

    generateAnalysis();
  }, [businessName, businessDescription, analysisText]);

  return { pestelData, isLoading };
};
