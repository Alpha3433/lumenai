import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { usePlanCreator } from '@/hooks/usePlanCreator';
import BusinessPlanForm from './BusinessPlanForm';
import BusinessPlanPreview from './BusinessPlanPreview';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

interface PlanCreatorProps {
  initialData?: {
    businessName?: string;
    businessDescription?: string;
  } | null;
}

const PlanCreator = ({ initialData }: PlanCreatorProps) => {
  const { user } = useAuth();
  const {
    step,
    formData,
    businessPlan,
    generating,
    generatingProgress,
    isPremium,
    handleInputChange,
    handleToggleChange,
    handleSubmit: originalHandleSubmit,
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

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      // First generate the plan
      await originalHandleSubmit(e);
      
      // Then save the submission
      if (user) {
        await supabase.from('business_submissions').insert({
          business_name: formData.businessName,
          business_description: formData.businessDescription,
          user_id: user.id
        });
        
        toast({
          description: "Your business plan has been submitted for review.",
        });
      }
    } catch (error) {
      console.error('Error submitting business plan:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your business plan.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`${step === 2 ? 'w-full max-w-7xl' : 'max-w-5xl'} mx-auto py-6 px-4`}>
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
