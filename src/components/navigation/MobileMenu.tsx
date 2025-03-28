
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';
import { toast } from 'sonner';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, signOut } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsMenuOpen(false);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <>
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden">
          <div className="px-4 py-6 h-full flex flex-col">
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <NavLinks isMobile onMobileClick={() => setIsMenuOpen(false)} />
              
              {user ? (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Button>
              ) : (
                <div className="flex flex-col w-full gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 dark:border-gray-700"
                    onClick={openLoginModal}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={openRegisterModal}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default MobileMenu;
