
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { BusinessIdeaSuggestion, generateBusinessIdea } from '@/utils/businessIdeaGenerator';
import IdeaGeneratorForm from './IdeaGeneratorForm';
import GeneratedIdeaDisplay from './GeneratedIdeaDisplay';

const BusinessIdeaGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [interests, setInterests] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentTab, setCurrentTab] = useState("guided");
  const [generatedIdea, setGeneratedIdea] = useState<BusinessIdeaSuggestion | null>(null);
  
  // Handle the generation of a business idea
  const handleGenerateIdea = async () => {
    setGenerating(true);
    
    try {
      // Get preferences based on the current tab
      const preferences = currentTab === "guided" 
        ? { industry, interests } 
        : { interests: "surprise me" };
      
      // Validate inputs for guided approach
      if (currentTab === "guided" && !industry) {
        toast({
          title: "Missing Information",
          description: "Please select an industry to generate ideas.",
          variant: "destructive"
        });
        setGenerating(false);
        return;
      }
      
      const idea = await generateBusinessIdea(preferences);
      setGeneratedIdea(idea);
      
      toast({
        title: "Idea Generated!",
        description: "We've created a unique business idea based on your preferences."
      });
    } catch (error) {
      console.error("Error generating business idea:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your business idea. Please try again.",
        variant: "destructive"
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
