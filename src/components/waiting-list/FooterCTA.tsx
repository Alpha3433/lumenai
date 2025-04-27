
import React from 'react';
import { motion } from 'framer-motion';
import EmailForm from './EmailForm';

const FooterCTA = () => {
  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to validate your startup idea?
          </h2>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
            Join the waitlist to get early access to our AI-powered startup validation platform.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <EmailForm />
          
          <div className="flex items-center justify-center mt-8 text-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>No credit card required</span>
            
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 ml-6 mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
