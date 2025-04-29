
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
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
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800">
              Coming Soon
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Validate Your{' '}
              <span className="relative inline-block">
                Startup Idea
                <div className="h-[6px] bg-emerald-400 -mt-2 rounded-full absolute bottom-0 left-0 right-0"></div>
              </span>
            </h1>
            
            <h2 className="mt-4 text-xl md:text-2xl font-medium text-emerald-600">
              Before You Invest Time & Money
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Get data-driven insights and market validation before investing time and resources in your startup idea. Join our waitlist to be among the first to access our platform.
            </p>
            
            <div className="mt-10 max-w-md">
              <EmailForm />
            </div>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">250+</span> entrepreneurs on the waitlist
              </p>
            </div>
          </motion.div>

          {/* Right Column - Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto z-10"
          >
            <div className="relative">
              {/* Main Dashboard Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
                <img 
                  src="/public/lovable-uploads/7757e8bc-1c7c-4b6e-b345-1c5b912e5019.png"
                  alt="Platform dashboard" 
                  className="w-full h-auto"
                  loading="eager"
                />
                
                {/* Floating Cards */}
                <div className="absolute -bottom-4 -left-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100 max-w-[200px] transform rotate-[-3deg]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white font-bold">94%</div>
                    <span className="font-semibold text-sm">Market Validation</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[94%] bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-6 bg-white p-3 rounded-lg shadow-lg border border-gray-100 transform rotate-[3deg]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs font-semibold text-gray-700">Niche identified</span>
                  </div>
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
