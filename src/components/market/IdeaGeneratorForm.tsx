
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, BrainCircuit, Zap } from "lucide-react";

interface IdeaGeneratorFormProps {
  generating: boolean;
  interests: string;
  setInterests: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onGenerateIdea: () => void;
}

const IdeaGeneratorForm: React.FC<IdeaGeneratorFormProps> = ({
  generating,
  interests,
  setInterests,
  industry,
  setIndustry,
  currentTab,
  setCurrentTab,
  onGenerateIdea
}) => {
  return (
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
        onClick={onGenerateIdea} 
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
  );
};

export default IdeaGeneratorForm;
