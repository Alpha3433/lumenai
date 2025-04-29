
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

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

          {/* Right Column - Abstract Design Element */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto z-10 hidden lg:block"
          >
            <div className="relative">
              {/* Abstract Geometric Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-40 h-40 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 rotate-12"></div>
                <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
                <div className="absolute top-40 left-0 w-20 h-20 rounded-lg bg-blue-400 opacity-20 -rotate-12"></div>
                <div className="absolute bottom-10 right-20 w-24 h-24 rounded-xl bg-purple-400 opacity-20 rotate-45"></div>
              </div>
              
              {/* Main Content Frame */}
              <div className="relative h-[400px] w-full max-w-[500px] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 shadow-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" />
                      <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Launch Faster
                  </h3>
                  <p className="text-gray-600">
                    Skip the uncertainty and validate your startup idea with confidence using our data-driven platform
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
