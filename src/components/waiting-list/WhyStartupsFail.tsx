
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Sparkles, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhyStartupsFail = () => {
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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const failureReasons = [
    { reason: "No Market Need", percentage: 42 },
    { reason: "Ran Out of Cash", percentage: 29 },
    { reason: "Wrong Team", percentage: 23 },
    { reason: "Get Outcompeted", percentage: 19 }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Most Ideas <span className="text-red-500">Fail</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            42% of startups fail due to no market need. Don't let your idea become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold">Top Startup Failure Reasons</h3>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {failureReasons.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{item.reason}</span>
                      <span className="text-red-600 font-bold">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                        style={{ width: "0%" }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-sm italic">
                  Source: CB Insights Research - Top 20 reasons startups fail
                </p>
              </div>
            </div>
          </motion.div>

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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-700">Your Business Idea</h4>
                  </div>
                  
                  <p className="font-medium text-gray-800">
                    Sustainable meal prep subscription service with AI-personalized nutrition
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Market Need:</span> Growing demand for convenient, healthy eating options
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Target Audience:</span> Health-conscious professionals with limited time
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Revenue Model:</span> Weekly subscription + premium add-ons
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => setIdeaGenerated(false)}
                      variant="outline" 
                      className="text-blue-600 border-blue-200"
                    >
                      Generate Another Idea
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
