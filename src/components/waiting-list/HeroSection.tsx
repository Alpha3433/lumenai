
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Validate Your<br />Startup Idea
            <span className="text-emerald-600 block mt-1">Before You Build It</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Get data-driven insights and market validation before investing time and resources in your startup idea.
          </p>
          
          <div className="max-w-md">
            <EmailForm />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <img 
            src="public/lovable-uploads/7757e8bc-1c7c-4b6e-b345-1c5b912e5019.png"
            alt="Platform dashboard" 
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
