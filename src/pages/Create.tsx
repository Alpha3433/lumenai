
import React from 'react';
import Navbar from '@/components/Navbar';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const Create = () => {
  const location = useLocation();
  const businessIdeaData = location.state || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <PlanCreator initialData={businessIdeaData} />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
