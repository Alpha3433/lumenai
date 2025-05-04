
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, PresentationIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
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
                Investor-ready materials
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Data-backed metrics
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mt-2">
                <CheckCircle className="h-4 w-4" />
                Professional templates
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
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Investor Materials Generator</h3>
                <p className="text-red-100">Create professional pitch assets in minutes</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h4 className="font-medium mb-1">Business One-Pager</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Concise value proposition and traction metrics</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                        <BookOpen className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h4 className="font-medium mb-1">Pitch Deck</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">12-15 slides with all key investment details</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h4 className="font-medium mb-1">Traction Summary</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Growth metrics and validation results</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Generate Pitch Assets</Button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <blockquote className="text-sm text-gray-500 dark:text-gray-400 italic">
                    "The pitch deck you generated helped us secure our first $150K in pre-seed funding. Investors were impressed by how clearly it communicated our vision."
                  </blockquote>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <p className="text-sm font-medium">Michael Torres</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SaaS Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialInsightsStep;
