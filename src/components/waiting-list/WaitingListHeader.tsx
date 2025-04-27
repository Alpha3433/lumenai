
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';

const WaitingListHeader = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#how-it-works" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              How it works
            </Link>
            <Link to="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </Link>
            <Link to="#pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </Link>
            <Link to="#faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              FAQ
            </Link>
          </nav>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default WaitingListHeader;
