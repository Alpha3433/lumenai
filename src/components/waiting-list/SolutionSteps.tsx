import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
  return <section className="py-20 px-4 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Solution — How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform guides you through a proven validation process to test your startup idea before you invest
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-12">
            {steps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>)}
          </div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="bg-gray-900 rounded-xl overflow-hidden shadow-xl my-[208px] py-0">
            <div className="p-4 bg-gray-800 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 text-emerald-400 font-mono text-sm">
              <p className="mb-2"><span className="text-pink-400">const</span> <span className="text-blue-400">validateIdea</span> = <span className="text-pink-400">async</span> (idea) =&gt; {'{'}</p>
              <p className="mb-2 pl-4"><span className="text-blue-400">const</span> targetAudience = <span className="text-pink-400">await</span> identifyAudience(idea);</p>
              <p className="mb-2 pl-4"><span className="text-blue-400">const</span> marketSize = <span className="text-pink-400">await</span> calculateTAM(idea.industry);</p>
              <p className="mb-2 pl-4"><span className="text-blue-400">const</span> competitors = <span className="text-pink-400">await</span> findCompetitors(idea.keywords);</p>
              <p className="mb-2 pl-4"><span className="text-blue-400">const</span> validationScore = analyzeData(targetAudience, marketSize, competitors);</p>
              <p className="mb-4 pl-4"><span className="text-pink-400">return</span> {'{'} score: validationScore, insights: [...] {'}'};</p>
              <p>{'}'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default SolutionSteps;
