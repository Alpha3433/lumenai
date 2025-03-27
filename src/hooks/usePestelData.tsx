
import { useMemo } from 'react';
import { extractPestelData, PestelData } from '@/utils/pestel';

export const usePestelData = (analysisText: string): PestelData => {
  // Extract PESTEL data from analysis text and limit to 3 points per category
  const pestelData = useMemo(() => {
    const data = extractPestelData(analysisText);
    
    // Limit to 3 points per category
    Object.keys(data).forEach(key => {
      const category = key as keyof PestelData;
      if (data[category] && data[category].length > 3) {
        data[category] = data[category].slice(0, 3);
      }
      
      // Clean up any markdown formatting in the points
      data[category] = data[category].map(point => 
        point.replace(/^[#\-*]+\s*/, '').replace(/\*\*/g, '').trim()
      );
    });
    
    return data;
  }, [analysisText]);

  return pestelData;
};
