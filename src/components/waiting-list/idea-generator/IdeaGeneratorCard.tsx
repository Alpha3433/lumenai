
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import GeneratedIdea from './GeneratedIdea';

const IdeaGeneratorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Idea Generation</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Industry</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400">
                Fitness & Health
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Statement</label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400">
                People struggle to stay motivated with their fitness routine
              </div>
            </div>
          </div>
          
          <div className="py-3 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          
          <GeneratedIdea
            title="Smart Fitness Coach App"
            description="An AI-powered fitness app that adapts workouts based on user progress, provides personalized motivation, and creates community challenges to keep users engaged."
          />
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Market validation score: <span className="text-green-500 font-medium">87%</span></span>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Validate this idea
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaGeneratorCard;
