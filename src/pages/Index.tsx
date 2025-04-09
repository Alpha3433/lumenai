
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewHero from '@/components/home/NewHero';
import ToolsShowcase from '@/components/home/ToolsShowcase';
import ThreeColumnFeatures from '@/components/home/ThreeColumnFeatures';
import TransformSection from '@/components/home/TransformSection';
import RoadmapSection from '@/components/home/RoadmapSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BuildProductsSection from '@/components/home/BuildProductsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQAccordion from '@/components/home/FAQAccordion';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NewHero />
      <ToolsShowcase />
      <ThreeColumnFeatures />
      <HowItWorksSection />
      <TransformSection />
      <RoadmapSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQAccordion />
      <BuildProductsSection />
      <Footer />
    </div>
  );
};

export default Index;
