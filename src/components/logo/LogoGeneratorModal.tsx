
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Download, Sparkles } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface LogoGeneratorModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({ open, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateLogo = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your logo");
      return;
    }
    
    try {
      setIsGenerating(true);
      toast.info("Generating your logo...", { duration: 10000 });
      
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { prompt: prompt.trim() }
      });
      
      if (error) throw error;
      
      setGeneratedImage(data.imageUrl);
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
    link.download = `logo-${Date.now()}.png`;
    link.click();
    
    toast.success("Logo downloaded successfully!");
  };

  const handleClearAndCreateNew = () => {
    setGeneratedImage(null);
    setPrompt('');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create a Custom Logo</DialogTitle>
          <DialogDescription>
            Describe your business or brand, and we'll generate a logo design using AI.
          </DialogDescription>
        </DialogHeader>
        
        {!generatedImage ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe your logo</Label>
              <Input
                id="prompt"
                placeholder="e.g., A tech startup focused on AI solutions"
                value={prompt}
                onChange={handlePromptChange}
                disabled={isGenerating}
              />
              <p className="text-sm text-muted-foreground">
                Include your business name, industry, and style preferences for best results.
              </p>
            </div>
            
            <Button
              onClick={handleGenerateLogo}
              className="w-full"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Logo
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
              <img 
                src={generatedImage} 
                alt="Generated logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Prompt: {prompt}
            </p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClearAndCreateNew}
              >
                Create Another
              </Button>
              <Button
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LogoGeneratorModal;
