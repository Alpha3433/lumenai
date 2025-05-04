
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Megaphone, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { DemoStep } from './types';

interface SocialInsightsStepProps {
  step: DemoStep;
}

const SocialInsightsStep: React.FC<SocialInsightsStepProps> = ({ step }) => {
  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step 6
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              Go-to-Market Execution Support
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Get comprehensive launch support with customized go-to-market strategies, market entry planning, and execution guidance — all tailored to your product and target audience.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Market entry strategy
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Launch playbook
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mt-2">
                <CheckCircle className="h-4 w-4" />
                Growth hacking tactics
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Go-to-Market Strategy for FitnessAI</h3>
                <p className="text-blue-100">Launch execution plan with timeline</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3">
                        <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-medium mb-1">Market Entry</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Targeted audience acquisition</p>
                      <div className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-xs text-left">
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                          <li>Fitness enthusiast segmentation</li>
                          <li>Gym partnerships (24 locations)</li>
                          <li>3 fitness influencer campaigns</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3">
                        <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-medium mb-1">Launch Campaign</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Multi-channel promotion</p>
                      <div className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-xs text-left">
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                          <li>60-day social media rollout</li>
                          <li>Fitness podcast sponsorships</li>
                          <li>Early access discount program</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3">
                        <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-medium mb-1">Growth Tactics</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">User acquisition & retention</p>
                      <div className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-xs text-left">
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                          <li>Referral reward system (+15% conversion)</li>
                          <li>Community challenges</li>
                          <li>Results-sharing incentives</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate FitnessAI GTM Strategy</Button>
                </div>
                
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-medium mb-3">90-Day Launch Timeline</h4>
                  <div className="relative pb-2">
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-lg">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">1-30</span>
                        </div>
                        <div className="pt-1">
                          <h5 className="font-medium">Pre-launch Phase</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Beta testing with 200 fitness enthusiasts, collecting testimonials, refining AI algorithm accuracy</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-lg">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">31-60</span>
                        </div>
                        <div className="pt-1">
                          <h5 className="font-medium">Launch Phase</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Official release, influencer program activation, limited-time founding member pricing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-lg">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">61-90</span>
                        </div>
                        <div className="pt-1">
                          <h5 className="font-medium">Growth Phase</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Feature enhancement based on user data, referral program activation, fitness community partnerships</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <blockquote className="text-sm text-gray-500 dark:text-gray-400 italic">
                      "The Go-to-Market strategy completely transformed our launch. We gained 12,000+ users in the first 90 days, and our retention rate is nearly double the industry average."
                    </blockquote>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">MJ</div>
                      <div>
                        <p className="text-sm font-medium">Mike Johnson</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">FitnessAI Co-founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialInsightsStep;
