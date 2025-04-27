
import React from 'react';
import EmailForm from './EmailForm';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Validate Your <br/>
            <span className="text-green-600 dark:text-green-500">Startup Idea</span> —<br/>
            Before You Build It
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            Don't waste time and money building something nobody wants. Use AI-powered validation to test your idea before writing a single line of code.
          </p>
          
          <div className="flex flex-col gap-4">
            <EmailForm />
            
            <div className="flex flex-wrap gap-4 mt-2">
              {["7-day free trial", "No credit card required", "Cancel anytime"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
            <img 
              src="/public/lovable-uploads/0c0574b5-8cc0-41a2-8b87-ad8df6b502ca.png" 
              alt="AI-powered startup validation" 
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
