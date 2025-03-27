
import React from 'react';
import { motion } from 'framer-motion';
import NavLinks from './NavLinks';

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-10">
      <NavLinks />
    </div>
  );
};

export default DesktopNav;
