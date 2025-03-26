
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CoreFeaturesSection from '@/components/home/CoreFeaturesSection';
import AnalysisToolsSection from '@/components/home/AnalysisToolsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CoreFeaturesSection />
      <AnalysisToolsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
