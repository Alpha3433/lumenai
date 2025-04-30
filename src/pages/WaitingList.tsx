
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import HeroSection from '@/components/waiting-list/HeroSection';
import WhyStartupsFail from '@/components/waiting-list/WhyStartupsFail';
import SolutionSteps from '@/components/waiting-list/SolutionSteps';
import AutomationSection from '@/components/waiting-list/AutomationSection';
import FeaturesSection from '@/components/waiting-list/FeaturesSection';
import WhoItsForSection from '@/components/waiting-list/WhoItsForSection';
import FAQSection from '@/components/waiting-list/FAQSection';
import TestimonialsSection from '@/components/waiting-list/TestimonialsSection';
import FooterCTA from '@/components/waiting-list/FooterCTA';
import Footer from '@/components/Footer';

const WaitingList = () => {
  return (
    <div className="bg-white min-h-screen">
      <WaitingListHeader />
      <main className="flex flex-col w-full">
        <HeroSection />
        <WhyStartupsFail />
        <SolutionSteps />
        <FeaturesSection />
        <AutomationSection />
        <WhoItsForSection />
        <TestimonialsSection />
        <FAQSection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WaitingList;
