
import React from 'react';
import { motion } from 'framer-motion';

const WhyStartupsFail = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Most Ideas Fail
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Avoid the common pitfalls that cause most startups to fail before they even get off the ground.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">42% of startups fail due to NO MARKET NEED</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1.5">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Building products nobody wants or needs
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1.5">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Spending months or years creating something that won't sell
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1.5">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Failing to validate ideas before investing time and money
                </p>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Failure Indicators:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">No Market Need</span>
                  <div className="w-24 h-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Ran Out of Cash</span>
                  <div className="w-24 h-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Wrong Team</span>
                  <div className="w-24 h-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  "Over 90% of startups fail. The #1 reason? Building something nobody wants."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
