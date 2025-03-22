
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold">
              <span className="flex items-center gap-1">
                <TrendingUpIcon className="h-5 w-5" />
                VisionaryData
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <Link to="/examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </Link>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 rounded-md">
              Free Plan
            </Button>
            <Button className="bg-black hover:bg-black/90 text-white rounded-md">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className="text-sm font-medium hover:text-primary transition-colors p-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#features" 
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <Link 
                to="/examples" 
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <a 
                href="#" 
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 w-full rounded-md">
                  Free Plan
                </Button>
                <Button className="bg-black hover:bg-black/90 text-white w-full rounded-md">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Define the TrendingUpIcon component inline
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

export default Navbar;
