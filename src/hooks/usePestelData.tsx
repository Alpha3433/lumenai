
import { useMemo } from 'react';
import { extractPestelData, PestelData } from '@/utils/pestel';

export const usePestelData = (analysisText: string): PestelData => {
  // Extract PESTEL data from analysis text and clean up formatting
  const pestelData = useMemo(() => {
    console.log("Processing PESTEL data from analysis text");
    const data = extractPestelData(analysisText);
    
    // Process each category
    Object.keys(data).forEach(key => {
      const category = key as keyof PestelData;
      
      // Clean up any markdown or heading formatting in the points
      data[category] = data[category]
        .map(point => 
          point
            .replace(/^(political|economic|social|technological|environmental|legal):\s*/i, '')
            .replace(/^(#|\*|\-)+\s*/g, '')
            .replace(/^[A-Z\s]+:\s*/g, '')
            .replace(/^\d+\.\s*/, '')
            .replace(/\*\*/g, '')
            .replace(/POLITICAL FACTORS?:?\s*/i, '')
            .replace(/ECONOMIC FACTORS?:?\s*/i, '')
            .replace(/SOCIAL FACTORS?:?\s*/i, '')
            .replace(/TECHNOLOGICAL FACTORS?:?\s*/i, '')
            .replace(/ENVIRONMENTAL FACTORS?:?\s*/i, '')
            .replace(/LEGAL FACTORS?:?\s*/i, '')
            .trim()
        )
        // Remove any empty points
        .filter(point => point.length > 0)
        // Limit to 3 most important points
        .slice(0, 3);
    });
    
    return data;
  }, [analysisText]);

  return pestelData;
};
