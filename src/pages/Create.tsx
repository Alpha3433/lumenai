
import React from 'react';
import Navbar from '@/components/Navbar';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';

const Create = () => {
  const location = useLocation();
  const businessIdeaData = location.state || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <BusinessIdeaGenerator />
        </div>
        <PlanCreator initialData={businessIdeaData} />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
