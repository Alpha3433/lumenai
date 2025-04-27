
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import HeroSection from '@/components/waiting-list/HeroSection';
import WhyStartupsFail from '@/components/waiting-list/WhyStartupsFail';
import SolutionSteps from '@/components/waiting-list/SolutionSteps';
import AutomationSection from '@/components/waiting-list/AutomationSection';
import ValidationInsights from '@/components/waiting-list/ValidationInsights';
import FooterCTA from '@/components/waiting-list/FooterCTA';
import Footer from '@/components/Footer';

const WaitingList = () => {
  return (
    <div className="bg-white">
      <WaitingListHeader />
      <main className="flex flex-col w-full">
        <HeroSection />
        <WhyStartupsFail />
        <SolutionSteps />
        <AutomationSection />
        <ValidationInsights />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WaitingList;
