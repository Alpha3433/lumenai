
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Sparkles, ArrowRight, LightbulbIcon, BrainCircuit, Zap } from "lucide-react";
import { generateBusinessIdea, BusinessIdeaSuggestion } from '@/utils/businessIdeaGenerator';

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
        description: "We've created a business idea based on your preferences."
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
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-lg mb-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardTitle className="flex items-center gap-2 text-xl">
          <LightbulbIcon className="h-5 w-5 text-amber-500" />
          Need a Business Idea?
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {!generatedIdea ? (
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Not sure what business to start? Let our AI help you discover promising niches based on market trends and your interests.
            </p>
            
            <Tabs defaultValue="guided" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="guided">
                  <BrainCircuit className="h-4 w-4 mr-2" />
                  Guided
                </TabsTrigger>
                <TabsTrigger value="surprise">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Surprise Me
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guided" className="space-y-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="interests">Your Interests (Optional)</Label>
                  <Textarea 
                    id="interests" 
                    placeholder="Tell us about your skills, passions, or areas of expertise..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="surprise" className="text-center py-6">
                <Zap className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                <p className="mb-2">Generate a completely random business idea!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll analyze current market trends and suggest an innovative business concept.
                </p>
              </TabsContent>
            </Tabs>
            
            <Button 
              onClick={handleGenerateIdea} 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={generating}
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Idea...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Business Idea
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-2">{generatedIdea.businessName}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{generatedIdea.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Target Market</h4>
                  <p className="text-gray-700 dark:text-gray-300">{generatedIdea.targetMarket}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Revenue Model</h4>
                  <p className="text-gray-700 dark:text-gray-300">{generatedIdea.revenueModel}</p>
                </div>
              </div>
              
              <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Why This Could Work</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {generatedIdea.whyItWorks.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setGeneratedIdea(null)}
              >
                Generate Another Idea
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={handleUseIdea}
              >
                Use This Idea
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessIdeaGenerator;
