
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/navigation/BrandLogo';

const WaitingListHeader = () => {
  return (
    <header className="w-full pt-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <Link to="/home">
          <Button variant="ghost" className="text-sm">
            Skip to Website <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default WaitingListHeader;
