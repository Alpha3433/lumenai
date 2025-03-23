
import React from 'react';
import Navbar from '@/components/Navbar';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';

const Create = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">RaveBae</h1>
        <PlanCreator />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
