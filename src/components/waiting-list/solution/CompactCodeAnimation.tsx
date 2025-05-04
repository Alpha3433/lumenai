
import React from 'react';
import { motion } from 'framer-motion';
import CodeAnimation from './CodeAnimation';

interface CodeLine {
  code: string;
  delay: number;
  isOutput?: boolean;
  isComment?: boolean;
}

interface CompactCodeAnimationProps {
  codeLines: CodeLine[];
}

const CompactCodeAnimation: React.FC<CompactCodeAnimationProps> = ({ codeLines }) => {
  return (
    <div className="relative w-full p-6 md:p-8 overflow-hidden rounded-xl shadow-xl bg-[#1E1E1E] dark:bg-[#1A1A1A] border border-gray-800">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-1.5"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="ml-2 text-xs text-gray-400"
        >
          business-validation.js
        </motion.div>
      </div>

      {/* Code content */}
      <div className="h-[350px] md:h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pr-2">
        <div className="font-mono text-sm text-gray-300 leading-relaxed">
          <CodeAnimation codeLines={codeLines} />
        </div>
      </div>

      {/* Lighting effects */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default CompactCodeAnimation;
