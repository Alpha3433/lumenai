
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Zap } from 'lucide-react';

interface GeneratingDialogProps {
  open: boolean;
  progress: number;
  useAIV2: boolean;
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

const GeneratingDialog = ({ open, progress, useAIV2 }: GeneratingDialogProps) => {
  const [currentMessage, setCurrentMessage] = useState("");
  
  // Update message based on progress changes
  useEffect(() => {
    if (progress < 33) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 33 && progress < 66) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 66 && progress < 99) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress === 100) {
      setCurrentMessage("Complete! Preparing your results...");
    }
  }, [progress]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Creating Your Business Plan</DialogTitle>
        <div className="space-y-6 py-6">
          <div className="text-center space-y-2">
            <Sparkles className="mx-auto h-16 w-16 text-primary animate-pulse" />
            <h3 className="text-xl font-semibold">Creating Your Business Plan</h3>
            <p className="text-sm text-muted-foreground">
              We're analyzing your business concept and generating a comprehensive plan...
            </p>
            {useAIV2 && (
              <p className="text-xs text-amber-500 font-medium mt-1">
                <Zap className="inline-block h-3 w-3 mr-1" /> 
                Using enhanced AI V2 engine for superior results
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-2 bg-gray-200 dark:bg-gray-700"
            />
            <p className="text-sm text-center text-muted-foreground">
              {currentMessage}
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-start space-x-3">
              <div className="min-w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              </div>
              <div>
                <p className="text-sm font-medium">Step {progress < 33 ? '1/4' : progress < 66 ? '2/4' : progress < 99 ? '3/4' : '4/4'}</p>
                <p className="text-xs text-muted-foreground">
                  {progress < 33 && "Market analysis and competitive landscape"}
                  {progress >= 33 && progress < 66 && "Financial projections and business model"}
                  {progress >= 66 && progress < 99 && "Risk assessment and SWOT analysis"}
                  {progress === 100 && "Finalizing executive summary and recommendations"}
                </p>
              </div>
            </div>
            
            <p className="text-xs italic text-muted-foreground">
              Our AI is working hard to create a tailored business plan
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratingDialog;
