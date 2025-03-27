
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const GenerateIdea = () => {
  const navigate = useNavigate();
  
  // Function to navigate to the plan creation page
  const handleContinueToPlanCreation = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-2">Generate Business Ideas</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Generate innovative business ideas based on your interests or current market trends.
            </p>
          </div>
          
          <BusinessIdeaGenerator />
          
          <div className="mt-8 text-center">
            <Button 
              onClick={handleContinueToPlanCreation}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Continue to Plan Creation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateIdea;
