
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Clock, Shield } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div>
          <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Task Automation
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Eliminate manual work with intelligent automation
          </p>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Time saved
        </span>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {tasks.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="relative group overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                {item.icon}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-lg mb-2">{item.task}</div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2.5 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-medium rounded-md flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {item.manual}
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                  <div className="px-2.5 py-1 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-md flex items-center gap-1.5">
                    <Zap className="h-3 w-3" /> {item.automated}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Manual process
                  </span>
                  <span className="text-green-500 dark:text-green-400 font-medium text-xs flex items-center">
                    <Zap className="h-3 w-3 mr-0.5" /> 
                    {Math.round((parseInt(item.manual) / parseInt(item.automated.split(" ")[0])) * 100)}x faster
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30"></div>
            
            {/* Progress indicator */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.7, duration: 0.8, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-100 dark:border-green-900/30 p-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Average time saved</p>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">98% reduction in validation time</p>
              <span className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 rounded-full font-medium">
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
