
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp, 
  RefreshCw,
  Globe,
  MousePointer,
  LightbulbIcon,
  Settings,
  LayoutGrid
} from 'lucide-react';

// Analysis tools tabs data
const analysisTabs = [
  { id: 'market', label: 'Market Analysis', icon: <Globe className="w-5 h-5" /> },
  { id: 'swot', label: 'SWOT Analysis', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'customer', label: 'Customer Insights', icon: <Users className="w-5 h-5" /> },
  { id: 'competition', label: 'Competition', icon: <Target className="w-5 h-5" /> },
  { id: 'viability', label: 'Idea Viability', icon: <LightbulbIcon className="w-5 h-5" /> }
];

// Analysis tools content by tab ID
const analysisContent = {
  market: {
    title: "Market Analysis Tools",
    description: "Identify market trends, size, and growth potential with real-time data",
    image: "/lovable-uploads/30a04c4a-1b7d-4af1-9a64-17050ecd7bae.png",
    features: [
      "Total addressable market (TAM) calculation with accurate industry data",
      "Growth rate projections based on 5-year market trends",
      "Demand forecasting with seasonal adjustment algorithms",
      "Market saturation analysis with competitive density mapping"
    ]
  },
  swot: {
    title: "SWOT Analysis Framework",
    description: "Analyze strengths, weaknesses, opportunities, and threats with our AI-powered SWOT generator",
    image: "/lovable-uploads/7964ca29-0497-47f8-8ab8-48c35b4bc2a0.png",
    features: [
      "Automated identification of internal strengths and weaknesses",
      "External opportunity detection based on market gaps",
      "Competitive threat assessment with mitigation strategies",
      "Strategic recommendation engine based on SWOT findings"
    ]
  },
  customer: {
    title: "Customer Insights Platform",
    description: "Understand your target audience, their pain points, and buying preferences",
    image: "/lovable-uploads/30a04c4a-1b7d-4af1-9a64-17050ecd7bae.png",
    features: [
      "Demographic and psychographic customer profiling",
      "Price sensitivity analysis across market segments",
      "Customer journey mapping with friction point identification",
      "User persona generation with behavioral patterns"
    ]
  },
  competition: {
    title: "Competitive Analysis Suite",
    description: "Benchmark against competitors and identify your unique advantage",
    image: "/lovable-uploads/30a04c4a-1b7d-4af1-9a64-17050ecd7bae.png",
    features: [
      "Competitor feature comparison matrix with gap identification",
      "Pricing strategy analysis across the competitive landscape",
      "Market positioning map with opportunity spaces",
      "Competitor strength/weakness evaluation with opportunity gaps"
    ]
  },
  viability: {
    title: "Idea Viability Scoring",
    description: "Get a clear score for your business concept based on multiple validation parameters",
    image: "/lovable-uploads/30a04c4a-1b7d-4af1-9a64-17050ecd7bae.png",
    features: [
      "Comprehensive viability algorithm with 15+ validation factors",
      "Profitability projection modeling with break-even analysis",
      "Risk assessment scoring with mitigation recommendations",
      "Success probability estimation based on similar ventures"
    ]
  }
};

// Animated feature item component
const AnimatedFeatureItem = ({ text, index }: { text: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start"
  >
    <div className="mt-1 text-blue-500 flex-shrink-0 mr-3">
      <CheckCircle className="h-5 w-5" />
    </div>
    <span className="text-gray-700 dark:text-gray-200">{text}</span>
  </motion.div>
);

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [isChanging, setIsChanging] = useState(false);
  
  // Get current content based on active tab
  const currentContent = analysisContent[activeTab as keyof typeof analysisContent];

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    
    setIsChanging(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsChanging(false);
    }, 300);
  };

  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 mb-4">
            Comprehensive Analysis Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="text-blue-600 dark:text-blue-400">Validate Your Idea</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides multiple analysis tools to validate your business idea from every angle
          </p>
        </motion.div>

        {/* Analysis Tools Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {analysisTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                "text-sm md:text-base font-medium",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <span className="hidden md:inline">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Analysis Content Display */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: isChanging ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 p-8"
          >
            {/* Left Column - Features */}
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {currentContent.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {currentContent.description}
              </motion.p>

              <div className="space-y-4 mt-6">
                {currentContent.features.map((feature, idx) => (
                  <AnimatedFeatureItem key={idx} text={feature} index={idx} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-4"
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-5"
                >
                  Try This Tool Now
                  <RefreshCw className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative p-4 flex items-center justify-center"
            >
              <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                <img 
                  src={currentContent.image}
                  alt={`${currentContent.title} visualization`}
                  className="w-full h-full object-cover"
                />
                
                {/* Animated overlay elements */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none"
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <motion.div
                  className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                
                <motion.div
                  className="absolute top-4 left-4 h-3 w-3 rounded-full bg-green-500"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Analysis Tools Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
              title: "Market Size Assessment",
              description: "Calculate your total addressable market (TAM) with precision using the latest industry data"
            },
            {
              icon: <Target className="h-6 w-6 text-red-600 dark:text-red-400" />,
              title: "Competitor Gap Analysis",
              description: "Identify market gaps and opportunities by analyzing the weaknesses in competitor offerings"
            },
            {
              icon: <Users className="h-6 w-6 text-green-600 dark:text-green-400" />,
              title: "Customer Persona Creation",
              description: "Build detailed customer profiles with demographics, psychographics, and behavior patterns"
            }
          ].map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{tool.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to validate your startup idea?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our waiting list today and be the first to access our comprehensive analysis platform when we launch
            </p>
            <Button 
              className="bg-white hover:bg-gray-100 text-blue-600 rounded-md h-12 px-8 text-md font-medium transition-all shadow-md hover:shadow-lg"
            >
              Join the Waitlist
              <MousePointer className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
