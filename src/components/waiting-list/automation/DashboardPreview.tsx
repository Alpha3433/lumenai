
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const DashboardPreview = () => {
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
      className="relative"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center flex-1 text-sm font-medium">Dashboard</div>
        </div>
        
        <div className="p-4">
          <img 
            src="/lovable-uploads/c6786221-15c3-49b9-9854-72acc45218f6.png" 
            alt="Platform Dashboard" 
            className="w-full h-auto rounded-md border border-gray-200 dark:border-gray-600"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-5 grid grid-cols-2 gap-3"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">Business Plans</div>
              <div className="font-bold text-lg">0</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400">Upcoming Meetings</div>
              <div className="font-bold text-lg">1</div>
            </div>
          </motion.div>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Start Your Business Plan
          </Button>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -z-10 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl -top-10 -right-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute -z-10 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl -bottom-10 -left-10"
      />
    </motion.div>
  );
};

export default DashboardPreview;
