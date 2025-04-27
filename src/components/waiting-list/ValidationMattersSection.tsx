
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ValidationMattersSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Validating Your Idea Now — Even If It's 2AM and You're Working Solo
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't waste time on ideas that won't succeed. Get data-driven validation before investing resources.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Idea Validation Matters
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img src="/public/placeholder.svg" alt="Icon 1" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Saves Time & Money</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Avoid wasting resources on ideas that won't succeed in the market.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img src="/public/placeholder.svg" alt="Icon 2" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reduces Risk</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Data-driven insights help you make informed decisions about your business.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img src="/public/placeholder.svg" alt="Icon 3" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Refines Your Concept</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get insights to improve your idea before investing in development.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                Start Validating Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/public/lovable-uploads/0c0574b5-8cc0-41a2-8b87-ad8df6b502ca.png"
                alt="Platform dashboard" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValidationMattersSection;
