
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GeneratedIdea from './GeneratedIdea';

const IdeaGeneratorCard: React.FC = () => {
  const [stepShown, setStepShown] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const failureReasons = [
    { reason: "No Market Need", description: "Your product solves a problem that very few people have or are willing to pay for." },
    { reason: "Ran Out of Cash", description: "Insufficient funding or poor cash flow management before achieving sustainable revenue." },
    { reason: "Wrong Team", description: "Team lacks the right mix of skills or experience needed for the specific business." },
    { reason: "Get Outcompeted", description: "Failed to differentiate or establish a defensible position against competitors." },
  ];

  const handleAnalyzeIdea = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setStepShown(prev => Math.min(prev + 1, failureReasons.length - 1));
      setIsProcessing(false);
    }, 1000);
  };

  const handleReset = () => {
    setStepShown(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold">Startup Failure Simulator</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          See how common startup mistakes could impact your business idea and learn how to avoid these critical pitfalls.
        </p>
        
        <div className="space-y-6">
          {stepShown >= 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                    {failureReasons[stepShown].reason}
                  </h4>
                  <p className="text-sm text-red-600/80 dark:text-red-300/80">
                    {failureReasons[stepShown].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {failureReasons.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx <= stepShown ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {stepShown + 1} of {failureReasons.length} risks
            </span>
          </div>
          
          {stepShown < failureReasons.length - 1 ? (
            <Button
              onClick={handleAnalyzeIdea}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Show Next Failure Risk</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      repeatType: "reverse" 
                    }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Our validation platform helps you avoid these common pitfalls by testing your idea with real market data before you invest time and money.
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                Reset Simulation
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaGeneratorCard;
