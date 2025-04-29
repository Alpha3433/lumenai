
import React from 'react';
import { motion } from 'framer-motion';
import FailureStatistics from './failures/FailureStatistics';
import IdeaGeneratorCard from './idea-generator/IdeaGeneratorCard';
import { AlertTriangle, CheckCircle, Zap, TrendingUp, TrendingDown } from 'lucide-react';

const WhyStartupsFail: React.FC = () => {
  const failureReasons = [
    { reason: "No Market Need", percentage: 42 },
    { reason: "Ran Out of Cash", percentage: 29 },
    { reason: "Wrong Team", percentage: 23 },
    { reason: "Get Outcompeted", percentage: 19 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-6 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
            <h3 className="text-red-600 dark:text-red-400 text-sm font-semibold tracking-wide">STARTUP RISKS</h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Why Most Ideas <span className="text-red-500 dark:text-red-400">Fail</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            42% of startups fail due to no market need. Don't let your idea become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className="space-y-6">
            <FailureStatistics failureReasons={failureReasons} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Our Validation Solutions
              </h3>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Test your idea with real customers before investing heavily</p>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Identify your product's unique market advantages</p>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Discover potential obstacles before they become expensive problems</p>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Avoid wasting resources on products without market demand</p>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <IdeaGeneratorCard />
            
            {/* Background decoration elements */}
            <motion.div 
              className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-400/5 dark:bg-blue-400/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute -z-10 bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-purple-400/5 dark:bg-purple-400/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
