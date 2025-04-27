
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

const AutomationSection = () => {
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
            Automation That Saves You Hours
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Focus on building your business while our AI handles the tedious research and analysis
          </p>
        </motion.div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Task</th>
                <th className="py-3 px-4 text-left">Manual Process</th>
                <th className="py-3 px-4 text-left">With Our AI</th>
                <th className="py-3 px-4 text-left">Time Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-900 dark:text-white">Market Research</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">40+ hours</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">5 minutes</td>
                <td className="py-3 px-4 text-green-600 dark:text-green-400">99.8% faster</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-900 dark:text-white">Competitor Analysis</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">25 hours</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">3 minutes</td>
                <td className="py-3 px-4 text-green-600 dark:text-green-400">99.5% faster</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-900 dark:text-white">Market Validation</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">2+ weeks</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">10 minutes</td>
                <td className="py-3 px-4 text-green-600 dark:text-green-400">99.9% faster</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-900 dark:text-white">Business Plan</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">7+ days</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">15 minutes</td>
                <td className="py-3 px-4 text-green-600 dark:text-green-400">99.7% faster</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Time Wasted</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Weeks spent researching markets manually
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Hours digging through competitor websites
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Costly market validation that's often biased
                </p>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">With Our Platform</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                <p className="text-gray-700 dark:text-gray-300">
                  Complete market analysis in minutes, not weeks
                </p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                <p className="text-gray-700 dark:text-gray-300">
                  AI-powered competitor research with actionable insights
                </p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                <p className="text-gray-700 dark:text-gray-300">
                  Unbiased validation based on real-world data points
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
