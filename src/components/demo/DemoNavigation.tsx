
import React, { useState, useEffect } from 'react';
import { DemoStep } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoNavigationProps {
  steps: DemoStep[];
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState('describe');
  
  useEffect(() => {
    const handleScroll = () => {
      // Get all step sections
      const sections = steps.map(step => {
        const element = document.getElementById(step.id);
        if (!element) return { id: step.id, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: step.id,
          top: rect.top,
          bottom: rect.bottom
        };
      });
      
      // Find the section that is currently most visible in the viewport
      const viewportHeight = window.innerHeight;
      let maxVisibleSection = sections[0].id;
      let maxVisibleArea = 0;
      
      sections.forEach(section => {
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, section.top);
        const visibleBottom = Math.min(viewportHeight, section.bottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // If this section has more visible area, update the active section
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          maxVisibleSection = section.id;
        }
      });
      
      setActiveStep(maxVisibleSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initialize on component mount
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [steps]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="glass-nav relative rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800/50 shadow-lg px-2 py-3">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>
        
        <div className="relative flex flex-col items-start gap-3">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            
            return (
              <button 
                key={step.id}
                onClick={() => scrollToSection(step.id)}
                className={`group flex items-center gap-2 transition-all duration-300 ease-in-out w-full rounded-lg px-3 py-1.5 ${
                  isActive ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30' : 'hover:bg-gray-100/30 dark:hover:bg-gray-800/30'
                }`}
                aria-label={`Navigate to ${step.title} section`}
              >
                <div className="relative">
                  <div 
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute left-1/2 top-6 -ml-px h-3 w-0.5 ${
                      isActive && activeStep !== steps[index + 1].id
                        ? 'bg-gradient-to-b from-purple-500 to-blue-200/30 dark:to-blue-500/10'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}></div>
                  )}
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {step.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DemoNavigation;
