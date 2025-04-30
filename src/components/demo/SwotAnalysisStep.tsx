
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DemoStep } from './types';
import { Button } from '@/components/ui/button';

interface SwotAnalysisStepProps {
  step: DemoStep;
}

const SwotAnalysisStep: React.FC<SwotAnalysisStepProps> = ({ step }) => {
  // Example opportunities data for a fitness AI app
  const opportunities = [
    "The rising awareness of obesity-related health issues presents a growing market for targeted weight loss solutions like FitnessAI.",
    "Opportunities exist to expand into corporate wellness programs, providing a comprehensive tool for businesses to support their employees' health.",
    "Collaborations with health insurance companies could lead to incentives for users, making the app more appealing and increasing user acquisition.",
    "Advances in technology can lead to new features, such as virtual coaching or community support groups, enhancing user experience and retention."
  ];

  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
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
                Step 3
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Market opportunity analysis
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Growth potential insights
              </div>
            </div>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              Explore Market Opportunities
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-6">
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-center">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  Market Opportunities
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
                  Growth potential assessment
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                {opportunities.map((opportunity, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="flex gap-3">
                      <span className="inline-block w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex-shrink-0 text-sm flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-200">{opportunity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SwotAnalysisStep;
