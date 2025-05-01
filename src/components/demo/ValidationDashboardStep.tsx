import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart3, Users, Trophy, TrendingUp, Facebook, Instagram, ArrowRight, CheckCircle, Zap, Target, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DemoStep } from './types';
interface ValidationDashboardStepProps {
  step: DemoStep;
}
const ValidationDashboardStep: React.FC<ValidationDashboardStepProps> = ({
  step
}) => {
  return <section id={step.id} className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">Step 8</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Real campaign testing
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Audience validation
              </div>
            </div>
            
            <Button className="bg-amber-600 hover:bg-amber-700">
              Test My Validation
            </Button>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="lg:w-2/3 space-y-6">
            {/* Social Media Validation Dashboard */}
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  Social Media Validation Dashboard
                </h3>
                <p className="text-gray-300 text-sm">
                  Real-world testing with FitnessAI sample campaigns
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-5">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Overall Score</div>
                      <div className="text-2xl font-bold text-amber-500">85</div>
                    </div>
                    <Progress value={85} className="h-2" indicatorClassName="bg-amber-500" />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Audience Match</div>
                      <div className="text-2xl font-bold text-green-500">92%</div>
                    </div>
                    <Progress value={92} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Market Readiness</div>
                      <div className="text-2xl font-bold text-blue-500">78%</div>
                    </div>
                    <Progress value={78} className="h-2" indicatorClassName="bg-blue-500" />
                  </div>
                </div>
                
                {/* Ad Campaigns */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Facebook Campaign */}
                  <Card className="overflow-hidden border-0 shadow-md">
                    <div className="bg-[#1877F2] text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-5 w-5" />
                        <span className="font-semibold">Facebook Campaign</span>
                      </div>
                      <span className="bg-white/20 text-xs px-2 py-0.5 rounded">7 days</span>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="aspect-w-4 aspect-h-5 mb-4">
                        <img alt="FitnessAI Facebook Ad" className="rounded-md object-cover w-full h-full" src="/lovable-uploads/a9d38708-e3d0-4ea5-b3d9-47b115dce012.png" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Click-Through Rate</div>
                          <div className="font-semibold flex items-center">
                            3.8% <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                          <div className="font-semibold flex items-center">
                            2.6% <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Impressions</div>
                          <div className="font-semibold">15,472</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Sign-ups</div>
                          <div className="font-semibold">156</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-1">Audience Demographics</div>
                      <div className="h-4 w-full flex rounded-full overflow-hidden mb-1">
                        <div className="bg-blue-500 h-full" style={{
                        width: '42%'
                      }}></div>
                        <div className="bg-pink-500 h-full" style={{
                        width: '58%'
                      }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div>Male: 42%</div>
                        <div>Female: 58%</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Instagram Campaign */}
                  <Card className="overflow-hidden border-0 shadow-md">
                    <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5" />
                        <span className="font-semibold">Instagram Campaign</span>
                      </div>
                      <span className="bg-white/20 text-xs px-2 py-0.5 rounded">7 days</span>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="aspect-w-4 aspect-h-5 mb-4">
                        <img alt="FitnessAI Instagram Ad" className="rounded-md object-cover w-full h-full" src="/lovable-uploads/c8feccf9-8000-42b0-a048-d3fc9dd226e9.png" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Click-Through Rate</div>
                          <div className="font-semibold flex items-center">
                            4.2% <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                          <div className="font-semibold flex items-center">
                            2.9% <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Impressions</div>
                          <div className="font-semibold">18,372</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Sign-ups</div>
                          <div className="font-semibold">187</div>
                        </div>
                      </div>
                      
                      {/* Expanded Age Demographics section */}
                      <div className="text-xs text-gray-500 mb-1">Age Demographics</div>
                      <div className="grid grid-cols-4 gap-1 mb-1">
                        <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{
                          width: '25%'
                        }}></div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{
                          width: '45%'
                        }}></div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{
                          width: '85%'
                        }}></div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{
                          width: '35%'
                        }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mb-4">
                        <div>18-24</div>
                        <div>25-34</div>
                        <div>35-44</div>
                        <div>45+</div>
                      </div>
                      
                      {/* Additional Instagram metrics */}
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-3.5 w-3.5 text-amber-500" />
                              <div className="text-xs font-medium">Engagement Rate</div>
                            </div>
                            <div className="text-lg font-semibold">6.8%</div>
                            <div className="text-xs text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" /> +1.2% from last week
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="h-3.5 w-3.5 text-blue-500" />
                              <div className="text-xs font-medium">Reach</div>
                            </div>
                            <div className="text-lg font-semibold">28,450</div>
                            <div className="text-xs text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" /> +4.5% from last week
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="h-3.5 w-3.5 text-purple-500" />
                              <div className="text-xs font-medium">Cost per Acquisition</div>
                            </div>
                            <div className="text-lg font-semibold">$4.28</div>
                            <div className="text-xs text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" /> -0.75$ from last week
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-3.5 w-3.5 text-teal-500" />
                              <div className="text-xs font-medium">New Followers</div>
                            </div>
                            <div className="text-lg font-semibold">247</div>
                            <div className="text-xs text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" /> +18% from last week
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/80 p-5 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Key finding</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      Strong interest in personalized workout features among 35-44 age group.
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    View Full Report <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Additional Feature Preview - Third App Screen */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.4
          }} viewport={{
            once: true
          }} className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ValidationDashboardStep;