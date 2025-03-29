
import React from 'react';
import { usePlanCreator } from '@/hooks/usePlanCreator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
import UpgradeNotificationBanner from './UpgradeNotificationBanner';

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
    generationError,
    isPremium,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
    downloadPlan,
    upgradeAccount,
    setStep
  } = usePlanCreator(initialData);

  // Handle form submission properly
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className={`${step === 2 ? 'max-w-full' : 'max-w-5xl'} mx-auto py-6 px-4`}>
      {step === 2 && !isPremium && (
        <UpgradeNotificationBanner onUpgrade={upgradeAccount} />
      )}
      
      {step === 1 ? (
        <BusinessPlanForm
          formData={formData}
          generating={generating}
          generatingProgress={generatingProgress}
          generationError={generationError}
          onChange={handleInputChange}
          onToggleChange={handleToggleChange}
          onSubmit={onSubmitForm}
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
