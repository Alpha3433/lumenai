
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { usePlanCreator } from '@/hooks/usePlanCreator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';

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
    setStep
  } = usePlanCreator(initialData);

  return (
    <div className={`container ${step === 2 ? 'max-w-full' : 'max-w-5xl'} mx-auto py-8 px-4`}>
      {step === 1 ? (
        <BusinessPlanForm
          formData={formData}
          generating={generating}
          generatingProgress={generatingProgress}
          onChange={handleInputChange}
          onToggleChange={handleToggleChange}
          onSubmit={handleSubmit}
          isPremium={isPremium}
          onUpgrade={upgradeAccount}
        />
      ) : (
        <BusinessPlanPreview
          businessName={formData.businessName}
          businessDescription={formData.businessDescription}
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
