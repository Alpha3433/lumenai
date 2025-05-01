
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Palette } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

// Import our components
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import LogoGeneratedResult from './LogoGeneratedResult';
import FormNavigation from './FormNavigation';
import ProgressDisplay from './ProgressDisplay';

interface LogoGeneratorModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({ open, onClose }) => {
  const { user } = useAuth();
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
  
  useEffect(() => {
    // Load saved preferences if available
    const savedPreferences = localStorage.getItem('logoPreferences');
    if (savedPreferences) {
      try {
        setFormData(JSON.parse(savedPreferences));
      } catch (error) {
        console.error("Error parsing saved preferences:", error);
      }
    }
  }, []);
  
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

  const saveLogoToDatabase = async (imageUrl: string, prompt: string) => {
    if (!user) {
      toast.error("You must be logged in to save logos");
      return;
    }

    try {
      const { error } = await supabase.from('logo_designs').insert({
        user_id: user.id,
        brand_name: formData.brandName,
        form_data: formData,
        image_url: imageUrl,
        prompt_text: prompt
      });

      if (error) throw error;
      toast.success("Logo saved to your account");
    } catch (error) {
      console.error("Error saving logo to database:", error);
      toast.error("Failed to save logo to your account");
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
      
      // Save the logo to the database once generated
      if (user) {
        await saveLogoToDatabase(data.imageUrl, data.prompt);
      }
      
      toast.success("Logo generated successfully!");
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearAndCreateNew = () => {
    setGeneratedImage(null);
    setPromptText('');
    setActiveStep(1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <StepOne formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <StepTwo formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <StepThree formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
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
            <ProgressDisplay activeStep={activeStep} />
            {renderStepContent()}
            <FormNavigation 
              activeStep={activeStep}
              isGenerating={isGenerating}
              goToPreviousStep={goToPreviousStep}
              goToNextStep={goToNextStep}
              handleGenerateLogo={handleGenerateLogo}
              savePreferences={savePreferences}
            />
          </>
        ) : (
          <LogoGeneratedResult 
            generatedImage={generatedImage}
            promptText={promptText}
            brandName={formData.brandName}
            onCreateNew={handleClearAndCreateNew}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LogoGeneratorModal;
