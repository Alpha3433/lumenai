
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, LayoutTemplate } from 'lucide-react';
import EmailForm from './EmailForm';
import { Separator } from "@/components/ui/separator";

const ContentColumn = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl space-y-4 mx-auto md:mx-0"
    >
      <div className="mb-1 flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-md mr-2">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Coming Soon
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        All-in-One Business Solution
      </h1>
      
      <p className="text-base text-gray-600 dark:text-gray-300">
        Join our waiting list for early access to our revolutionary platform that solves critical business challenges.
      </p>
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-2 gap-3">
        <BusinessChallenge 
          icon={<Shield className="h-5 w-5" />}
          title="Time Consuming" 
          description="Traditional business planning requires weeks of research and preparation"
        />
        <BusinessSolution
          icon={<TrendingUp className="h-5 w-5" />}
          title="AI-Powered Plans" 
          description="Generate investor-ready business plans in minutes, not weeks"
        />
        <BusinessChallenge 
          icon={<Shield className="h-5 w-5" />}
          title="Technical Complexity" 
          description="Building websites and managing backend systems is costly"
        />
        <BusinessSolution
          icon={<LayoutTemplate className="h-5 w-5" />}
          title="Full Tech Support" 
          description="We build and manage your web presence and backend systems"
        />
      </div>
      
      <EmailForm />
    </motion.div>
  );
};

const BusinessChallenge = ({ icon, title, description }) => (
  <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-3">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-red-600 dark:text-red-400">{icon}</div>
      <h3 className="font-medium text-sm text-red-700 dark:text-red-400">{title}</h3>
    </div>
    <p className="text-xs text-red-600 dark:text-red-300">{description}</p>
  </div>
);

const BusinessSolution = ({ icon, title, description }) => (
  <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg p-3">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-green-600 dark:text-green-400">{icon}</div>
      <h3 className="font-medium text-sm text-green-700 dark:text-green-400">{title}</h3>
    </div>
    <p className="text-xs text-green-600 dark:text-green-300">{description}</p>
  </div>
);

export default ContentColumn;
