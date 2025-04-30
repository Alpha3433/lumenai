
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoStep } from './types';
import BusinessValidationScore from '@/components/BusinessValidationScore';

interface BusinessValidationStepProps {
  step: DemoStep;
}

const BusinessValidationStep: React.FC<BusinessValidationStepProps> = ({ step }) => {
  // Example business description for demonstration purposes
  const businessDescription = `
    FitnessAI is a mobile application designed to help obese individuals lose weight through personalized workouts and nutrition plans. 
    The app uses artificial intelligence to adapt plans based on user progress and preferences.
    It has potential for recurring revenue through subscription models and addresses a growing market need.
    However, it faces high competition in the fitness app space and potential market saturation.
  `;

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
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step 1
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Data-driven insights
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Industry comparisons
              </div>
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700">
              Validate My Idea
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
              <BusinessValidationScore 
                businessText={businessDescription}
                businessName="FitnessAI"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessValidationStep;
