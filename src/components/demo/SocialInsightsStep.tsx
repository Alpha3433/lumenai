
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Dumbbell, Weight, Activity } from 'lucide-react';
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
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Personalized workouts
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Progress tracking
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mt-2">
                <CheckCircle className="h-4 w-4" />
                Expert coaching
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
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Fitness Programs</h3>
                <p className="text-green-100">Tailored workout plans for your goals and experience</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3">
                        <Dumbbell className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-medium mb-1">Strength Training</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Build muscle and improve overall fitness</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3">
                        <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-medium mb-1">Cardio Workouts</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Improve endurance and heart health</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3">
                        <Weight className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-medium mb-1">Weight Management</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Balanced nutrition and exercise plans</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Browse Fitness Programs</Button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <blockquote className="text-sm text-gray-500 dark:text-gray-400 italic">
                    "The personalized workout program helped me lose 15 pounds in just 8 weeks. The trainers are supportive and the app is easy to use."
                  </blockquote>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <p className="text-sm font-medium">Alex Rodriguez</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fitness Enthusiast</p>
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
