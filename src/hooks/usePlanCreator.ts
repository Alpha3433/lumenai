
import { useState, useEffect } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import { toast } from '@/components/ui/use-toast';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface FormData {
  businessName: string;
  businessDescription: string;
  useAIV2: boolean;
}

const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
  swotAnalysis: ''
};

export const usePlanCreator = (initialData?: {
  businessName?: string;
  businessDescription?: string;
} | null) => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessName: initialData?.businessName || '',
    businessDescription: initialData?.businessDescription || '',
    useAIV2: false
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (initialData?.businessName || initialData?.businessDescription) {
      setFormData(prev => ({
        ...prev,
        businessName: initialData.businessName || prev.businessName,
        businessDescription: initialData.businessDescription || prev.businessDescription
      }));
      
      toast({
        title: "Business Idea Loaded",
        description: "We've pre-filled your form with the generated business idea."
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateBusinessInfo = (name: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      businessName: name,
      businessDescription: description
    }));
  };

  const simulateProgress = () => {
    setGeneratingProgress(0);
    
    const progressSteps = [
      { target: 15, time: 1000 },
      { target: 35, time: 2000 },
      { target: 60, time: 2500 },
      { target: 85, time: 2000 },
      { target: 95, time: 1500 },
    ];
    
    let currentStep = 0;
    
    const runStep = () => {
      if (currentStep < progressSteps.length) {
        const { target, time } = progressSteps[currentStep];
        
        const smallStepTime = time / (target - generatingProgress);
        const stepInterval = setInterval(() => {
          setGeneratingProgress(prev => {
            const next = prev + 1;
            if (next >= target) {
              clearInterval(stepInterval);
              currentStep++;
              setTimeout(runStep, 300);
              return target;
            }
            return next;
          });
        }, smallStepTime);
      }
    };
    
    runStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName.trim() || !formData.businessDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill out all fields before generating your plan",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.useAIV2 && !isPremium) {
      toast({
        title: "Premium Feature",
        description: "Enhanced AI engine is only available for premium users. Upgrade to access this feature.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    simulateProgress();
    
    try {
      const plan = await generateBusinessPlan({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        useAIV2: formData.useAIV2
      });
      
      setBusinessPlan(plan);
      setGeneratingProgress(100);
      
      setTimeout(() => {
        setStep(2);
      }, 800);
    } catch (error) {
      console.error('Error generating business plan:', error);
      toast({
        title: "Error",
        description: "There was an error generating your business plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setGenerating(false);
      }, 800);
    }
  };

  const downloadPlan = () => {
    toast({
      title: "Success",
      description: "Your business plan is being prepared for download!",
    });
    setTimeout(() => {
      toast({
        description: "In a production app, this would download the generated business plan as a PDF",
      });
    }, 1500);
  };

  const upgradeAccount = () => {
    setIsPremium(true);
    toast({
      title: "Success",
      description: "Premium access granted!",
    });
    setTimeout(() => {
      toast({
        description: "In a production app, this would redirect to a payment page",
      });
    }, 1500);
  };

  return {
    step,
    formData,
    businessPlan,
    generating,
    generatingProgress,
    isPremium,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
    downloadPlan,
    upgradeAccount,
    setStep,
    updateBusinessInfo
  };
};
