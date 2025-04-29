
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const DashboardPreview = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 h-full relative overflow-hidden">
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
      >
        Interactive Dashboard
      </motion.h3>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
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
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            src="/lovable-uploads/c6786221-15c3-49b9-9854-72acc45218f6.png" 
            alt="Platform Dashboard" 
            className="w-full h-auto rounded-md border border-gray-200 dark:border-gray-600 shadow-sm"
          />
          
          <div className="mt-5 grid grid-cols-2 gap-3">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-3 rounded-lg group hover:shadow-md transition-all hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-800/40"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">Business Plans</div>
              <div className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">0</div>
            </motion.div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-3 rounded-lg group hover:shadow-md transition-all hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/30 dark:hover:to-purple-800/40"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">Upcoming Meetings</div>
              <div className="font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">1</div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="p-4 border-t border-gray-100 dark:border-gray-700"
        >
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
            Start Your Business Plan
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -z-10 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl -top-10 -right-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute -z-10 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl -bottom-10 -left-10"
      />
    </div>
  );
};

export default DashboardPreview;
