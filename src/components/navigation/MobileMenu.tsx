
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/AuthProvider';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <motion.button 
        className="md:hidden text-gray-700 dark:text-gray-300 p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

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
    </>
  );
};

export default MobileMenu;
