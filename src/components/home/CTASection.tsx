
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/80 dark:to-blue-950/10"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-white to-blue-50/90 dark:from-gray-900 dark:to-blue-950/60 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-12 text-center shadow-xl backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to stop guessing and start building?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your first AI-powered business plan in minutes and increase your chances of success by 3x
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md h-12 px-8 text-base font-medium">
                Try for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/examples">
              <Button variant="outline" className="rounded-md h-12 px-8 text-base font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                See Real Business Plans
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              <span className="text-sm">Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              <span className="text-sm">2 free reports per month</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
