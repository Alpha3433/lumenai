
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import HeroSection from '@/components/waiting-list/HeroSection';
import WhyStartupsFail from '@/components/waiting-list/WhyStartupsFail';
import SolutionSteps from '@/components/waiting-list/SolutionSteps';
import AutomationSection from '@/components/waiting-list/AutomationSection';
import FeaturesSection from '@/components/waiting-list/FeaturesSection';
import ValidationMattersSection from '@/components/waiting-list/ValidationMattersSection';
import TestimonialsSection from '@/components/waiting-list/TestimonialsSection';
import FAQSection from '@/components/waiting-list/FAQSection';
import FooterCTA from '@/components/waiting-list/FooterCTA';
import Footer from '@/components/Footer';

const WaitingList = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <WaitingListHeader />
      
      <main className="flex flex-col w-full">
        <HeroSection />
        <WhyStartupsFail />
        <SolutionSteps />
        <AutomationSection />
        <FeaturesSection />
        <ValidationMattersSection />
        <TestimonialsSection />
        <FAQSection />
        <FooterCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default WaitingList;
