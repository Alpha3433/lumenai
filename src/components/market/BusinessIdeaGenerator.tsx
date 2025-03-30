
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { BusinessIdeaSuggestion, generateBusinessIdea } from '@/utils/businessIdeaGenerator';
import IdeaGeneratorForm from './IdeaGeneratorForm';
import GeneratedIdeaDisplay from './GeneratedIdeaDisplay';

interface BusinessIdeaGeneratorProps {
  isPremium?: boolean;
}

const BusinessIdeaGenerator: React.FC<BusinessIdeaGeneratorProps> = ({ isPremium = false }) => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [interests, setInterests] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentTab, setCurrentTab] = useState("guided");
  const [generatedIdea, setGeneratedIdea] = useState<BusinessIdeaSuggestion | null>(null);
  const [useAIV2, setUseAIV2] = useState(false);
  
  // Handle the generation of a business idea
  const handleGenerateIdea = async () => {
    if (generating) return; // Prevent multiple clicks
    
    setGenerating(true);
    
    try {
      // Check if premium features are available
      if (useAIV2 && !isPremium) {
        toast({
          title: "Premium Feature",
          description: "Enhanced AI engine is only available for premium users",
          variant: "destructive"
        });
        setGenerating(false);
        return;
      }
      
      // Get preferences based on the current tab
      const preferences = currentTab === "guided" 
        ? { industry, interests, usePremiumModel: useAIV2 } 
        : { interests: "surprise me", usePremiumModel: useAIV2 };
      
      // Validate inputs for guided approach only if we're on the guided tab
      if (currentTab === "guided" && !industry) {
        toast({
          title: "Missing Information",
          description: "Please select an industry to generate ideas.",
          variant: "destructive"
        });
        setGenerating(false);
        return;
      }
      
      // Add a timeout to ensure the process doesn't hang
      const timeoutId = setTimeout(() => {
        if (generating) {
          toast({
            title: "Taking longer than expected",
            description: "We'll use a pre-generated idea if this continues",
          });
          
          // After another 5 seconds, fall back to mock data
          setTimeout(() => {
            if (generating) {
              const mockIdea = { 
                businessName: "Timeout Fallback - EcoShare Platform",
                description: "A platform that allows users to rent environmentally friendly products, reducing waste and promoting sustainability.",
                targetMarket: "Environmentally conscious consumers looking to reduce waste",
                revenueModel: "Transaction fees and premium subscriptions",
                whyItWorks: [
                  "Growing environmental awareness",
                  "Sharing economy trend",
                  "Low startup costs",
                  "Scalable business model"
                ]
              };
              setGeneratedIdea(mockIdea);
              setGenerating(false);
              
              toast({
                title: "Generated with fallback data",
                description: "Network issue detected, but we've provided you with a quality idea to explore."
              });
            }
          }, 5000);
        }
      }, 10000);
      
      console.log('Starting business idea generation with preferences:', preferences);
      const idea = await generateBusinessIdea(preferences);
      clearTimeout(timeoutId);
      
      console.log('Idea generation complete:', idea.businessName);
      setGeneratedIdea(idea);
      
      toast({
        title: "Idea Generated!",
        description: "We've created a unique business idea based on your preferences."
      });
    } catch (error) {
      console.error("Error generating business idea:", error);
      
      // Create a fallback idea for a better user experience
      const fallbackIdea = { 
        businessName: "Error Fallback - Digital Learning Hub",
        description: "An interactive platform offering personalized learning experiences through AI-driven content recommendations and progress tracking.",
        targetMarket: "Students, professionals, and lifelong learners",
        revenueModel: "Freemium model with subscription tiers and enterprise licensing",
        whyItWorks: [
          "Growing demand for personalized education",
          "Remote learning trend acceleration post-pandemic",
          "Scalable content delivery model",
          "Multiple revenue streams from various user segments"
        ]
      };
      
      setGeneratedIdea(fallbackIdea);
      
      toast({
        title: "Generated with fallback data",
        description: "We encountered an issue but created a quality business idea for you."
      });
    } finally {
      setGenerating(false);
    }
  };
  
  // Navigate to create page with the generated idea
  const handleUseIdea = () => {
    if (generatedIdea) {
      navigate('/create', { 
        state: { 
          businessName: generatedIdea.businessName,
          businessDescription: generatedIdea.description
        } 
      });
    }
  };
  
  // Regenerate a new idea
  const handleRegenerateIdea = () => {
    setGeneratedIdea(null);
    
    // Add a small delay for better UX before auto-triggering generation
    setTimeout(() => {
      handleGenerateIdea();
    }, 300);
  };
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-lg mb-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardTitle className="flex items-center gap-2 text-xl">
          <LightbulbIcon className="h-5 w-5 text-amber-500" />
          Business Idea Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {!generatedIdea ? (
          <IdeaGeneratorForm
            generating={generating}
            interests={interests}
            setInterests={setInterests}
            industry={industry}
            setIndustry={setIndustry}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onGenerateIdea={handleGenerateIdea}
            isPremium={isPremium}
            useAIV2={useAIV2}
            setUseAIV2={setUseAIV2}
          />
        ) : (
          <GeneratedIdeaDisplay
            generatedIdea={generatedIdea}
            onRegenerateIdea={handleRegenerateIdea}
            onUseIdea={handleUseIdea}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessIdeaGenerator;
