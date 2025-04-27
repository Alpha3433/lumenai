
import React from 'react';
import EmailForm from './EmailForm';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Validate Your <br/>
            Startup Idea <br/>
            <span className="text-emerald-600">Before You Build It</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg">
            Don't waste time and money building something nobody wants. Use AI-powered validation to test your idea first.
          </p>
          
          <div className="flex flex-col gap-4">
            <EmailForm />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src="/public/lovable-uploads/498ea166-7fe6-4946-b4da-ac714fee8648.png"
            alt="Platform dashboard" 
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
