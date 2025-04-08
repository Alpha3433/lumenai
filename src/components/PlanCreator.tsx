
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { usePlanCreator } from '@/hooks/usePlanCreator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
import { AnimatePresence } from 'framer-motion';

interface PlanCreatorProps {
  initialData?: {
    businessName?: string;
    businessDescription?: string;
  } | null;
}

const PlanCreator = ({ initialData }: PlanCreatorProps) => {
  const {
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
  } = usePlanCreator(initialData);

  const handleRefineBusinessInfo = (name: string, description: string) => {
    updateBusinessInfo(name, description);
    toast({
      title: "Information Updated",
      description: "Your business information has been refined and the report updated.",
    });
  };

  return (
    <div className={`${step === 2 ? 'w-full max-w-full' : 'max-w-5xl'} mx-auto py-6 px-4`}>
      {step === 1 ? (
        <BusinessPlanForm
          formData={formData}
          generating={generating}
          generatingProgress={generatingProgress}
          onChange={handleInputChange}
          onToggleChange={handleToggleChange}
          onSubmit={handleSubmit}
          isPremium={true}
          onUpgrade={upgradeAccount}
        />
      ) : (
        <BusinessPlanPreview
          businessName={formData.businessName}
          businessDescription={formData.businessDescription}
          businessPlan={businessPlan}
          isPremium={true}
          onStartOver={() => setStep(1)}
          onDownload={downloadPlan}
          onRefineBusinessInfo={handleRefineBusinessInfo}
        />
      )}
    </div>
  );
};

export default PlanCreator;
