
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProcessSteps from './solution/ProcessSteps';
import CodeAnimation from './solution/CodeAnimation';
import { validationSteps, codeLines } from './solution/solutionStepsData';

/**
 * SolutionSteps Component
 * 
 * Displays a sequential breakdown of the business validation process with
 * animated step-by-step instructions and a complementary code visualization.
 */
const SolutionSteps = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-6 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">OUR PROCESS</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            The Solution — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">How It Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Our platform guides you through a proven validation process to test your startup idea before you invest
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ProcessSteps steps={validationSteps} />
          
          <div className="relative">
            <CodeAnimation codeLines={codeLines} />
            
            <motion.div
              className="absolute -z-10 w-full h-full rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-3xl -bottom-1/4 right-1/4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSteps;
