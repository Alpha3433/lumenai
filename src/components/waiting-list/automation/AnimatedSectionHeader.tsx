
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
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="inline-block mb-4 px-6 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full">
        <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">{badge}</h3>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-5">
        {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{highlightedText}</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default AnimatedSectionHeader;
