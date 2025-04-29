
import React from 'react';
import { motion } from 'framer-motion';
import EmailForm from './EmailForm';
import { ArrowRight } from 'lucide-react';

const FooterCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-64 bg-white opacity-10" 
             style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 40%)" }}></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-white opacity-10" 
             style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be the first to know when we launch
          </h2>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Join the waitlist to get early access and special pricing for our AI-powered startup validation platform.
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
          
          <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>No credit card required</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>Cancel anytime</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>Early access pricing</span>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <a href="#how-it-works" className="flex items-center gap-2 text-sm font-medium border-b border-white/30 pb-1 hover:border-white transition-all">
              Learn more about our platform
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
