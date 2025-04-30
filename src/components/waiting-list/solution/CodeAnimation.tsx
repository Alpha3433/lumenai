
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';

interface CodeLine {
  code: string;
  delay: number;
  isComment?: boolean;
  isOutput?: boolean;
}

interface CodeAnimationProps {
  codeLines: CodeLine[];
}

const CodeAnimation: React.FC<CodeAnimationProps> = ({
  codeLines
}) => {
  const [executionProgress, setExecutionProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Simulate code execution progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset the progress when it reaches 100
      if (executionProgress >= 100) {
        setExecutionProgress(0);
        setCurrentLineIndex(0);
      } else {
        setExecutionProgress(prev => {
          const newValue = Math.min(prev + 0.7, 100); // Increased speed
          // Update current line index based on progress
          if (newValue % 8 === 0) {  // Faster line update
            setCurrentLineIndex(prev => Math.min(prev + 1, codeLines.length - 1));
          }
          return newValue;
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [executionProgress, codeLines.length]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0
      }}
      transition={{
        duration: 0.7,
        delay: 0.3
      }}
      viewport={{
        once: true
      }}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10 h-full flex flex-col w-full"
      style={{ maxHeight: "380px" }} // Reduced height to match shorter code
    >
      <div className="p-3 bg-gray-800 flex items-center justify-between"> {/* Reduced padding */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center ml-4 text-gray-400 text-xs font-mono">
            <Code className="h-4 w-4 mr-1.5" /> validation.js
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="animate-pulse text-green-400">• Running</span>
          <span>{Math.floor(executionProgress)}% complete</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
          style={{ width: `${executionProgress}%` }} 
        />
      </div>
      
      <div className="p-4 font-mono text-sm flex-grow relative overflow-hidden"> {/* Reduced padding */}
        <div className="space-y-1"> {/* Reduced spacing */}
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -10
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: line.delay / 8,
                duration: 0.5
              }}
              viewport={{
                once: true
              }}
              className={`${line.isOutput ? 'pl-4 border-l-2 border-green-500/30 text-green-400 text-opacity-80' : 'text-gray-100'} ${index > currentLineIndex + 6 ? 'opacity-30' : ''}`}
            >
              {/* If it's an output line, add a typing animation effect */}
              {line.isOutput ? (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: line.delay / 8,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden whitespace-nowrap"
                  dangerouslySetInnerHTML={{ __html: line.code }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: line.code }} />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Visual effects */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          viewport={{ once: true }}
        />
        
        {/* Terminal cursor blink effect */}
        <motion.div
          className="absolute bottom-6 left-6 h-4 w-2 bg-blue-500"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        
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
        />
      </div>
      
      {/* Decorative elements */}
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
        />
      </div>
    </motion.div>
  );
};

export default CodeAnimation;
