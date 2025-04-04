
import React, { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [offsetY, setOffsetY] = useState(0);
  
  const handleScroll = () => setOffsetY(window.pageYOffset);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Layer 1 - Slowest moving (deep background) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950"
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
      />
      
      {/* Layer 2 - Middle speed */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-blue-200/30 dark:bg-blue-800/20 blur-3xl"
            style={{
              width: `${Math.random() * 40 + 10}rem`,
              height: `${Math.random() * 40 + 10}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%) translateY(${offsetY * 0.2}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Layer 3 - Fastest moving (foreground elements) */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-purple-200/20 dark:bg-purple-800/10 blur-2xl"
            style={{
              width: `${Math.random() * 20 + 5}rem`,
              height: `${Math.random() * 20 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%) translateY(${offsetY * 0.3}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Overlay gradient to soften everything */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-gray-950/80" />
    </div>
  );
};

export default ParallaxBackground;
