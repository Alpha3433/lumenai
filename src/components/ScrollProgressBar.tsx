
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  
  // Show the progress bar on the create and generate-idea pages
  const shouldShowProgressBar = location.pathname === '/create' || location.pathname === '/generate-idea';
  
  useEffect(() => {
    if (!shouldShowProgressBar) return;
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldShowProgressBar]);

  if (!shouldShowProgressBar) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div 
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
