
import React, { useState } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
import { toast } from '@/components/ui/use-toast';
import { Progress } from './ui/progress';

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
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setGeneratingProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 600);
    
    try {
      const plan = await generateBusinessPlan(formData);
      setBusinessPlan(plan);
      setStep(2);
      setGeneratingProgress(100);
    } catch (error) {
      console.error('Error generating business plan:', error);
      toast({
        title: "Error",
        description: "There was an error generating your business plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setGenerating(false);
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
        <>
          <BusinessPlanForm
            formData={formData}
            generating={generating}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          {generating && (
            <div className="mt-8 space-y-3">
              <Progress value={generatingProgress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              <p className="text-sm text-center text-muted-foreground animate-pulse">
                Generating your business plan... {generatingProgress}%
              </p>
            </div>
          )}
        </>
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
