
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, CheckCircle, BarChart3, Brain, Lightbulb } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTryForFree = () => {
    navigate('/market-trends');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center pb-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent"></div>
        <motion.div 
          className="absolute top-1/4 -left-28 w-56 h-56 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5] 
          }} 
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 10, 0],
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4] 
          }} 
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 15, 0], 
            y: [0, -10, 0],
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3] 
          }} 
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30">
            <Brain size={16} className="text-purple-500" />
            <span>AI-Powered Business Builder</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Stop <span className="text-blue-600 dark:text-blue-400">guessing</span>,
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              start <span className="relative">
                building
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/70 dark:bg-blue-400/70 rounded-full"></div>
              </span>
            </span>
          </h1>

          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl p-4 mt-6 mb-4 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">The Problem:</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              <span className="text-red-500 font-medium">90% of startups fail</span> because entrepreneurs can't identify profitable niches, understand market demand, or spot competitor weaknesses.
            </p>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          Our AI platform transforms your business idea into a comprehensive plan with market validation, competitor analysis, and actionable steps in <span className="font-bold">minutes, not months</span>.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Link to="/register">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-md h-14 px-8 text-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/examples">
            <Button variant="outline" className="rounded-md h-14 px-8 text-lg font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              See Success Stories
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/30 flex flex-col items-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2 mb-2">
              <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium">Find Profitable Niches</h3>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/30 flex flex-col items-center">
            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-2 mb-2">
              <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium">Analyze Competitors</h3>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/30 flex flex-col items-center">
            <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2 mb-2">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium">Growth Strategy</h3>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="text-sm text-gray-500 mb-4">No credit card required. 2 free reports per month.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>92% Accuracy Rate</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>30-Second Reports</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>50,000+ Successful Plans</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
