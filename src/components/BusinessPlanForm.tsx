import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';

interface BusinessPlanFormProps {
  formData: {
    businessName: string;
    businessDescription: string;
    useAIV2: boolean;
  };
  generating: boolean;
  generatingProgress: number;
  isPremium: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleChange: (name: string, value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onUpgrade: () => void;
}

const aiActionMessages = [
  "Analyzing market dynamics and competitive landscape...",
  "Crafting strategic frameworks for your business concept...",
  "Evaluating financial viability and scaling potential...",
  "Identifying target customer segments and value propositions...",
  "Optimizing your business model for maximum growth...",
  "Running competitor analysis and market positioning...",
  "Calculating revenue projections and market fit...",
  "Assessing risk factors and mitigation strategies...",
  "Building strategic recommendations tailored to your vision...",
  "Processing industry trends and growth opportunities...",
];

const getRandomAiActionMessage = () => {
  const randomIndex = Math.floor(Math.random() * aiActionMessages.length);
  return aiActionMessages[randomIndex];
};

const BusinessPlanForm: React.FC<BusinessPlanFormProps> = ({
  formData,
  generating,
  generatingProgress,
  isPremium,
  onChange,
  onToggleChange,
  onSubmit,
  onUpgrade
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
          Step 1: Tell Us About Your Business
        </div>
        <h1 className="text-3xl font-bold mb-2">Create Your Business Plan</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Fill in the form below with details about your business, and our AI will generate a complete business plan for you.
        </p>
      </div>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={onChange}
                  placeholder="e.g., Acme Corporation"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={onChange}
                  placeholder="Describe your business, product, or service in detail. Include information about your target market, goals, competitors, and expected revenue."
                  required
                  className="mt-1 min-h-40"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-amber-500" />
                      Enhanced AI Engine
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Unlock next-gen analysis with our premium AI engine
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isPremium && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={onUpgrade}
                        className="text-xs"
                      >
                        Upgrade
                      </Button>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Standard</span>
                      <Switch
                        id="ai-version-switch"
                        checked={formData.useAIV2}
                        onCheckedChange={(checked) => onToggleChange('useAIV2', checked)}
                        disabled={!isPremium}
                      />
                      <span className="text-sm font-medium">Premium {!isPremium && '🔒'}</span>
                    </div>
                  </div>
                </div>
                {!isPremium && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Premium AI delivers deeper insights and more strategic business recommendations
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-md flex items-center"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Crafting Plan
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> 
                    Discover Your Niche!
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={generating} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md dialog-no-close-button">
          <div className="space-y-6 py-6">
            <div className="text-center space-y-2">
              <Sparkles className="mx-auto h-16 w-16 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold">Creating Your Business Plan</h3>
              <p className="text-sm text-muted-foreground">
                We're analyzing your business concept and generating a comprehensive plan...
              </p>
              {formData.useAIV2 && (
                <p className="text-xs text-amber-500 font-medium mt-1">
                  <Zap className="inline-block h-3 w-3 mr-1" /> 
                  Using enhanced AI V2 engine for superior results
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Progress 
                value={generatingProgress} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
              <p className="text-sm text-center text-muted-foreground">
                {generatingProgress < 33 && getRandomAiActionMessage()}
                {generatingProgress >= 33 && generatingProgress < 66 && getRandomAiActionMessage()}
                {generatingProgress >= 66 && generatingProgress < 99 && getRandomAiActionMessage()}
                {generatingProgress === 100 && "Complete! Preparing your results..."}
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                <div className="min-w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div>
                  <p className="text-sm font-medium">Step {generatingProgress < 33 ? '1/4' : generatingProgress < 66 ? '2/4' : generatingProgress < 99 ? '3/4' : '4/4'}</p>
                  <p className="text-xs text-muted-foreground">
                    {generatingProgress < 33 && "Market analysis and competitive landscape"}
                    {generatingProgress >= 33 && generatingProgress < 66 && "Financial projections and business model"}
                    {generatingProgress >= 66 && generatingProgress < 99 && "Risk assessment and SWOT analysis"}
                    {generatingProgress === 100 && "Finalizing executive summary and recommendations"}
                  </p>
                </div>
              </div>
              
              <p className="text-xs italic text-muted-foreground">
                Our AI is working hard to create a tailored business plan for "{formData.businessName}"
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessPlanForm;
