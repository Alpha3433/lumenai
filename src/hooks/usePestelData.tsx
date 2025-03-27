
import { useMemo } from 'react';
import { extractPestelData, PestelData } from '@/utils/pestel';

export const usePestelData = (analysisText: string): PestelData => {
  // Extract PESTEL data from analysis text and limit to 4 points per category
  const pestelData = useMemo(() => {
    const data = extractPestelData(analysisText);
    
    // Limit to 4 points per category
    Object.keys(data).forEach(key => {
      if (data[key] && data[key].length > 4) {
        data[key] = data[key].slice(0, 4);
      }
      
      // Clean up any markdown formatting in the points
      data[key] = data[key].map(point => 
        point.replace(/^[#\-*]+\s*/, '').replace(/\*\*/g, '').trim()
      );
    });
    
    return data;
  }, [analysisText]);

  return pestelData;
};
