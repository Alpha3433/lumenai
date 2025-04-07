
import React from 'react';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Create = () => {
  const location = useLocation();
  const businessIdeaData = location.state || null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <div className="container max-w-full mx-auto px-4 py-8">
          {!businessIdeaData && (
            <div className="mb-8 bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center justify-between max-w-5xl mx-auto">
              <div>
                <h3 className="font-medium flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                  Need a business idea?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate innovative business ideas based on your interests or current trends
                </p>
              </div>
              <Link to="/generate-idea">
                <Button variant="outline" size="sm">Generate Ideas</Button>
              </Link>
            </div>
          )}
          <PlanCreator initialData={businessIdeaData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
