
import React from 'react';
import Navbar from '@/components/Navbar';
import PlanCreator from '@/components/PlanCreator';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import { usePlanCreator } from '@/hooks/usePlanCreator';

const Create = () => {
  const location = useLocation();
  const businessIdeaData = location.state || null;
  const { step } = usePlanCreator(businessIdeaData);

  return (
    <div className="min-h-screen bg-background">
      {step === 1 && <Navbar />}
      <div className={step === 1 ? "pt-20" : ""}>
        <div className={`${step === 2 ? "w-full" : "container max-w-5xl"} mx-auto px-4 py-8`}>
          {step === 1 && (
            <div className="mb-8 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-100 dark:border-amber-800 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4">
                  <img src="/lovable-uploads/b7d15e1c-3772-4da7-9d7f-5ad9b562db15.png" alt="Limited plan" width="180" height="36" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upgrade to get the full business plan.
                </p>
              </div>
              <button 
                className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800"
                onClick={() => {/* Handle upgrade */}}
              >
                Upgrade
              </button>
            </div>
          )}
          <PlanCreator initialData={businessIdeaData} />
        </div>
      </div>
      {step === 1 && <Footer />}
    </div>
  );
};

export default Create;
