
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, CheckCircle, 
  BarChart, Target, RefreshCw, Zap, 
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Feature categories with their corresponding items
const featureCategories = [
  {
    title: "Market Analysis",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800/60",
    features: [
      "Detailed market size insights",
      "Growth trend projections",
      "Competitive landscape overview",
      "Market gap identification"
    ]
  },
  {
    title: "Audience Research",
    icon: <Users className="h-5 w-5" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800/60",
    features: [
      "Customer persona development",
      "Pain point identification",
      "Buying behavior analysis", 
      "Demographic targeting"
    ]
  },
  {
    title: "Business Validation",
    icon: <CheckCircle className="h-5 w-5" />,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800/60",
    features: [
      "Data-driven validation score",
      "Risk assessment metrics",
      "Strategic SWOT analysis", 
      "Viability projections"
    ]
  },
  {
    title: "Launch Strategy",
    icon: <Zap className="h-5 w-5" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    borderColor: "border-amber-200 dark:border-amber-800/60",
    features: [
      "MVP development roadmap",
      "Marketing campaign templates",
      "Growth milestone planning", 
      "Investor-ready materials"
    ]
  }
];

const FeaturesSection = () => {
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
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to <span className="text-blue-600 dark:text-blue-400">Validate Your Idea</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform helps entrepreneurs validate their ideas and avoid building products that won't succeed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <img 
            src="/lovable-uploads/bf8f5448-2228-498a-a525-f187d04fa676.png" 
            alt="SWOT Analysis Example" 
            className="w-full max-w-5xl mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {featureCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "overflow-hidden rounded-xl border",
                category.borderColor
              )}
            >
              <div className={cn("p-4 flex items-center gap-3", category.bgColor)}>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", category.bgColor, "bg-opacity-50")}>
                  <div className={category.color}>{category.icon}</div>
                </div>
                <h3 className={cn("text-xl font-semibold", category.color)}>
                  {category.title}
                </h3>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800">
                <ul className="space-y-3">
                  {category.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * i + 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <ChevronRight className={cn("h-4 w-4 mr-2 mt-1 shrink-0", category.color)} />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to validate your startup idea?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our waiting list today and be the first to access our platform when we launch
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md h-12 px-8 text-md font-medium transition-all shadow-md hover:shadow-lg"
            >
              Join the Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
