
import React from 'react';
import { Sparkles, Shield } from 'lucide-react';

interface PremiumHeaderProps {
  plan: 'Starter' | 'Business Pro' | 'Enterprise';
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ plan }) => {
  // Get colors and features based on plan
  const getPlanDetails = (planName: string) => {
    switch (planName) {
      case 'Enterprise':
        return {
          gradient: 'from-purple-600 to-pink-600',
          gradientDark: 'dark:from-purple-500 dark:to-pink-500',
          icon: <Shield className="h-4 w-4 mr-1" />,
          message: 'Enterprise Plan: Unlimited Access to All Premium Features'
        };
      case 'Business Pro':
        return {
          gradient: 'from-blue-600 to-indigo-600',
          gradientDark: 'dark:from-blue-500 dark:to-indigo-500',
          icon: <Sparkles className="h-4 w-4 mr-1" />,
          message: 'Business Pro: Access to Advanced Business Planning Tools'
        };
      default: // Starter
        return {
          gradient: 'from-green-600 to-teal-600',
          gradientDark: 'dark:from-green-500 dark:to-teal-500',
          icon: <Sparkles className="h-4 w-4 mr-1" />,
          message: 'Starter Plan: Enhanced Business Planning Features'
        };
    }
  };

  const planDetails = getPlanDetails(plan);

  return (
    <div className={`fixed top-16 inset-x-0 z-10 py-1.5 bg-gradient-to-r ${planDetails.gradient} ${planDetails.gradientDark} shadow-md`}>
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-center">
        <div className="text-sm font-medium text-white flex items-center">
          {planDetails.icon}
          {planDetails.message}
        </div>
      </div>
    </div>
  );
};

export default PremiumHeader;
