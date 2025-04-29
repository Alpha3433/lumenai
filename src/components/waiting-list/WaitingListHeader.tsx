
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const WaitingListHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" asChild>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it works
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </a>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Join Waitlist
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 md:hidden flex flex-col gap-3">
            <a href="#how-it-works" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              How it works
            </a>
            <a href="#features" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Features
            </a>
            <a href="#faq" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              FAQ
            </a>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Join Waitlist
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default WaitingListHeader;
