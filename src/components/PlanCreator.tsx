
import React, { useState } from 'react';
import { generateBusinessPlan } from '@/utils/planGenerator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';

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
    setGenerating(true);
    
    try {
      const plan = await generateBusinessPlan(formData);
      setBusinessPlan(plan);
      setStep(2);
    } catch (error) {
      console.error('Error generating business plan:', error);
      // Handle error
    } finally {
      setGenerating(false);
    }
  };

  const downloadPlan = () => {
    // This would handle downloading the plan as PDF
    alert('In a production app, this would download the generated business plan as a PDF');
  };

  const upgradeAccount = () => {
    setIsPremium(true);
    alert('In a production app, this would redirect to a payment page. For demo purposes, you now have premium access!');
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      {step === 1 ? (
        <BusinessPlanForm
          formData={formData}
          generating={generating}
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
