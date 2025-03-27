
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const DesktopNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex items-center space-x-10">
      <Link 
        to="/" 
        className={`text-sm font-medium hover:text-blue-600 transition-colors relative ${isActive('/') ? 'text-blue-600' : ''}`}
      >
        Home
        {isActive('/') && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded" />}
      </Link>
      <a 
        href="#features" 
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        Features
      </a>
      <Link 
        to="/examples" 
        className={`text-sm font-medium hover:text-blue-600 transition-colors relative ${isActive('/examples') ? 'text-blue-600' : ''}`}
      >
        Examples
        {isActive('/examples') && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded" />}
      </Link>
      <a 
        href="#pricing" 
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        Pricing
      </a>
      <a 
        href="#faq" 
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        FAQ
      </a>
    </div>
  );
};

export default DesktopNav;
