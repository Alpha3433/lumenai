
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { Switch } from '@/components/ui/switch';

// Add industry options
const industries = [
  "Technology", "Health & Wellness", "Education", "Food & Beverage", 
  "E-commerce", "Finance", "Entertainment", "Sustainability", "Fashion"
];

interface IdeaGeneratorFormProps {
  generating: boolean;
  interests: string;
  setInterests: (interests: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onGenerateIdea: () => void;
  isPremium?: boolean;
  useAIV2: boolean;
  setUseAIV2: (value: boolean) => void;
}

const IdeaGeneratorForm: React.FC<IdeaGeneratorFormProps> = ({
  generating,
  interests,
  setInterests,
  industry,
  setIndustry,
  currentTab,
  setCurrentTab,
  onGenerateIdea,
  isPremium = false,
  useAIV2,
  setUseAIV2
}) => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateIdea();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="guided">Guided</TabsTrigger>
          <TabsTrigger value="surprise">Surprise Me</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guided" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              disabled={generating}
            >
              <option value="">Select an industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Your Interests or Expertise (Optional)
            </label>
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., mobile apps, fitness, cooking"
              disabled={generating}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="surprise" className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm">
              We'll generate a completely random business idea for you based on current market trends and opportunities.
            </p>
          </div>
        </TabsContent>
        
        {/* AI Engine Selector */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium flex items-center">
                <Zap className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
                Enhanced AI Engine
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPremium ? 'Use our advanced AI model for better results' : 'Unlock premium AI features'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">Standard</span>
              <Switch
                checked={useAIV2}
                onCheckedChange={setUseAIV2}
                disabled={!isPremium || generating}
              />
              <span className="text-xs font-medium">Premium {!isPremium && '🔒'}</span>
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={generating}
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Business Idea
            </>
          )}
        </Button>
      </Tabs>
    </form>
  );
};

export default IdeaGeneratorForm;
