
import React from 'react';
import { motion } from 'framer-motion';
import EmailForm from './EmailForm';

const FooterCTA = () => {
  return (
    <section className="py-24 bg-emerald-600 text-white">
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
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
