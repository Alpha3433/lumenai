
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DemoStep } from './types';

interface SocialInsightsStepProps {
  step: DemoStep;
}

const SocialInsightsStep: React.FC<SocialInsightsStepProps> = ({ step }) => {
  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
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
                Step 6
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Real-time social analysis
              </div>
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

export default SocialInsightsStep;
