
import React, { useMemo } from 'react';
import { extractPorterFiveForcesData } from '@/utils/porter';
import PorterFiveForcesSectionComponent from './porter/PorterFiveForcesSection';

interface PorterFiveForcesSectionProps {
  marketAnalysis: string;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ marketAnalysis }) => {
  // Extract Porter's Five Forces data from market analysis text
  const forcesData = useMemo(() => extractPorterFiveForcesData(marketAnalysis), [marketAnalysis]);

  return <PorterFiveForcesSectionComponent forcesData={forcesData} marketAnalysis={marketAnalysis} />;
};

export default PorterFiveForcesSection;
