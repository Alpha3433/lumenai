
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

interface UpgradeNotificationBannerProps {
  onUpgrade: () => void;
}

const UpgradeNotificationBanner: React.FC<UpgradeNotificationBannerProps> = ({
  onUpgrade
}) => {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="w-full max-w-3xl mx-auto mb-6 z-10"
    >
      <div className="relative">
        <motion.div
          className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/80 dark:to-amber-800/80 
                   shadow-xl rounded-xl border border-amber-200/50 dark:border-amber-700/50 backdrop-blur-sm
                   overflow-hidden transition-all duration-300 ease-in-out w-full"
          layout
        >
          <div className="p-3 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-200 dark:bg-amber-700 rounded-full p-1.5">
                  <Crown className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    You're viewing a limited version
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Upgrade to unlock comprehensive analysis & more
                  </p>
                </div>
              </div>
              <div>
                <Button 
                  size="sm" 
                  onClick={onUpgrade}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                >
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpgradeNotificationBanner;
