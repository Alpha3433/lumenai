import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Sparkles, Lightbulb, BarChart3, Search, 
  Users, MessageSquare, FileText, PencilRuler, LineChart, 
  LayoutDashboard, Award, ArrowLeft
} from 'lucide-react';
import BusinessIdeaGenerator from '@/components/market/BusinessIdeaGenerator';

// Define step data structure
interface DemoStep {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
}

const Demo = () => {
  const navigate = useNavigate();
  
  // Demo steps data
  const steps: DemoStep[] = [
    {
      id: "describe",
      title: "Describe Your Idea",
      description: "Enter your business concept and let our AI analyze its potential. We'll guide you through the validation process with intelligent prompts designed to extract key information.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Lightbulb,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "explore",
      title: "Get a Tailored Plan",
      description: "Based on your idea, we generate a comprehensive business plan with market analysis, competitor insights, and financial projections that help clarify your path forward.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: FileText,
      color: "from-green-500 to-green-600"
    },
    {
      id: "discover",
      title: "Discover Market Needs",
      description: "Our AI scans billions of data points to identify market gaps and potential customers. Understand who will pay for your solution and how large your audience could be.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Search,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "build",
      title: "Auto-Build Your Landing Page",
      description: "Test market interest with an AI-generated landing page designed to convert visitors into early sign-ups. Collect valuable feedback before investing in development.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: PencilRuler,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "community",
      title: "Community & User Interviews",
      description: "Connect with potential customers through our built-in tools. Schedule interviews, gather feedback, and identify your early adopters who can become brand advocates.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Users,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "analyze",
      title: "Social & AI Insights",
      description: "Leverage AI-powered social listening to understand conversations around your product category. Get actionable insights about trends, pain points, and competitive landscape.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: MessageSquare,
      color: "from-red-500 to-red-600"
    },
    {
      id: "dashboard",
      title: "Validation Dashboard",
      description: "Monitor key validation metrics in real-time. Track landing page conversion rates, customer interview sentiments, and market signals all in one intuitive dashboard.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: LayoutDashboard,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "score",
      title: "Final Validation Score",
      description: "Receive a comprehensive validation score that indicates your idea's readiness for investment. Get specific recommendations for improving weak areas of your business model.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Award,
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <WaitingListHeader />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Interactive Demo
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              How Lumen AI Works
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-10"
          >
            Follow our guided tour to see how Lumen AI transforms your startup idea into a validated, 
            market-ready business concept in 8 simple steps.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={() => navigate('/#waitlist')} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg"
            >
              Join Waitlist to Get Early Access
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Navigation Dots */}
      <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col items-center gap-4 z-40">
        {steps.map((step, index) => (
          <a 
            key={step.id} 
            href={`#${step.id}`}
            className="group flex items-center gap-2"
          >
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {step.title}
            </span>
            <div 
              className={`w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gradient-to-r ${step.color} transition-all duration-300`} 
            />
          </a>
        ))}
      </div>

      {/* Steps Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Special handling for first step with Business Idea Generator */}
        <section 
          id={steps[0].id}
          className="py-20 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Generate Business Ideas
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                Generate innovative business ideas based on your interests or current market trends.
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row items-start gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${steps[0].color} text-white`}>
                    <steps[0].icon className="h-5 w-5" />
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                    Step 1
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  {steps[0].title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  {steps[0].description}
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mb-4">
                  <CheckCircle className="h-4 w-4" />
                  No technical skills required
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mt-6">
                  Not sure what business to start? Try our Business Idea Generator to discover promising opportunities based on current market trends and your interests.
                </p>
                
                <Button 
                  variant="outline" 
                  className="mt-6 flex items-center gap-2"
                  onClick={() => {
                    const element = document.getElementById('business-idea-generator');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Try the Idea Generator
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
                id="business-idea-generator"
              >
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6">
                  <BusinessIdeaGenerator />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Render remaining steps */}
        {steps.slice(1).map((step, index) => (
          <section 
            id={step.id}
            key={step.id}
            className={`py-20 border-b border-gray-200 dark:border-gray-800 ${index % 2 === 0 ? 'bg-white/50 dark:bg-gray-800/20' : ''}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
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
                      Step {index + 2}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    {step.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {index === 0 && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Complete in minutes, not weeks
                      </div>
                    )}
                    {index === 1 && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Save thousands on market research
                      </div>
                    )}
                    {index === 2 && (
                      <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        No design experience needed
                      </div>
                    )}
                    {index === 3 && (
                      <div className="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Built-in scheduling tools
                      </div>
                    )}
                    {index === 4 && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Real-time social analysis
                      </div>
                    )}
                    {index === 5 && (
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Comprehensive analytics
                      </div>
                    )}
                    {index === 6 && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Investor-ready reports
                      </div>
                    )}
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
                    <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-900">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 md:p-12">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Early Access
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to validate your startup idea?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-300 mb-10 text-lg"
              >
                Join our waitlist today and be the first to access Lumen AI's powerful startup validation platform.
                Early members receive exclusive benefits and priority access.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button 
                  onClick={() => navigate('/')} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg"
                >
                  Join Waitlist Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Demo;
