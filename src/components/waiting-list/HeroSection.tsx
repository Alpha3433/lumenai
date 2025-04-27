
import React from 'react';
import EmailForm from './EmailForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Validate Your Startup Idea Fast
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg">
            Use AI-powered validation to test your idea before building. Save time and resources.
          </p>
          
          <div className="max-w-md">
            <EmailForm />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Platform dashboard" 
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
