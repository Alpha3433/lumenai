
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DemoStep } from '../types';

interface DashboardStepInfoProps {
  step: DemoStep;
}

const DashboardStepInfo: React.FC<DashboardStepInfoProps> = ({ step }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:w-2/5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
          <step.icon className="h-5 w-5" />
        </div>
        <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
          Step 7
        </span>
      </div>
      
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        {step.title}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
        {step.description}
      </p>
      
      <div className="flex flex-wrap gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4" />
          Expert validation calls
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4" />
          30-day roadmapping
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mt-2">
          <CheckCircle className="h-4 w-4" />
          Real-time scheduling
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardStepInfo;
