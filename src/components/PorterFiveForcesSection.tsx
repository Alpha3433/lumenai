
import React, { useMemo, useState, useEffect } from 'react';
import { extractPorterFiveForcesData } from '@/utils/porter';
import PorterFiveForcesSectionComponent from './porter/PorterFiveForcesSection';
import { generatePorterFiveForcesWithAI } from '@/utils/porter/openaiGeneration';

interface PorterFiveForcesSectionProps {
  marketAnalysis: string;
  businessName?: string;
  businessDescription?: string;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ 
  marketAnalysis, 
  businessName = '',
  businessDescription = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [forcesData, setForcesData] = useState(undefined);
  
  // Use the existing extraction as a fallback
  const extractedForcesData = useMemo(() => {
    if (!marketAnalysis) return undefined;
    return extractPorterFiveForcesData(marketAnalysis);
  }, [marketAnalysis]);

  // Generate AI-based analysis when business name and description are available
  useEffect(() => {
    const generateAnalysis = async () => {
      if (businessName && businessDescription) {
        setIsLoading(true);
        try {
          const aiGeneratedData = await generatePorterFiveForcesWithAI(businessName, businessDescription);
          if (aiGeneratedData) {
            setForcesData(aiGeneratedData);
          } else {
            // Fallback to extracted data if AI generation fails
            setForcesData(extractedForcesData);
          }
        } catch (error) {
          console.error('Error generating Porter\'s Five Forces analysis:', error);
          setForcesData(extractedForcesData);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use extracted data if business name or description is not provided
        setForcesData(extractedForcesData);
      }
    };

    generateAnalysis();
  }, [businessName, businessDescription, extractedForcesData]);

  return (
    <PorterFiveForcesSectionComponent 
      forcesData={forcesData} 
      marketAnalysis={marketAnalysis} 
      isLoading={isLoading}
    />
  );
};

export default PorterFiveForcesSection;
