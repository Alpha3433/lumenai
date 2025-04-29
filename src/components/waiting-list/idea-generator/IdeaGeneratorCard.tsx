
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GeneratedIdea from './GeneratedIdea';

const IdeaGeneratorCard: React.FC = () => {
  const [ideaGenerated, setIdeaGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateIdea = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIdeaGenerated(true);
      setIsGenerating(false);
    }, 1500);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            whileHover={{ rotate: [0, -10, 20, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md"
          >
            <Lightbulb className="h-5 w-5 text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Business Idea Generator</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Not sure what business to start? Let our AI help you discover promising niches based on market trends and your interests.
        </p>
        
        {!ideaGenerated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6 flex-grow flex flex-col items-center justify-center"
          >
            <div className="flex justify-center">
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <Zap className="h-16 w-16 text-amber-400" />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: 1
                    }}
                    className="absolute inset-0 bg-amber-300 rounded-full blur-xl -z-10"
                  />
                </div>
              </motion.div>
            </div>
            
            <p className="text-center text-gray-500 dark:text-gray-400 mb-2 max-w-xs">
              Generate a completely random business idea and instantly see if it has market potential!
            </p>
            
            <div className="w-full mt-auto pt-4">
              <Button
                onClick={handleGenerateIdea}
                disabled={isGenerating}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2 rounded-lg"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                    <span>Generating Idea...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Business Idea</span>
                    <motion.div
                      animate={{ 
                        x: [0, 4, 0],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5, 
                        repeatType: "reverse" 
                      }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <GeneratedIdea onRegenerateClick={() => setIdeaGenerated(false)} />
        )}
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-2xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default IdeaGeneratorCard;
