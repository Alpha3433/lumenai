
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';
import { useAuth } from '@/hooks/useAuth';
import { useUserSubscription } from '@/hooks/useUserSubscription';

const GenerateIdea: React.FC = () => {
  const { user } = useAuth();
  // Always treat as premium for testing
  const isPremium = true;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-24">
        <div className="mb-6 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Business Idea Generator</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get inspired with innovative business ideas tailored to your interests and industry preferences.
          </p>
        </div>
        
        <BusinessIdeaGenerator isPremium={isPremium} />
        
        <div className="mt-12 text-center">
          <Link to="/create">
            <Button variant="outline">
              Have your own idea? Create a business plan
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateIdea;
