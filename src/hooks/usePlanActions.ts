
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export const usePlanActions = () => {
  const [isPremium, setIsPremium] = useState(false);

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
    isPremium,
    setIsPremium,
    downloadPlan,
    upgradeAccount
  };
};
