
import React, { useMemo } from 'react';
import { extractPorterFiveForcesData } from '@/utils/porterFiveUtils';
import PorterFiveForcesSectionComponent from './porter/PorterFiveForcesSection';

interface PorterFiveForcesSectionProps {
  analysisText: string;
}

const PorterFiveForcesSection: React.FC<PorterFiveForcesSectionProps> = ({ analysisText }) => {
  // Extract Porter's Five Forces data from analysis text
  const forcesData = useMemo(() => extractPorterFiveForcesData(analysisText), [analysisText]);

  return <PorterFiveForcesSectionComponent forcesData={forcesData} />;
};

export default PorterFiveForcesSection;
