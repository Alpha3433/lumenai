
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import { testOpenAI } from '@/utils/openaiService';
import { toast } from '@/components/ui/use-toast';

const GenerateIdea = () => {
  const navigate = useNavigate();
  const [testing, setTesting] = useState(false);
  
  // Function to navigate back to the plan creation page
  const handleBackToPlanCreation = () => {
    navigate('/create');
  };

  // Function to test the OpenAI connection
  const handleTestOpenAI = async () => {
    setTesting(true);
    try {
      const response = await testOpenAI();
      if (response.success) {
        toast({
          title: "OpenAI Test Successful",
          description: response.text,
        });
      } else {
        toast({
          title: "OpenAI Test Failed",
          description: response.error || "Could not connect to OpenAI.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error testing OpenAI:", error);
      toast({
        title: "Test Error",
        description: "An unexpected error occurred while testing OpenAI connection.",
        variant: "destructive"
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <Button 
              variant="outline"
              onClick={handleBackToPlanCreation}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Plan Creation
            </Button>
            
            <Button
              variant="outline"
              onClick={handleTestOpenAI}
              disabled={testing}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {testing ? "Testing..." : "Test OpenAI"}
            </Button>
          </div>
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-2">Generate Business Ideas</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Generate innovative business ideas based on your interests or current market trends.
            </p>
          </div>
          
          <BusinessIdeaGenerator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateIdea;
