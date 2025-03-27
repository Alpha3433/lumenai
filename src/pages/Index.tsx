
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewHero from '@/components/home/NewHero';
import ToolsShowcase from '@/components/home/ToolsShowcase';
import ThreeColumnFeatures from '@/components/home/ThreeColumnFeatures';
import TransformSection from '@/components/home/TransformSection';
import RoadmapSection from '@/components/home/RoadmapSection';
import MobileShowcase from '@/components/home/MobileShowcase';
import BuildProductsSection from '@/components/home/BuildProductsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQAccordion from '@/components/home/FAQAccordion';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NewHero />
      <ToolsShowcase />
      <ThreeColumnFeatures />
      <TransformSection />
      <RoadmapSection />
      <MobileShowcase />
      <PricingSection />
      <BuildProductsSection />
      <FAQAccordion />
      <Footer />
    </div>
  );
};

export default Index;
