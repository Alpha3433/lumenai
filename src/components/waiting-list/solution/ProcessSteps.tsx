
import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-8"
    >
      {steps.map((step, index) => (
        <motion.div 
          key={index} 
          variants={childVariants}
          className="flex gap-5 group"
        >
          <div className="relative flex-shrink-0">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md"
              whileInView={{ 
                scale: [1, 1.2, 1],
                transition: { delay: index * 0.1, duration: 0.5 }
              }}
              viewport={{ once: true }}
            >
              {step.number}
            </motion.div>
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-12 bottom-0 w-0.5 h-[calc(100%-20px)] -translate-x-1/2 bg-gradient-to-b from-purple-200 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30"></div>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProcessSteps;
