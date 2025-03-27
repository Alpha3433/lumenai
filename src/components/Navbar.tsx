
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, Sparkles, Crown, User, CircleDot } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-xl md:text-2xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Foster AI</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
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

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                  <CircleDot className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Free Plan</span>
                </div>
                <div className="relative">
                  <button 
                    onClick={handleSignOut}
                    className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {user.email?.substring(0, 2).toUpperCase() || 'JD'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    Sign In
                  </Button>
                </Link>
                <Link to="/create">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-gray-700 dark:text-gray-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md overflow-hidden"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 px-4 py-6">
            {user && (
              <div className="flex items-center gap-3 p-2 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300">
                  {user.email?.substring(0, 2).toUpperCase() || 'JD'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                    <Badge variant="outline" className="px-2 py-0 text-[10px] bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      Free Plan
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <Link 
              to="/" 
              className={`text-sm font-medium p-2 rounded-md transition-colors ${isActive('/') ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#features" 
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <Link 
              to="/examples" 
              className={`text-sm font-medium p-2 rounded-md transition-colors ${isActive('/examples') ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <a 
              href="#pricing" 
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="border-gray-300 dark:border-gray-700 w-full rounded-md">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-md">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 w-full rounded-md" onClick={handleSignOut}>
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
