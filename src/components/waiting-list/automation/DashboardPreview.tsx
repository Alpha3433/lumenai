
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  LineChart, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Clock, 
  Users,
  Facebook,
  Instagram,
  TrendingUp,
  PieChart
} from 'lucide-react';

const DashboardPreview = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 h-full relative overflow-hidden">
      
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
          {/* Welcome section inspired by the reference image */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-4"
          >
            <h4 className="text-lg font-semibold">Welcome back, Daniel!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your business today</p>
          </motion.div>
          
          {/* Action buttons inspired by the reference image */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4"
          >
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4"
          >
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
          
          {/* NEW: Final Validation Score with Ad Campaigns Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-black text-white rounded-lg overflow-hidden border border-gray-800"
          >
            <div className="bg-gradient-to-r from-green-900/20 to-black p-3">
              <h5 className="font-bold text-sm flex items-center gap-2 text-green-400">
                <BarChart3 className="h-4 w-4" />
                Final Validation Score
              </h5>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Score Overview */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Overall Business Validation</p>
                  <div className="text-2xl font-bold text-green-400">78<span className="text-sm text-gray-400">/100</span></div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-2 flex gap-2">
                  <div className="bg-green-900/30 p-1.5 rounded">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Last Week</p>
                    <p className="text-sm font-semibold">+12%</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Campaigns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Facebook Campaign */}
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-900/40 p-1 rounded">
                        <Facebook className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      <p className="text-xs font-medium">Facebook Campaign</p>
                    </div>
                    <span className="text-xs bg-blue-900/30 text-blue-400 rounded px-1.5 py-0.5">Active</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-xs text-gray-400">Reach</p>
                      <p className="text-sm font-semibold">12,450</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Clicks</p>
                      <p className="text-sm font-semibold">1,248</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Conversion</p>
                      <p className="text-sm font-semibold">3.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Cost/Click</p>
                      <p className="text-sm font-semibold">$0.67</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">Engagement Rate</p>
                      <p className="text-xs font-medium text-blue-400">4.8%</p>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Instagram Campaign */}
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-900/30 p-1 rounded">
                        <Instagram className="h-3.5 w-3.5 text-pink-400" />
                      </div>
                      <p className="text-xs font-medium">Instagram Campaign</p>
                    </div>
                    <span className="text-xs bg-pink-900/30 text-pink-400 rounded px-1.5 py-0.5">Active</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-xs text-gray-400">Reach</p>
                      <p className="text-sm font-semibold">8,932</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Clicks</p>
                      <p className="text-sm font-semibold">945</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Conversion</p>
                      <p className="text-sm font-semibold">4.1%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Cost/Click</p>
                      <p className="text-sm font-semibold">$0.82</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">Engagement Rate</p>
                      <p className="text-xs font-medium text-pink-400">6.2%</p>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                      <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Audience Demographics */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-900/30 p-1 rounded">
                      <PieChart className="h-3.5 w-3.5 text-green-400" />
                    </div>
                    <p className="text-xs font-medium">Audience Demographics</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-gray-400">Age 25-34</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p className="text-gray-400">Age 35-44</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <p className="text-gray-400">Age 18-24</p>
                    </div>
                  </div>
                  
                  <div className="relative h-20 w-20">
                    {/* Simple placeholder for pie chart */}
                    <div className="absolute inset-0 rounded-full bg-gray-800 overflow-hidden">
                      <div className="absolute w-full h-full bg-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                      <div className="absolute w-full h-full bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}></div>
                      <div className="absolute w-full h-full bg-purple-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 50%)' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-gray-900 border border-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-800 bg-gray-900">
              <button className="w-full px-3 py-1.5 rounded bg-gradient-to-r from-green-600 to-green-500 text-xs font-medium hover:from-green-700 hover:to-green-600 transition-all">
                View Full Analytics
              </button>
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
