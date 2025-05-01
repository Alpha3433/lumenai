
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Wand, Save } from "lucide-react";

interface FormNavigationProps {
  activeStep: number;
  isGenerating: boolean;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  handleGenerateLogo: () => void;
  savePreferences: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  activeStep,
  isGenerating,
  goToPreviousStep,
  goToNextStep,
  handleGenerateLogo,
  savePreferences
}) => {
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

export default FormNavigation;
