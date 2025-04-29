
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Code, ArrowRight } from 'lucide-react';

/**
 * Steps data defining the validation process
 * Each step contains a number, title, and detailed description
 */
const steps = [{
  number: 1,
  title: "Define your idea",
  description: "Clearly articulate your startup concept, target audience, and the problem you're solving."
}, {
  number: 2,
  title: "Get a detailed validation plan",
  description: "Receive a customized roadmap for validating your specific idea with data-driven methods."
}, {
  number: 3,
  title: "Start a testing phase",
  description: "Deploy lightweight experiments to test your core assumptions with real users."
}, {
  number: 4,
  title: "Talk to Product Owners & Early Adopters",
  description: "Connect with potential customers to gather insights and validate demand."
}, {
  number: 5,
  title: "Collect real feedback from social media",
  description: "Leverage targeted platforms to gauge interest and gather unbiased opinions."
}, {
  number: 6,
  title: "Analyze detailed feedback from customers",
  description: "Identify patterns and insights from user feedback to refine your concept."
}, {
  number: 7,
  title: "Revise your idea based on feedback",
  description: "Iterate on your concept based on validation data to improve product-market fit."
}];

/**
 * SolutionSteps Component
 * 
 * Displays a sequential breakdown of the business validation process with
 * animated step-by-step instructions and a complementary code visualization.
 * 
 * Features:
 * - Animated content reveal on scroll
 * - Responsive two-column layout
 * - Interactive code example demonstrating the validation process
 * - Visual step progression with numbering
 */
const SolutionSteps = () => {
  const codeLines = [
    { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
    { code: "<span class='text-blue-400'>  const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea);", delay: 0.4 },
    { code: "<span class='text-blue-400'>  const</span> marketSize = <span class='text-pink-400'>await</span> calculateTAM(idea.industry);", delay: 0.8 },
    { code: "<span class='text-blue-400'>  const</span> competitors = <span class='text-pink-400'>await</span> findCompetitors(idea.keywords);", delay: 1.2 },
    { code: "<span class='text-blue-400'>  const</span> validationScore = analyzeData(targetAudience, marketSize, competitors);", delay: 1.6 },
    { code: "  <span class='text-pink-400'>return</span> { score: validationScore, insights: [...] };", delay: 2.0 },
    { code: "}", delay: 2.4 }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-6 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">OUR PROCESS</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            The Solution — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">How It Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Our platform guides you through a proven validation process to test your startup idea before you invest
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={childVariants}
                className="flex gap-5 group"
              >
                <div className="relative flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md"
                    whileInView={{ 
                      scale: [1, 1.2, 1],
                      transition: { delay: index * 0.1, duration: 0.5 }
                    }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 bottom-0 w-0.5 h-[calc(100%-20px)] -translate-x-1/2 bg-gradient-to-b from-purple-200 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30"></div>
                  )}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10"
            >
              <div className="p-4 bg-gray-800 flex gap-2 items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center ml-4 text-gray-400 text-xs font-mono">
                  <Code className="h-4 w-4 mr-1.5" /> validation.js
                </div>
              </div>
              <div className="p-8 font-mono text-sm relative overflow-hidden">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: line.delay / 8, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-3 text-gray-100"
                    dangerouslySetInnerHTML={{ __html: line.code }}
                  />
                ))}
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
                
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-blue-500/20 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut" 
                  }}
                ></motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-5 py-3 shadow-xl flex items-center gap-2 text-white"
            >
              <span className="text-sm font-semibold">AI-Validated Results</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            
            <motion.div
              className="absolute -z-10 w-full h-full rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-3xl -bottom-1/4 right-1/4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSteps;
