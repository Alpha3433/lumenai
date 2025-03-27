
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Brain, Sparkles } from 'lucide-react';

const TransformSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl p-1">
              <img 
                src="/placeholder.svg" 
                alt="Business Plan Interface" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Give Your Ideas a Voice & Transparency
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Build trust and stronger relationships by showing users their feedback drives meaningful changes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                  <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Business Validation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Test your ideas before committing resources with real market feedback and analysis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                  <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">AI-Powered Insights</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get recommendations that matter, backed by data analysis and market trends.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                  <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Success Blueprint</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A step-by-step roadmap to launch your business with confidence and strategic direction.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
