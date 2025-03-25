
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, CheckCircle } from 'lucide-react';
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
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30">
            AI-Powered Business Builder
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Build Your <span className="relative">
              Business
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/70 dark:bg-blue-400/70 rounded-full"></div>
            </span> From Vision to Reality
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Stop guessing, start building. Our all-in-one AI platform helps entrepreneurs create comprehensive business plans, find profitable niches, and launch successful ventures in days, not months.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={handleTryForFree}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-14 px-8 text-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Link to="/examples">
            <Button variant="outline" className="rounded-md h-14 px-8 text-lg font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              Show Examples
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="text-sm text-gray-500 mb-4">No credit card required. 2 free reports per month.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Real-time data</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Competitor analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>92% accuracy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
