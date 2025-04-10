
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/navigation/BrandLogo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const WaitingListHeader = () => {
  return (
    <header className="w-full pt-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
        <Link to="/home">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Landing Page
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default WaitingListHeader;
