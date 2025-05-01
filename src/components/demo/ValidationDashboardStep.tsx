
import React from 'react';
import { motion } from 'framer-motion';
import { DemoStep } from './types';
import DashboardPreview from '../waiting-list/automation/DashboardPreview';

interface ValidationDashboardStepProps {
  step: DemoStep;
}

const ValidationDashboardStep: React.FC<ValidationDashboardStepProps> = ({ step }) => {
  const IconComponent = step.icon;
  
  return (
    <section id={step.id} className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color} text-white`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {step.description}
            </p>
            
            <ul className="space-y-3">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 rounded-full bg-green-100 dark:bg-green-900/30 p-1 flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Real-time Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-300">Monitor key performance indicators and advertising metrics all in one place</p>
                </div>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 rounded-full bg-green-100 dark:bg-green-900/30 p-1 flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Social Media Integration</h3>
                  <p className="text-gray-600 dark:text-gray-300">Connect Facebook and Instagram ad campaigns for comprehensive insights</p>
                </div>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 rounded-full bg-green-100 dark:bg-green-900/30 p-1 flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">Audience Demographics</h3>
                  <p className="text-gray-600 dark:text-gray-300">Understand your target audience with detailed demographic breakdowns</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl h-full overflow-hidden">
              <DashboardPreview />
            </div>
          </motion.div>
        </div>
        
        {/* Additional Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Competitive Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Compare your performance against industry benchmarks to identify opportunities.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300">Get AI-powered suggestions for optimizing your campaigns and business model.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 text-white`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
            <p className="text-gray-600 dark:text-gray-300">Identify potential challenges before they impact your business growth.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValidationDashboardStep;
