
import React from 'react';
import { usePlanCreator } from '@/hooks/usePlanCreator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
import UpgradeNotificationBanner from './UpgradeNotificationBanner';
import { AlertTriangle } from 'lucide-react';

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
    isTrialPeriod,
    isExpiringSoon,
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
      {isTrialPeriod && isPremium && (
        <div className="sticky top-20 z-40 w-full max-w-5xl mx-auto mb-4">
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 p-3 rounded-lg shadow-sm flex items-center gap-2">
            <AlertTriangle className="text-amber-500 dark:text-amber-400 h-5 w-5 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              You're currently in a trial period with premium features. Upgrade to maintain premium access.
            </p>
          </div>
        </div>
      )}

      {isExpiringSoon && isPremium && !isTrialPeriod && (
        <div className="sticky top-20 z-40 w-full max-w-5xl mx-auto mb-4">
          <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700/50 p-3 rounded-lg shadow-sm flex items-center gap-2">
            <AlertTriangle className="text-orange-500 dark:text-orange-400 h-5 w-5 flex-shrink-0" />
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Your premium subscription is expiring soon. Renew to maintain premium access.
            </p>
          </div>
        </div>
      )}
      
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
