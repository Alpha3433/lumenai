
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
              
              {!user && (
                <div className="flex flex-col w-full gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 dark:border-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default MobileMenu;
