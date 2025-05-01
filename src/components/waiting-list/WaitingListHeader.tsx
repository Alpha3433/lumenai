
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';

const WaitingListHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded">
              <span className="font-semibold">Lumen AI</span>
            </div>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-8">
            <Button variant="ghost" asChild>
              <Link to="/demo" className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                Demo
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#how-it-works" className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                How it Works
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#features" className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                Features
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#who-its-for" className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                Who It's For
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#faq" className="text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                FAQs
              </a>
            </Button>
          </div>
        </nav>

        {/* Theme toggle and Join Waitlist button */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-4 md:hidden flex flex-col gap-3">
            <Link to="/demo" className="px-4 py-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Demo
            </Link>
            <a href="#how-it-works" className="px-4 py-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              How it Works
            </a>
            <a href="#features" className="px-4 py-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Features
            </a>
            <a href="#who-its-for" className="px-4 py-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Who It's For
            </a>
            <a href="#faq" className="px-4 py-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              FAQs
            </a>
            <div className="flex items-center justify-between py-2">
              <ThemeToggle />
              <Button className="w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none">
                Join Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default WaitingListHeader;
