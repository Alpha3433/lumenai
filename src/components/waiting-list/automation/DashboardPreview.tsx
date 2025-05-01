import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, Calendar, CheckSquare, FileText, Clock, Users } from 'lucide-react';
const DashboardPreview = () => {
  return <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 h-full relative overflow-hidden">
      
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      delay: 0.3,
      duration: 0.6
    }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center flex-1 text-sm font-medium">Business Validation Dashboard</div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Welcome section inspired by the reference image */}
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }} className="mb-4">
            <h4 className="text-lg font-semibold">Welcome back, Daniel!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your business today</p>
          </motion.div>
          
          {/* Action buttons inspired by the reference image */}
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.5,
          duration: 0.5
        }} className="flex flex-wrap gap-2 mb-4">
            <button className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-md text-xs font-medium">
              <FileText className="h-3.5 w-3.5" />
              Create Plan
            </button>
            <button className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-md text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" />
              Schedule
            </button>
            <button className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-md text-xs font-medium">
              <CheckSquare className="h-3.5 w-3.5" />
              New Task
            </button>
          </motion.div>
          
          {/* Stats cards inspired by the reference image */}
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.6,
          duration: 0.5
        }} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-3.5 w-3.5 text-purple-500" />
                <span className="text-xs font-medium">Business Plans</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">0</span>
                <span className="text-xs text-gray-500">plans created</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-medium">Upcoming Meetings</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">1</span>
                <span className="text-xs text-gray-500">Apr 24, 8:30 AM</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckSquare className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-medium">Tasks</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">0</span>
                <span className="text-xs text-gray-500">tasks due soon</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs font-medium">Messages</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">0</span>
                <span className="text-xs text-gray-500">messages</span>
              </div>
            </div>
          </motion.div>
          
          {/* First Panel - Business Plans */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.7,
          duration: 0.6
        }} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded">
                  <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h5 className="font-medium text-sm">Business Plans</h5>
              </div>
              <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1 rounded flex items-center gap-1">
                Create Plan
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <h6 className="font-medium mb-2">Ready to Create Your First Business Plan</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 max-w-xs">
                Start building your entrepreneurial journey with our AI-powered platform. Create your first business plan to validate ideas and develop winning strategies.
              </p>
              <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                Create Business Plan
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} whileInView={{
        y: 0,
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 1.0,
        duration: 0.5
      }} className="p-3 border-t border-gray-100 dark:border-gray-700">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all">
            View Full Dashboard
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} whileInView={{
      opacity: 0.8,
      scale: 1
    }} viewport={{
      once: true
    }} transition={{
      delay: 1,
      duration: 0.8
    }} className="absolute -z-10 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl -top-10 -right-10" />
      <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} whileInView={{
      opacity: 0.6,
      scale: 1
    }} viewport={{
      once: true
    }} transition={{
      delay: 1.3,
      duration: 0.8
    }} className="absolute -z-10 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl -bottom-10 -left-10" />
    </div>;
};
export default DashboardPreview;