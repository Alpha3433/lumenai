
import React from 'react';
import { motion } from 'framer-motion';
import EmailForm from './EmailForm';
import { CheckCircle } from 'lucide-react';

const FooterCTA = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Waitlist
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be the first to access our AI-powered startup validation platform when we launch
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
          
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Early access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Exclusive discount</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">No credit card required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
