
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
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
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              Coming Soon
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Validate Your{' '}
              <span className="relative inline-block">
                Startup Idea
                <div className="h-[6px] bg-gradient-to-r from-blue-400 to-purple-400 -mt-2 rounded-full absolute bottom-0 left-0 right-0"></div>
              </span>
            </h1>
            
            <h2 className="mt-4 text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Before You Invest Time & Money
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Get data-driven insights and market validation before investing time and resources in your startup idea. Join our waitlist to be among the first to access our platform.
            </p>
            
            <div className="mt-10 max-w-md">
              <EmailForm />
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">250+</span> entrepreneurs on the waitlist
              </p>
            </div>
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
                className="p-8 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 text-center">Business Validation Score</h3>
                
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
                        className="text-gray-100"
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
                        className="text-4xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                      >
                        85
                      </motion.span>
                      <motion.span 
                        className="text-sm text-gray-500"
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
                    <h4 className="text-sm font-semibold mb-3 text-emerald-600 uppercase">Key Strengths</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 bg-emerald-50 p-2 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Recurring Revenue</p>
                          <p className="text-xs text-gray-600">Performing well compared to industry standards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-emerald-50 p-2 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Growing Market</p>
                          <p className="text-xs text-gray-600">Performing well compared to industry standards</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-amber-600 uppercase">Areas for Improvement</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">High Competition</p>
                          <p className="text-xs text-gray-600">Room for improvement in this area</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-amber-50 p-2 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Market Saturation</p>
                          <p className="text-xs text-gray-600">Room for improvement in this area</p>
                        </div>
                      </div>
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
