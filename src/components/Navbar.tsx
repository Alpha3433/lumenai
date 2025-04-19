
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './navigation/BrandLogo';
import DesktopNav from './navigation/DesktopNav';
import UserAuthSection from './navigation/UserAuthSection';
import MobileMenu from './navigation/MobileMenu';
import ThemeToggle from './ui/theme-toggle';
import CartIcon from './navigation/CartIcon';
import { useAuth } from '@/components/AuthProvider';
import LogoGeneratorModal from './logo/LogoGeneratorModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <BrandLogo />
          </div>
          <DesktopNav />
          <div className="flex items-center gap-3">
            <div className="mr-1">
              <ThemeToggle />
            </div>
            <CartIcon />
            <UserAuthSection />
          </div>
          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
      <LogoGeneratorModal 
        open={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </motion.nav>
  );
};

export default Navbar;
