
import React, { useState } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
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

const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
  swotAnalysis: ''
};

const PlanCreator = () => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: ''
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);
  const [isPremium, setIsPremium] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    setGenerating(true);
    setGeneratingProgress(0);
    
    // Simulate more realistic and interactive progress
    const progressSteps = [
      { target: 15, time: 1000 }, // Market analysis starts
      { target: 35, time: 2000 }, // Business model analysis
      { target: 60, time: 2500 }, // Financial projections
      { target: 85, time: 2000 }, // Risk assessment
      { target: 95, time: 1500 }, // Final touches
    ];
    
    let currentStep = 0;
    const simulateProgress = () => {
      if (currentStep < progressSteps.length) {
        const { target, time } = progressSteps[currentStep];
        
        const smallStepTime = time / (target - generatingProgress);
        const stepInterval = setInterval(() => {
          setGeneratingProgress(prev => {
            const next = prev + 1;
            if (next >= target) {
              clearInterval(stepInterval);
              currentStep++;
              setTimeout(simulateProgress, 300); // Slight pause between major steps
              return target;
            }
            return next;
          });
        }, smallStepTime);
      }
    };
    
    simulateProgress();
    
    try {
      const plan = await generateBusinessPlan(formData);
      setBusinessPlan(plan);
      setGeneratingProgress(100);
      
      // Small delay to show 100% completion before showing the results
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
    // This would handle downloading the plan as PDF
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

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      {step === 1 ? (
        <BusinessPlanForm
          formData={formData}
          generating={generating}
          generatingProgress={generatingProgress}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <BusinessPlanPreview
          businessName={formData.businessName}
          businessPlan={businessPlan}
          isPremium={isPremium}
          onStartOver={() => setStep(1)}
          onDownload={downloadPlan}
          onUpgrade={upgradeAccount}
        />
      )}
    </div>
  );
};

export default PlanCreator;
