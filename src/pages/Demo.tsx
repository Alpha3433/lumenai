
import React from 'react';
import { 
  CheckCircle, Sparkles, Lightbulb, BarChart3, Search, 
  Users, MessageSquare, FileText, PencilRuler, LineChart, 
  LayoutDashboard, Award, ArrowLeft
} from 'lucide-react';
import Footer from '@/components/Footer';
import DemoHeader from '@/components/demo/DemoHeader';
import DemoHero from '@/components/demo/DemoHero';
import DemoNavigation from '@/components/demo/DemoNavigation';
import StepDisplay from '@/components/demo/StepDisplay';
import BusinessIdeaStep from '@/components/demo/BusinessIdeaStep';
import DemoCTA from '@/components/demo/DemoCTA';
import { DemoStep } from '@/components/demo/types';

const Demo = () => {
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
      <DemoHeader />
      
      {/* Hero Section */}
      <DemoHero />

      {/* Navigation Dots */}
      <DemoNavigation steps={steps} />

      {/* Steps Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Special handling for first step with Business Idea Generator */}
        <BusinessIdeaStep step={steps[0]} />
        
        {/* Render remaining steps */}
        {steps.slice(1).map((step, index) => (
          <StepDisplay 
            key={step.id}
            step={step}
            index={index + 1}
            isFirstStep={false}
          />
        ))}
      </div>

      {/* CTA Section */}
      <DemoCTA />
      
      <Footer />
    </div>
  );
};

export default Demo;
