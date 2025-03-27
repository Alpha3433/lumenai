
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, X, ChevronUp } from 'lucide-react';

interface UpgradeNotificationBannerProps {
  onUpgrade: () => void;
  onClose: () => void;
}

const UpgradeNotificationBanner: React.FC<UpgradeNotificationBannerProps> = ({
  onUpgrade,
  onClose
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
    >
      <div className="relative">
        <motion.div
          className={`bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/80 dark:to-amber-800/80 
                     shadow-xl rounded-full border border-amber-200/50 dark:border-amber-700/50 backdrop-blur-sm
                     overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-full max-w-2xl' : 'w-auto max-w-md'}`}
          layout
        >
          {isExpanded ? (
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
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={onUpgrade}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    Upgrade
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={toggleExpand} 
                    className="text-amber-700 dark:text-amber-300"
                  >
                    <ChevronUp className="h-4 w-4" />
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
          ) : (
            <div className="p-2 px-4 flex items-center gap-2">
              <div className="bg-amber-200 dark:bg-amber-700 rounded-full p-1.5">
                <Crown className="h-4 w-4 text-amber-600 dark:text-amber-300" />
              </div>
              <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                Limited Plan
              </p>
              <Button 
                size="sm" 
                onClick={onUpgrade}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs py-1 h-7"
              >
                Upgrade
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={toggleExpand} 
                className="h-6 w-6 text-amber-700 dark:text-amber-300"
              >
                <ChevronUp className="h-3 w-3 rotate-180" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={onClose} 
                className="h-6 w-6 text-amber-700 dark:text-amber-300"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpgradeNotificationBanner;
