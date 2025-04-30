
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DemoStep } from './types';

interface StepDisplayProps {
  step: DemoStep;
  index: number;
  isFirstStep?: boolean;
}

const StepDisplay: React.FC<StepDisplayProps> = ({ step, index, isFirstStep = false }) => {
  return (
    <section 
      id={step.id}
      className={`py-20 border-b border-gray-200 dark:border-gray-800 ${index % 2 === 0 && !isFirstStep ? 'bg-white/50 dark:bg-gray-800/20' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${index % 2 === 0 && !isFirstStep ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <motion.div 
            initial={{ opacity: 0, x: index % 2 === 0 && !isFirstStep ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step {index + 1}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {index === 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Complete in minutes, not weeks
                </div>
              )}
              {index === 1 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Save thousands on market research
                </div>
              )}
              {index === 2 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  No design experience needed
                </div>
              )}
              {index === 3 && (
                <div className="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Built-in scheduling tools
                </div>
              )}
              {index === 4 && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Real-time social analysis
                </div>
              )}
              {index === 5 && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Comprehensive analytics
                </div>
              )}
              {index === 6 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Investor-ready reports
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
              <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-900">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StepDisplay;
