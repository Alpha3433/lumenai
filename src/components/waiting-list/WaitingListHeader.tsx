
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';

const WaitingListHeader = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-8">
          <Button variant="ghost" asChild>
            <Link to="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it works
            </Link>
          </Button>
          <Button className="bg-black hover:bg-gray-800 text-white">
            Join Waitlist
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default WaitingListHeader;
