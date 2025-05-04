
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CodeLine {
  code: string;
  delay: number;
  isOutput?: boolean;
  isComment?: boolean;
}

interface CodeAnimationProps {
  codeLines: CodeLine[];
}

const CodeAnimation: React.FC<CodeAnimationProps> = ({ codeLines }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    // Reset visible lines when component mounts or codeLines change
    setVisibleLines([]);

    const observers: IntersectionObserver[] = [];
    
    codeLines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, 200 + (codeLines[index].delay * 800)); // Reduced delay for faster animation
      
      return () => clearTimeout(timer);
    });

    return () => {
      // Clean up all timeouts when component unmounts
      observers.forEach(observer => observer.disconnect());
    };
  }, [codeLines]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono"
    >
      {codeLines.map((line, index) => {
        const isVisible = visibleLines.includes(index);
        
        // Determine styling based on line type
        let textClassNames = ""; 
        if (line.isComment) {
          textClassNames = "opacity-70"; // Comments are slightly faded
        } else if (line.isOutput) {
          textClassNames = "text-gray-400"; // Output is gray
        }
        
        return (
          <div key={index} className="relative">
            {/* Line number - reduced spacing for compactness */}
            <span className="inline-block w-5 text-right mr-2 text-gray-500 select-none text-xs">
              {index + 1}
            </span>
            
            {/* Actual code */}
            <span className={`${textClassNames} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              {isVisible ? (
                line.isOutput ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    dangerouslySetInnerHTML={{ __html: line.code }}
                    className="typing-effect"
                  />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: line.code }} />
                )
              ) : (
                " "
              )}
            </span>
            
            {/* Cursor animation for typing effect */}
            {isVisible && line.isOutput && (
              <motion.span 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ repeat: 7, duration: 0.5, repeatType: "reverse" }}
                className="animate-pulse ml-0.5 inline-block w-1.5 h-3 bg-gray-400 align-middle"
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default CodeAnimation;
