
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DemoStep } from './types';
import { SwotComponents } from '@/utils/swotUtils';
import MockSwotTable from './MockSwotTable';
import { Button } from '@/components/ui/button';

interface SwotAnalysisStepProps {
  step: DemoStep;
}

const SwotAnalysisStep: React.FC<SwotAnalysisStepProps> = ({ step }) => {
  // Example SWOT data for a fitness AI app
  const swotData: SwotComponents = {
    strengths: [
      "FitnessAI utilizes advanced AI technology to provide personalized fitness plans tailored specifically for obese individuals.",
      "The app offers a user-friendly interface that encourages engagement and regular use, making it accessible for all age groups.",
      "FitnessAI has the potential to establish strong partnerships with healthcare providers and fitness professionals, enhancing credibility and reach.",
      "The business model can incorporate multiple revenue streams, such as subscriptions, premium features, and partnerships with health-related brands."
    ],
    weaknesses: [
      "The initial development costs for creating a sophisticated AI-driven app may be high, impacting cash flow in the early stages.",
      "There may be a lack of brand recognition in a competitive market dominated by well-established fitness apps.",
      "The effectiveness of the app relies heavily on user engagement, which can be inconsistent among the target demographic.",
      "Ensuring data privacy and security for users' personal information can pose significant challenges and liabilities."
    ],
    opportunities: [
      "The rising awareness of obesity-related health issues presents a growing market for targeted weight loss solutions like FitnessAI.",
      "Opportunities exist to expand into corporate wellness programs, providing a comprehensive tool for businesses to support their employees' health.",
      "Collaborations with health insurance companies could lead to incentives for users, making the app more appealing and increasing user acquisition.",
      "Advances in technology can lead to new features, such as virtual coaching or community support groups, enhancing user experience and retention."
    ],
    threats: [
      "Intense competition from established fitness apps and new entrants in the market could limit FitnessAI's market share.",
      "Changes in regulations regarding health and fitness applications may impose additional operational complexities and costs.",
      "Economic downturns may lead potential users to prioritize essential spending over fitness app subscriptions.",
      "Negative publicity or user reviews regarding the app's effectiveness could harm the brand's reputation and user trust."
    ]
  };

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
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step 2
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Comprehensive analysis
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Data-backed insights
              </div>
            </div>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              Try SWOT Analysis
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-center">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  </div>
                  SWOT Analysis
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
                  Strategic position assessment
                </div>
              </div>
              
              <MockSwotTable swotData={swotData} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SwotAnalysisStep;
