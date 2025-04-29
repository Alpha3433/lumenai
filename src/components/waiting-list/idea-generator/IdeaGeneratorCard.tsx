
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Business Idea Generator</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Not sure what business to start? Let our AI help you discover promising niches based on market trends and your interests.
        </p>
        
        {!ideaGenerated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5 
                }}
              >
                <Zap className="h-12 w-12 text-amber-400" />
              </motion.div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-2">
              Generate a completely random business idea!
            </p>
            
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
                    animate={{ x: [0, 4, 0] }}
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
          </motion.div>
        ) : (
          <GeneratedIdea onRegenerateClick={() => setIdeaGenerated(false)} />
        )}
      </div>
    </motion.div>
  );
};

export default IdeaGeneratorCard;
