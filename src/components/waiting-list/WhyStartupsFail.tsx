
import React from 'react';
import { motion } from 'framer-motion';
import FailureStatistics from './failures/FailureStatistics';
import IdeaGeneratorCard from './idea-generator/IdeaGeneratorCard';

const WhyStartupsFail: React.FC = () => {
  const failureReasons = [
    { reason: "No Market Need", percentage: 42 },
    { reason: "Ran Out of Cash", percentage: 29 },
    { reason: "Wrong Team", percentage: 23 },
    { reason: "Get Outcompeted", percentage: 19 }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-medium">
            The Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Most Ideas <span className="text-red-500">Fail</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            42% of startups fail due to no market need. Our platform ensures your idea doesn't become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FailureStatistics failureReasons={failureReasons} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <IdeaGeneratorCard />
            
            {/* Decorative blurred circles */}
            <div className="relative">
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5]
                }} 
                transition={{ 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }} 
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
