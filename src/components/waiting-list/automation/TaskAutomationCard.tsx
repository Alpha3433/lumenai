
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';

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
      
      <div className="space-y-3">
        {tasks.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/80 dark:to-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all p-3"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                  {item.icon}
                </div>
                <div className="font-medium text-sm">{item.task}</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-red-500 line-through opacity-70">{item.manual}</div>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <div className="text-xs font-semibold text-green-500">{item.automated}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    <span className="text-green-500 font-medium flex items-center">
                      <Zap className="h-3 w-3 mr-0.5" /> 
                      {Math.round((parseInt(item.manual) / parseInt(item.automated.split(" ")[0])) * 100)}x faster
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress indicator */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.7, duration: 0.8, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ borderRadius: "0 0 0.5rem 0.5rem" }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-lg border border-green-100 dark:border-green-900/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500">
            <CheckCircle className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="font-medium text-sm">Average time saved</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-600 dark:text-gray-300">98% reduction in validation time</p>
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 rounded-full">
                50x faster
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskAutomationCard;
