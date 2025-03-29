
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewHero from '@/components/home/NewHero';
import ToolsShowcase from '@/components/home/ToolsShowcase';
import ThreeColumnFeatures from '@/components/home/ThreeColumnFeatures';
import TransformSection from '@/components/home/TransformSection';
import RoadmapSection from '@/components/home/RoadmapSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQAccordion from '@/components/home/FAQAccordion';
import CTASection from '@/components/home/CTASection';
import AnalysisToolsSection from '@/components/home/AnalysisToolsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NewHero />
      <ToolsShowcase />
      <ThreeColumnFeatures />
      <TransformSection />
      <RoadmapSection />
      <PricingSection />
      <TestimonialsSection />
      <AnalysisToolsSection />
      <FAQAccordion />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
