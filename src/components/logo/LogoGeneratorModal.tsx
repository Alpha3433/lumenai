
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Download, Wand, Palette, Award, Users, Building, Heart, Image, Save } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";

interface LogoGeneratorModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    adjectives: '',
    audience: '',
    industry: '',
    emotions: '',
    logoStyle: '',
    colorPreference: '',
    usageContext: '',
    inspiration: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [promptText, setPromptText] = useState<string>('');
  const [activeStep, setActiveStep] = useState(1);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const goToNextStep = () => {
    if (activeStep === 1 && !formData.brandName) {
      toast.error("Please enter a brand name");
      return;
    }
    setActiveStep(prev => prev + 1);
  };
  
  const goToPreviousStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const savePreferences = () => {
    try {
      localStorage.setItem('logoPreferences', JSON.stringify(formData));
      toast.success("Logo preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
    }
  };

  const handleGenerateLogo = async () => {
    if (!formData.brandName.trim()) {
      toast.error("Please enter a brand name");
      return;
    }
    
    try {
      setIsGenerating(true);
      toast.info("Generating your logo with AI...", { duration: 10000 });
      
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: formData
      });
      
      if (error) throw error;
      
      setGeneratedImage(data.imageUrl);
      setPromptText(data.prompt);
      toast.success("Logo generated successfully!");
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create a temporary anchor element to download the image
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `${formData.brandName.replace(/\s+/g, '-').toLowerCase()}-logo-${Date.now()}.png`;
    link.click();
    
    toast.success("Logo downloaded successfully!");
  };

  const handleClearAndCreateNew = () => {
    setGeneratedImage(null);
    setPromptText('');
    setActiveStep(1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                id="brandName"
                name="brandName"
                placeholder="Enter your brand name"
                value={formData.brandName}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                This will be prominently displayed in your logo.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., Technology, Healthcare, Food & Beverage"
                value={formData.industry}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adjectives">Brand Attributes</Label>
              <Input
                id="adjectives"
                name="adjectives"
                placeholder="e.g., modern, premium, playful, minimalist, bold"
                value={formData.adjectives}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                3-5 adjectives that describe your brand's identity
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                name="audience"
                placeholder="e.g., millennial parents, tech entrepreneurs, Gen Z"
                value={formData.audience}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emotions">Emotional Associations</Label>
              <Input
                id="emotions"
                name="emotions"
                placeholder="e.g., trust, innovation, simplicity, fun"
                value={formData.emotions}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colorPreference">Color Preferences</Label>
              <Input
                id="colorPreference"
                name="colorPreference"
                placeholder="e.g., blue and gold, earthy tones, vibrant colors"
                value={formData.colorPreference}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logoStyle">Logo Style</Label>
              <Input
                id="logoStyle"
                name="logoStyle"
                placeholder="e.g., wordmark, lettermark, abstract symbol, mascot"
                value={formData.logoStyle}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usageContext">Usage Context</Label>
              <Input
                id="usageContext"
                name="usageContext"
                placeholder="e.g., website headers, social media, packaging"
                value={formData.usageContext}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspiration">Design Inspiration</Label>
              <Input
                id="inspiration"
                name="inspiration"
                placeholder="e.g., minimalist, vintage, specific brands"
                value={formData.inspiration}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressDisplay = () => {
    return (
      <div className="flex justify-between mb-6">
        <div className={`h-2 w-1/3 rounded-l-full ${activeStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div className={`h-2 w-1/3 ${activeStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div className={`h-2 w-1/3 rounded-r-full ${activeStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
      </div>
    );
  };

  const navigationButtons = () => {
    return (
      <div className="flex justify-between mt-6">
        <div className="flex gap-2">
          {activeStep > 1 ? (
            <Button variant="outline" onClick={goToPreviousStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button 
            variant="outline" 
            onClick={savePreferences}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            Save Preferences
          </Button>
        </div>
        {activeStep < 3 ? (
          <Button onClick={goToNextStep}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleGenerateLogo}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand className="mr-2 h-4 w-4" />
                Generate Logo
              </>
            )}
          </Button>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Palette className="mr-2 h-5 w-5 text-blue-500" />
            Create Your Brand Logo
          </DialogTitle>
          <DialogDescription>
            Tell us about your brand and we'll generate a professional logo using AI.
          </DialogDescription>
        </DialogHeader>
        
        {!generatedImage ? (
          <>
            {progressDisplay()}
            {renderStepContent()}
            {navigationButtons()}
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center pb-2">
              <h3 className="text-lg font-medium">{formData.brandName}</h3>
              <p className="text-sm text-muted-foreground">Your custom logo is ready!</p>
            </div>
            
            <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900/40 animate-fade-in">
              <CardContent className="p-0">
                <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <img 
                    src={generatedImage} 
                    alt={`Generated logo for ${formData.brandName}`}
                    className="h-full w-full object-contain p-4"
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col gap-4">
              <div className="text-sm text-muted-foreground">
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">Logo details</summary>
                  <p className="mt-2 text-xs p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                    {promptText}
                  </p>
                </details>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearAndCreateNew}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Create New Logo
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Logo
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LogoGeneratorModal;
