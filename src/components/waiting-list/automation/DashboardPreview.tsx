
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, PieChart, TrendingUp, Users, Calendar, CheckSquare } from 'lucide-react';

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
          <div className="text-center flex-1 text-sm font-medium">Business Validation Dashboard</div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Dashboard Sections */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-3 rounded-lg flex items-center gap-3 group hover:shadow-md transition-all"
            >
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800/40 text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Audience</p>
                <p className="font-bold text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">12.4K</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-3 rounded-lg flex items-center gap-3 group hover:shadow-md transition-all"
            >
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800/40 text-purple-600 dark:text-purple-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Market Growth</p>
                <p className="font-bold text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">+24%</p>
              </div>
            </motion.div>
          </div>

          {/* Main Chart Area */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative h-[140px] bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
          >
            {/* Chart Visual Mockup */}
            <div className="absolute inset-0 flex items-end px-4 pb-4">
              <div className="h-[40%] w-[10%] bg-blue-400 dark:bg-blue-600 rounded-t-md"></div>
              <div className="h-[60%] w-[10%] bg-blue-500 dark:bg-blue-500 rounded-t-md ml-3"></div>
              <div className="h-[45%] w-[10%] bg-blue-400 dark:bg-blue-600 rounded-t-md ml-3"></div>
              <div className="h-[75%] w-[10%] bg-blue-500 dark:bg-blue-500 rounded-t-md ml-3"></div>
              <div className="h-[55%] w-[10%] bg-blue-400 dark:bg-blue-600 rounded-t-md ml-3"></div>
              <div className="h-[85%] w-[10%] bg-blue-500 dark:bg-blue-500 rounded-t-md ml-3"></div>
              <div className="h-[65%] w-[10%] bg-blue-400 dark:bg-blue-600 rounded-t-md ml-3"></div>
            </div>
            
            {/* Chart Overlay */}
            <div className="absolute top-3 left-3 flex items-center">
              <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mr-2">
                <LineChart className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium">Validation Progress</span>
            </div>
          </motion.div>
          
          {/* Activity Timeline */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Recent Activity</span>
              </h4>
              <span className="text-xs text-blue-600 dark:text-blue-400">View all</span>
            </div>
            
            <div className="space-y-1.5 max-h-[80px] overflow-y-auto">
              <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/40 text-sm">
                <CheckSquare className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs">Market research completed</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/40 text-sm">
                <CheckSquare className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs">Competitor analysis updated</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="p-3 border-t border-gray-100 dark:border-gray-700"
        >
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all">
            View Full Dashboard
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
