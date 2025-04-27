
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';

const WaitingListHeader = () => {
  return (
    <header className="w-full py-4 px-4 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" asChild>
            <Link to="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it works
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Join Waitlist
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default WaitingListHeader;
