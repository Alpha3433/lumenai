
import React, { useState, useEffect } from 'react';
import { DemoStep } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DemoNavigationProps {
  steps: DemoStep[];
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState('describe');
  const [visitedSteps, setVisitedSteps] = useState<string[]>(['describe']);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const scrollingDown = currentScrollPosition > previousScrollPosition;
      setPreviousScrollPosition(currentScrollPosition);
      
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
      
      // Update visited steps based on scroll direction
      if (scrollingDown) {
        // When scrolling down, add to visited steps if not already included
        setVisitedSteps(prev => 
          prev.includes(maxVisibleSection) ? prev : [...prev, maxVisibleSection]
        );
      } else {
        // When scrolling up, remove steps after the current active step
        const activeIndex = steps.findIndex(step => step.id === maxVisibleSection);
        if (activeIndex >= 0) {
          setVisitedSteps(prev => 
            prev.filter((_, index) => {
              const stepIndex = steps.findIndex(step => step.id === prev[index]);
              return stepIndex <= activeIndex;
            })
          );
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initialize on component mount
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [steps, previousScrollPosition]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="glass-nav relative rounded-full backdrop-blur-xl bg-white/20 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 shadow-lg p-2">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>
        
        <div className="relative flex flex-col items-center gap-2">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = visitedSteps.includes(step.id) && activeStep !== step.id;
            const isNextActive = index > 0 && activeStep === steps[index - 1].id;
            
            return (
              <div key={step.id} className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => scrollToSection(step.id)}
                        className="group flex items-center justify-center"
                        aria-label={`Navigate to ${step.title} section`}
                      >
                        <motion.div 
                          initial={false}
                          animate={{ 
                            scale: isActive ? 1.2 : 1,
                            backgroundColor: isActive 
                              ? 'rgb(99, 102, 241)' 
                              : isCompleted 
                              ? 'rgb(34, 197, 94)' 
                              : 'rgb(209, 213, 219)'
                          }}
                          className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive 
                              ? 'ring-4 ring-indigo-300 dark:ring-indigo-500/30' 
                              : isCompleted 
                              ? 'bg-green-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          {isCompleted && (
                            <CheckCircle className="text-white w-2 h-2" />
                          )}
                        </motion.div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="font-medium">
                      {step.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Connection line between dots */}
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute left-1/2 top-full -ml-px w-0.5 h-4 ${
                      (isActive || isCompleted) && visitedSteps.includes(steps[index + 1].id)
                        ? 'bg-green-500'
                        : isActive || isNextActive
                        ? 'bg-gradient-to-b from-indigo-500 to-gray-300 dark:to-gray-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DemoNavigation;
