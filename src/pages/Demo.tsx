
import React, { useEffect } from 'react';
import { 
  CheckCircle, Sparkles, Lightbulb, BarChart3, Search, 
  Users, MessageSquare, FileText, PencilRuler, LineChart, 
  LayoutDashboard, Award, ArrowLeft, Dumbbell, Rocket, CircleDollarSign
} from 'lucide-react';
import Footer from '@/components/Footer';
import DemoHeader from '@/components/demo/DemoHeader';
import DemoHero from '@/components/demo/DemoHero';
import DemoNavigation from '@/components/demo/DemoNavigation';
import BusinessIdeaStep from '@/components/demo/BusinessIdeaStep';
import BusinessValidationStep from '@/components/demo/BusinessValidationStep';
import SwotAnalysisStep from '@/components/demo/SwotAnalysisStep';
import ToolsShowcaseStep from '@/components/demo/ToolsShowcaseStep';
import MonetizationStrategyStep from '@/components/demo/MonetizationStrategyStep';
import SocialInsightsStep from '@/components/demo/SocialInsightsStep';
import DashboardStep from '@/components/demo/DashboardStep';
import ValidationDashboardStep from '@/components/demo/ValidationDashboardStep';
import DemoCTA from '@/components/demo/DemoCTA';
import WhyFoundersChooseSection from '@/components/demo/WhyFoundersChooseSection';
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
      description: "Based on your idea, we generate a comprehensive validation score with detailed strengths and improvement areas to help you understand your business's viability.",
      image: "public/lovable-uploads/840decb2-8cc3-44d0-ba0c-a2c75168d6b5.png",
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
      id: "monetization",
      title: "Monetization Strategy & Pricing",
      description: "Our team works with you to define the right pricing model: freemium, subscription, usage-based, or pay-per-result — based on benchmarks in your category.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: CircleDollarSign,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "analyze",
      title: "Go-to-Market Execution Support",
      description: "Get comprehensive launch support with customized go-to-market strategies, market entry planning, and execution guidance — all tailored to your product and target audience.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Rocket,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "dashboard",
      title: "Launch Strategy Session",
      description: "Book a 1:1 deep-dive with our lead strategist. We'll walk you through validation results, key risks, and help you define a 30-day execution roadmap post-launch.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: LayoutDashboard,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "score",
      title: "Advert Hub",
      description: "Lumen AI takes the guesswork out of marketing by automatically generating high-converting ad creatives tailored to your audience and niche. From visuals to headlines, you'll get multiple variations designed for platforms like Facebook, Instagram, TikTok, and LinkedIn — all optimized for engagement.",
      image: "public/lovable-uploads/b6443082-5a1e-4901-8a11-84ab51d1db54.png",
      icon: Award,
      color: "from-amber-500 to-amber-600"
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <DemoHeader />
      
      {/* Hero Section */}
      <DemoHero />

      {/* Modern Navigation */}
      <DemoNavigation steps={steps} />

      {/* Steps Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Business Idea Generator - Step 1 */}
        <BusinessIdeaStep step={steps[0]} />
        
        {/* Business Validation - Step 2 */}
        <BusinessValidationStep step={steps[1]} />
        
        {/* SWOT Analysis - Step 3 */}
        <SwotAnalysisStep step={steps[2]} />
        
        {/* Landing Page Builder - Step 4 */}
        <ToolsShowcaseStep step={steps[3]} />
        
        {/* Monetization Strategy - Step 5 (replacing User Interviews) */}
        <MonetizationStrategyStep step={steps[4]} />
        
        {/* Social Insights - Step 6 */}
        <SocialInsightsStep step={steps[5]} />
        
        {/* Dashboard - Step 7 */}
        <DashboardStep step={steps[6]} />
        
        {/* Validation Dashboard with Social Media - Step 8 */}
        <ValidationDashboardStep step={steps[7]} />
      </div>

      {/* Why Founders Choose Section - Added before CTA */}
      <WhyFoundersChooseSection />

      {/* CTA Section */}
      <DemoCTA />
      
      <Footer />
    </div>
  );
};

export default Demo;
