
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Image } from "lucide-react";
import { toast } from "sonner";

interface LogoGeneratedResultProps {
  generatedImage: string;
  promptText: string;
  brandName: string;
  onCreateNew: () => void;
}

const LogoGeneratedResult: React.FC<LogoGeneratedResultProps> = ({
  generatedImage,
  promptText,
  brandName,
  onCreateNew
}) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create a temporary anchor element to download the image
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `${brandName.replace(/\s+/g, '-').toLowerCase()}-logo-${Date.now()}.png`;
    link.click();
    
    toast.success("Logo downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h3 className="text-lg font-medium">{brandName}</h3>
        <p className="text-sm text-muted-foreground">Your custom logo is ready!</p>
      </div>
      
      <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900/40 animate-fade-in">
        <CardContent className="p-0">
          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <img 
              src={generatedImage} 
              alt={`Generated logo for ${brandName}`}
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
            onClick={onCreateNew}
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
  );
};

export default LogoGeneratedResult;
