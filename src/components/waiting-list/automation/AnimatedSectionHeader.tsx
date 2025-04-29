
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionHeaderProps {
  title: string;
  highlightedText: string;
  subtitle: string;
  badge?: string;
}

const AnimatedSectionHeader = ({ 
  title, 
  highlightedText, 
  subtitle, 
  badge = "EFFICIENCY" 
}: AnimatedSectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-block mb-4 px-6 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full"
      >
        <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">{badge}</h3>
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-5"
      >
        {title}{" "}
        <motion.span 
          initial={{ backgroundSize: "0 100%" }}
          whileInView={{ backgroundSize: "100% 100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          {highlightedText}
        </motion.span>
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedSectionHeader;
