
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Clock, CheckCircle, Zap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AutomationSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12 }
    }
  };

  const automationData = [
    { task: "Market research", manual: "1-2 weeks", automated: "2 minutes", icon: <Database className="h-5 w-5" /> },
    { task: "Competitor analysis", manual: "3-5 days", automated: "1 minute", icon: <Zap className="h-5 w-5" /> },
    { task: "Customer persona", manual: "1 week", automated: "3 minutes", icon: <CheckCircle className="h-5 w-5" /> },
    { task: "Launch planning", manual: "2 weeks", automated: "5 minutes", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-6 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">EFFICIENCY</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Save Time</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Our platform automates the tedious parts of validation so you can focus on building your business
          </p>
        </motion.div>

        {/* Modern Dashboard Inspired Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Stats and Data */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 overflow-hidden relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Task Automation</h3>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Time saved</span>
            </div>
            
            <div className="space-y-4">
              {automationData.map((item, index) => (
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
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Average time saved</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">98% reduction in time spent on validation</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
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
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationSection;
