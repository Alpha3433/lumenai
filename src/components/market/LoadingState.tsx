
import React from 'react';
import Navbar from '@/components/Navbar';

const LoadingState: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-pulse text-lg">Loading market trends...</div>
      </div>
    </div>
  );
};

export default LoadingState;
