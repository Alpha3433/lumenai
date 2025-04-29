
import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';

interface CodeLine {
  code: string;
  delay: number;
}

interface CodeAnimationProps {
  codeLines: CodeLine[];
}

const CodeAnimation: React.FC<CodeAnimationProps> = ({ codeLines }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10"
    >
      <div className="p-4 bg-gray-800 flex gap-2 items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center ml-4 text-gray-400 text-xs font-mono">
          <Code className="h-4 w-4 mr-1.5" /> validation.js
        </div>
      </div>
      <div className="p-8 font-mono text-sm relative overflow-hidden">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay / 8, duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-3 text-gray-100"
            dangerouslySetInnerHTML={{ __html: line.code }}
          />
        ))}
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>
        
        <motion.div
          className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-blue-500/20 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut" 
          }}
        ></motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-5 py-3 shadow-xl flex items-center gap-2 text-white"
      >
        <span className="text-sm font-semibold">AI-Validated Results</span>
        <ArrowRight className="h-4 w-4" />
      </motion.div>
    </motion.div>
  );
};

export default CodeAnimation;
