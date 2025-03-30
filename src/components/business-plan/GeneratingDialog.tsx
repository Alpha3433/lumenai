
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratingDialogProps {
  open: boolean;
  progress: number;
  useAIV2: boolean;
  error?: string | null;
  onRetry?: () => void;
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

const GeneratingDialog = ({ 
  open, 
  progress, 
  useAIV2, 
  error, 
  onRetry 
}: GeneratingDialogProps) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [stuckTimeout, setStuckTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  
  // Reset stuck state when dialog opens/closes or when progress changes
  useEffect(() => {
    setIsStuck(false);
    if (stuckTimeout) {
      clearTimeout(stuckTimeout);
    }
    
    // Set a timeout to detect if generation is stuck
    if (open && !error && progress > 0 && progress < 90) {
      const timeout = setTimeout(() => {
        if (progress < 90) {
          setIsStuck(true);
        }
      }, 60000); // Consider stuck after 60 seconds without progress change (increased from 45s)
      
      setStuckTimeout(timeout);
    }
    
    return () => {
      if (stuckTimeout) clearTimeout(stuckTimeout);
    };
  }, [open, progress, error]);
  
  // Update message based on progress changes
  useEffect(() => {
    if (error) {
      setCurrentMessage("Generation error encountered. You can try again.");
      return;
    }
    
    if (isStuck) {
      setCurrentMessage("Generation seems to be taking longer than expected. You may want to try again.");
      return;
    }
    
    if (progress < 25) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 25 && progress < 50) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 50 && progress < 75) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 75 && progress < 90) {
      setCurrentMessage(getRandomAiActionMessage());
    } else if (progress >= 90) {
      setCurrentMessage("Processing complete! Preparing your results...");
    }
  }, [progress, error, isStuck]);

  // Update message periodically to show activity
  useEffect(() => {
    if (open && !error && !isStuck && progress < 90) {
      const interval = setInterval(() => {
        setCurrentMessage(getRandomAiActionMessage());
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [open, error, isStuck, progress]);
  
  // Time tracker for diagnostics
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open && progress < 100 && !error) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Add a diagnostic log message every 15 seconds
        if (timeElapsed > 0 && timeElapsed % 15 === 0) {
          const newLogMessage = `${timeElapsed}s elapsed, progress at ${progress}%`;
          setLogMessages(prev => [...prev, newLogMessage]);
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, progress, error, timeElapsed]);

  // Format time as minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Creating Your Business Plan</DialogTitle>
        <DialogDescription id="generating-dialog-description">
          We're analyzing your business concept and generating a comprehensive plan...
        </DialogDescription>
        <div className="space-y-6 py-6">
          {error || isStuck ? (
            <div className="text-center space-y-4">
              <AlertCircle className="mx-auto h-16 w-16 text-destructive animate-pulse" />
              <h3 className="text-xl font-semibold">{isStuck ? "Generation Taking Too Long" : "Generation Error"}</h3>
              <p className="text-sm text-muted-foreground">
                {error || "The business plan generation process seems to be taking longer than expected. This might be due to server load or connection issues."}
              </p>
              
              {/* Technical diagnostics section for debugging */}
              <div className="mt-4 p-3 bg-muted/50 rounded-md text-left">
                <p className="text-xs font-mono mb-2">Diagnostic Information:</p>
                <div className="text-xs font-mono">
                  <p>• Time elapsed: {formatTime(timeElapsed)}</p>
                  <p>• Progress reached: {progress}%</p>
                  <p>• Model: {useAIV2 ? 'gpt-4o' : 'gpt-4o-mini'}</p>
                  {logMessages.length > 0 && (
                    <div className="mt-2 border-t border-muted-foreground/20 pt-2">
                      <p className="mb-1">Progress log:</p>
                      <div className="max-h-24 overflow-y-auto">
                        {logMessages.map((msg, i) => (
                          <p key={i} className="text-xs opacity-80">{msg}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {onRetry && (
                <Button 
                  onClick={onRetry}
                  className="mt-4"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again with Simpler Settings
                </Button>
              )}
            </div>
          ) : (
            <>
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
                <p className="text-xs text-muted-foreground">
                  Time elapsed: {formatTime(timeElapsed)}
                </p>
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
                    <p className="text-sm font-medium">Step {progress < 33 ? '1/4' : progress < 66 ? '2/4' : progress < 95 ? '3/4' : '4/4'}</p>
                    <p className="text-xs text-muted-foreground">
                      {progress < 33 && "Market analysis and competitive landscape"}
                      {progress >= 33 && progress < 66 && "Financial projections and business model"}
                      {progress >= 66 && progress < 95 && "Risk assessment and SWOT analysis"}
                      {progress >= 95 && "Finalizing executive summary and recommendations"}
                    </p>
                  </div>
                </div>
                
                <p className="text-xs italic text-muted-foreground">
                  Our AI is working hard to create a tailored business plan
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratingDialog;
