
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Validate Your Startup Idea
            <span className="text-emerald-600 block">Before You Build It</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            Get data-driven insights and market validation before investing time and resources in your startup idea.
          </p>
          
          <div className="max-w-md mx-auto">
            <EmailForm />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <img 
            src="public/lovable-uploads/acbb9618-df32-466e-b8e1-f8a2132e2171.png"
            alt="Platform dashboard" 
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
