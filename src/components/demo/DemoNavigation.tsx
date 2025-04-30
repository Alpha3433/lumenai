
import React from 'react';
import { DemoStep } from './types';

interface DemoNavigationProps {
  steps: DemoStep[];
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({ steps }) => {
  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col items-center gap-4 z-40">
      {steps.map((step) => (
        <a 
          key={step.id} 
          href={`#${step.id}`}
          className="group flex items-center gap-2"
        >
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {step.title}
          </span>
          <div 
            className={`w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gradient-to-r ${step.color} transition-all duration-300`} 
          />
        </a>
      ))}
    </div>
  );
};

export default DemoNavigation;
