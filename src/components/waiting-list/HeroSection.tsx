
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl"></div>
        </div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800"
            >
              <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ✨ Coming Soon
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block"
              >
                Validate Your
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative inline-block"
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Startup Idea
                </span>
                <motion.div 
                  className="h-[8px] bg-gradient-to-r from-blue-400 to-purple-400 -mt-2 rounded-full absolute bottom-1 left-0 right-0 z-0"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                ></motion.div>
              </motion.div>
            </h1>
            
            <motion.h2 
              className="mt-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Before You Invest Time & Money
            </motion.h2>
            
            <motion.p 
              className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <span className="font-semibold">Don't gamble with your future.</span> Our AI platform delivers 
              <span className="mx-1 py-1 px-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-md font-medium">data-driven insights</span> 
              and <span className="mx-1 py-1 px-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-md font-medium">market validation</span> so you can 
              launch with confidence. Join our waitlist for early access to tools that prevent costly startup mistakes.
            </motion.p>
            
            <motion.div 
              className="mt-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <EmailForm />
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-r ${
                        i === 1 ? 'from-blue-400 to-blue-500' :
                        i === 2 ? 'from-purple-400 to-purple-500' :
                        'from-indigo-400 to-indigo-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white">250+</span> entrepreneurs already on the waitlist
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Business Validation Score Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 hidden lg:block"
          >
            <div className="relative">
              <motion.div 
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">Business Validation Score</h3>
                
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="relative w-40 h-40"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  >
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-gray-100 dark:text-gray-700"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeDasharray={440}
                        strokeDashoffset={440}
                        strokeLinecap="round"
                        className="text-blue-500"
                        animate={{ strokeDashoffset: 440 - (440 * 85) / 100 }}
                        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        className="text-4xl font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                      >
                        85
                      </motion.span>
                      <motion.span 
                        className="text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.4 }}
                      >
                        out of 100
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-emerald-600 dark:text-emerald-400 uppercase">Key Strengths</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border-l-4 border-emerald-400 dark:border-emerald-500">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Recurring Revenue Potential</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Subscription model provides stable cash flow</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border-l-4 border-emerald-400 dark:border-emerald-500">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Growing Market Demand</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">22% YoY growth in target segment</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-amber-600 dark:text-amber-400 uppercase">Areas for Improvement</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-l-4 border-amber-400 dark:border-amber-500">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">High Competitive Landscape</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">5 established competitors in market</p>
                        </div>
                      </div>
                      <motion.div 
                        className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-l-4 border-amber-400 dark:border-amber-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 2.0 }}
                      >
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Customer Acquisition Cost</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Higher than industry average</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
