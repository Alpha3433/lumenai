
import React from 'react';

interface ProgressDisplayProps {
  activeStep: number;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ activeStep }) => {
  return (
    <div className="flex justify-between mb-6">
      <div className={`h-2 w-1/3 rounded-l-full ${activeStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
      <div className={`h-2 w-1/3 ${activeStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
      <div className={`h-2 w-1/3 rounded-r-full ${activeStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
    </div>
  );
};

export default ProgressDisplay;
