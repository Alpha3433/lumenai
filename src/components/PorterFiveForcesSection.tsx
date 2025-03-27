
import React, { useMemo } from 'react';
import { extractPorterFiveForcesData } from '@/utils/porter';
import { callOpenAI } from '@/utils/openaiService';
import PorterFiveForcesSectionComponent from './porter/PorterFiveForcesSection';
import { PorterFiveForcesData } from '@/utils/porter';

interface PorterFiveForcesSectionProps {
  marketAnalysis: string;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ marketAnalysis }) => {
  // Extract Porter's Five Forces data from market analysis text
  const forcesData = useMemo(() => {
    const data = extractPorterFiveForcesData(marketAnalysis);
    return data;
  }, [marketAnalysis]);

  return <PorterFiveForcesSectionComponent forcesData={forcesData} marketAnalysis={marketAnalysis} />;
};

export default PorterFiveForcesSection;
