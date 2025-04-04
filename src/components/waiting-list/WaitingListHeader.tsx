
import React from 'react';
import BrandLogo from '@/components/navigation/BrandLogo';

const WaitingListHeader = () => {
  return (
    <header className="w-full pt-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <BrandLogo />
      </div>
    </header>
  );
};

export default WaitingListHeader;
