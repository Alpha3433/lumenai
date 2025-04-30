
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  Wand, 
  Globe, 
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoStep } from './types';

interface ToolsShowcaseStepProps {
  step: DemoStep;
}

const ToolsShowcaseStep: React.FC<ToolsShowcaseStepProps> = ({ step }) => {
  // Tool buttons with FitnessAI examples
  const tools = [
    {
      name: "Create Plan",
      icon: FileText,
      description: "Generate a complete business plan for FitnessAI with market analysis and financial projections.",
      bgColor: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
    },
    {
      name: "Schedule",
      icon: Calendar,
      description: "Set up customer interviews to understand weight loss needs and validate your FitnessAI app concept.",
      bgColor: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50"
    },
    {
      name: "New Task",
      icon: CheckCircle,
      description: "Create tasks to track development milestones for your FitnessAI application.",
      bgColor: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50"
    },
    {
      name: "Create Logo",
      icon: Wand,
      description: "Design a professional logo for your FitnessAI brand that appeals to your target audience.",
      bgColor: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
    },
    {
      name: "Reddit Insights",
      icon: Globe,
      description: "Discover what users are saying about fitness apps and weight loss on Reddit.",
      bgColor: "bg-[#FF4500]/20 hover:bg-[#FF4500]/40 dark:bg-[#FF4500]/20 dark:hover:bg-[#FF4500]/40"
    },
    {
      name: "Create Landing Page",
      icon: Layout,
      description: "Build a conversion-optimized landing page to gather early signups for FitnessAI.",
      bgColor: "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50"
    }
  ];

  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step {4}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                No design experience needed
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Full suite of business tools
              </div>
            </div>
            
            <Button className="bg-orange-600 hover:bg-orange-700">
              Try Our Tools Now
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-3/5 w-full"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">
                FitnessAI Toolkit
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center text-sm">
                Everything you need to build your weight loss AI app business
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool, index) => (
                  <div key={index} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <Button variant="secondary" className={`mb-3 w-full justify-start text-gray-800 dark:text-gray-200 ${tool.bgColor}`}>
                      <tool.icon className="mr-2 h-4 w-4" />
                      {tool.name}
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcaseStep;
