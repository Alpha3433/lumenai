
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Describe your idea",
    description: "Tell us about your startup idea in simple terms. No technical jargon required."
  },
  {
    number: 2,
    title: "Let AI analyze competition",
    description: "Our AI researches competitors, market size, and potential challenges."
  },
  {
    number: 3,
    title: "Get a full report",
    description: "Receive a comprehensive analysis with actionable insights and recommendations."
  },
  {
    number: 4,
    title: "See if people actually want it",
    description: "Test demand with real market validation before investing time in development."
  },
  {
    number: 5,
    title: "Implementation roadmap",
    description: "Get a step-by-step plan for bringing your validated idea to market."
  },
  {
    number: 6,
    title: "Ongoing AI-powered insights",
    description: "Continuously monitor market trends and receive updated recommendations."
  }
];

const SolutionSteps = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Solution — Here's How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform validates your startup idea in minutes, not months
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-12">
            {steps.slice(0, 3).map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-12">
            {steps.slice(3).map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 max-w-lg w-full"
          >
            <div className="mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <code>
                {`// Validation in progress...
const marketAnalysis = await AI.analyze({
  idea: "Food delivery for pets",
  location: "United States",
  targetAudience: "Pet owners"
});

// Results:
{
  marketSize: "$24.3 billion",
  competitorCount: 8,
  validationScore: 82,
  recommendation: "PROCEED WITH CAUTION"
}`}
              </code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSteps;
