
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';

const WaitingListHeader = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-sm text-gray-600 hover:text-emerald-600">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm text-gray-600 hover:text-emerald-600">
              How it works
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
};

export default WaitingListHeader;
