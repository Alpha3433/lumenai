
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NewHero = () => {
  return (
    <div className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
            AI-Powered Business Building
          </span>
        </div>

        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Turn <span className="text-blue-600">Business Ideas</span> Into Your Product's Secret Weapon
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          An affordable way to validate business ideas that works your product gives the industry boost all customer-centric, with simple product enhancements with ease
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-12 px-8 text-lg font-medium">
              Build Your Business Plan Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/market-trends">
            <Button variant="outline" className="rounded-md h-12 px-8 text-lg font-medium border-gray-300 dark:border-gray-700">
              See Market Trends
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="p-3">
          <div className="flex items-center justify-between p-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white h-8 w-8 rounded-md flex items-center justify-center font-bold">VP</div>
              <div className="text-sm font-medium">Visionary Plans</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">PRO features</span>
              <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Beautiful Templates</span>
            </div>
          </div>
          <img 
            src="/public/lovable-uploads/e20aeebb-024f-448e-a3eb-571d1e87ea3a.png" 
            alt="Platform Demo" 
            className="rounded-lg w-full object-cover h-[300px] md:h-[400px] opacity-0"
            onError={(e) => {
              // Fallback image if the uploaded one fails to load
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.classList.remove("opacity-0");
            }}
            onLoad={(e) => {
              e.currentTarget.classList.remove("opacity-0");
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NewHero;
