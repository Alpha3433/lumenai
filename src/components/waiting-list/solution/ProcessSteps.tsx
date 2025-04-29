
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
        staggerChildren: 0.2
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
      className="space-y-10 h-full flex flex-col justify-between"
    >
      {steps.map((step, index) => (
        <motion.div 
          key={index} 
          variants={childVariants}
          className="flex gap-6 group"
        >
          <div className="relative flex-shrink-0">
            <motion.div 
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl shadow-lg"
              whileInView={{ 
                scale: [1, 1.2, 1],
                transition: { delay: index * 0.2, duration: 0.5 }
              }}
              viewport={{ once: true }}
            >
              {step.number}
            </motion.div>
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-16 bottom-0 w-1 h-[calc(100%-50px)] -translate-x-1/2 bg-gradient-to-b from-purple-300 to-blue-300 dark:from-purple-900/50 dark:to-blue-900/30"></div>
            )}
          </div>
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            
            {/* Visual accent element */}
            <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 -z-10 opacity-50"></div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProcessSteps;
