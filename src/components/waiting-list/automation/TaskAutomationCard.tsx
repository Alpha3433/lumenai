
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface AutomationTaskProps {
  task: string;
  manual: string;
  automated: string;
  icon: React.ReactNode;
}

interface TaskAutomationCardProps {
  tasks: AutomationTaskProps[];
}

const TaskAutomationCard = ({ tasks }: TaskAutomationCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 overflow-hidden relative"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Task Automation</h3>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Time saved</span>
      </div>
      
      <div className="space-y-4">
        {tasks.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                {item.icon}
              </div>
              <span className="font-medium">{item.task}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-red-500 text-sm line-through">{item.manual}</div>
                <div className="text-green-500 font-semibold">{item.automated}</div>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                  delay: 0.5 + index * 0.2, 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }}
                className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <div className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Average time saved</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">98% reduction in time spent on validation</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskAutomationCard;
