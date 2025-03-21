
import React from 'react';
import Navbar from '@/components/Navbar';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';

const Create = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <PlanCreator />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
