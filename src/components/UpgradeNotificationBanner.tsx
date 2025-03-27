
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, X } from 'lucide-react';

interface UpgradeNotificationBannerProps {
  onUpgrade: () => void;
  onClose: () => void;
}

const UpgradeNotificationBanner: React.FC<UpgradeNotificationBannerProps> = ({
  onUpgrade,
  onClose
}) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-b border-amber-200 dark:border-amber-800 p-3">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-200 dark:bg-amber-700 rounded-full p-1.5">
              <Crown className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                You're viewing a limited version of your business plan
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Upgrade to unlock comprehensive analysis, financial projections, and more
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              Upgrade Now
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onClose} 
              className="text-amber-700 dark:text-amber-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpgradeNotificationBanner;
