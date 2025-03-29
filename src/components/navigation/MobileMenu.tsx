
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X, Menu, Settings, FileText, ChartBar, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import NavLinks from './NavLinks';
import UserProfileSection from './UserProfileSection';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          {user && <UserProfileSection onClose={closeMenu} />}
          
          <div className="flex flex-col space-y-1">
            <NavLinks isMobile={true} onMobileClick={closeMenu} />
          </div>
          
          {user && (
            <div className="flex flex-col space-y-1 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link to="/dashboard" onClick={closeMenu} className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <ChartBar className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/reports" onClick={closeMenu} className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <FileText className="mr-2 h-4 w-4" />
                <span>Reports</span>
              </Link>
              <Link to="/settings" onClick={closeMenu} className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          )}
          
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            {!user ? (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700 w-full rounded-md">
                    Sign In
                  </Button>
                </Link>
                <Link to="/create" onClick={closeMenu}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-md">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="border-gray-300 dark:border-gray-700 w-full rounded-md text-red-500 dark:text-red-400" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
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
