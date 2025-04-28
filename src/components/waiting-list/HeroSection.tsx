
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative py-24 overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Validate Your{' '}
              <span className="inline-block">
                Startup Idea
                <div className="h-[6px] bg-emerald-500/30 -mt-2 rounded-full"></div>
              </span>
            </h1>
            
            <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-600">
              Before You Build It
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Get data-driven insights and market validation before investing time and resources in your startup idea.
            </p>
            
            <div className="mt-10 max-w-md">
              <EmailForm />
            </div>
          </motion.div>

          {/* Right Column - Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative">
              {/* Background Blur Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl blur opacity-20"></div>
              
              {/* Dashboard Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
                <img 
                  src="public/lovable-uploads/7757e8bc-1c7c-4b6e-b345-1c5b912e5019.png"
                  alt="Platform dashboard" 
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
