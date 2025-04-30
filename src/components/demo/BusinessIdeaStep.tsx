
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';
import { DemoStep } from './types';

interface BusinessIdeaStepProps {
  step: DemoStep;
}

const BusinessIdeaStep: React.FC<BusinessIdeaStepProps> = ({ step }) => {
  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Generate Business Ideas
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Generate innovative business ideas based on your interests or current market trends.
          </p>
        </motion.div>
        
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
                Step 1
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mb-4">
              <CheckCircle className="h-4 w-4" />
              No technical skills required
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mt-6">
              Not sure what business to start? Try our Business Idea Generator to discover promising opportunities based on current market trends and your interests.
            </p>
            
            <Button 
              variant="outline" 
              className="mt-6 flex items-center gap-2"
              onClick={() => {
                const element = document.getElementById('business-idea-generator');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Try the Idea Generator
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
            id="business-idea-generator"
          >
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6">
              <BusinessIdeaGenerator />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIdeaStep;
