import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Clock, Users } from 'lucide-react';
import EmailForm from './EmailForm';
import FeaturesList from './FeaturesList';
const ContentColumn = () => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="w-full md:w-1/2 max-w-xl">
      <div className="mb-2 flex items-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-md mr-2">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Coming Soon
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        Complete AI-Powered<br />Business Builder
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="bg-red-50 dark:bg-red-900/10 border-l-2 border-red-500 rounded p-2">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Business Challenges:</h3>
          <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <li className="flex items-start gap-1">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Time-consuming business planning</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-red-500 mt-0.5">•</span>
              <span>No time or skill for digital ads</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Inconsistent social media strategy</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Limited technical expertise</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/10 border-l-2 border-green-500 rounded p-2">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Our Solutions:</h3>
          <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <li className="flex items-start gap-1">
              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Instant AI-powered business validation</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>AI-powered ad + social media campaigns</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Website & backend solutions</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>1:1 Consulting</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500 rounded p-3 mb-4">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">End-to-End Business Solutions:</h3>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">We don’t just give you insights—we build everything. From AI-driven business validation to fully managed ad campaigns, custom websites, backend infrastructure, and social media execution, we handle the heavy lifting so you can focus on growth. All powered and supported by our expert team.</p>
      </div>
      
      <EmailForm />
      
      <div className="mt-3 flex flex-wrap gap-2">
        {["AI insights", "Ad management", "Website development", "Backend solutions", "24/7 support", "Expert team", "Business validation", "Idea generation"].map((feature, index) => <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-full">
            {index === 4 ? <Clock className="h-3 w-3 text-blue-600 shrink-0" /> : index === 5 ? <Users className="h-3 w-3 text-blue-600 shrink-0" /> : <CheckCircle className="h-3 w-3 text-blue-600 shrink-0" />}
            <span className="text-xs">{feature}</span>
          </div>)}
      </div>
      
      <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 flex items-center">
        <ArrowRight className="h-3 w-3 mr-1" />
        <span>Join now for early access pricing</span>
      </div>
    </motion.div>;
};
export default ContentColumn;