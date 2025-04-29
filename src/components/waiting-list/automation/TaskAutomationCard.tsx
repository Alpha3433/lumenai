
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
  return (
    <div className="bg-white dark:bg-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Task Automation</h3>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">Time saved</span>
      </div>
      
      <div className="space-y-4">
        {tasks.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:bg-white dark:hover:bg-gray-700/80 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
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
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.7, duration: 0.8, ease: "easeInOut" }}
                className="h-2 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Average time saved</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">98% reduction in time spent on validation</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskAutomationCard;
