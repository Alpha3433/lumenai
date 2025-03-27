
import React from 'react';
import { motion } from 'framer-motion';
import { FlowChart, LineChart, PieChart } from 'lucide-react';

const RoadmapSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Roadmap: Keep Everyone Aligned
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Ensure that your AI-led AI helps to guide the right path. Whether a startup or scale-up, your business keeps vision focused and users engaged.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                  <FlowChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Strategic Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create comprehensive business plans with clear milestones and execution steps.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                  <LineChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Growth Forecasting</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Predict your business trajectory with data-driven financial projections and market analysis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                  <PieChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Resource Allocation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimize your budget and team focus with AI-recommended resource distribution strategies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 order-1 md:order-2"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl p-1">
              <img 
                src="/placeholder.svg" 
                alt="Roadmap Interface" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
