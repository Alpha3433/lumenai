
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import HeroSection from '@/components/waiting-list/HeroSection';
import WhyStartupsFail from '@/components/waiting-list/WhyStartupsFail';
import SolutionSteps from '@/components/waiting-list/SolutionSteps';
import AutomationSection from '@/components/waiting-list/AutomationSection';
import FeaturesSection from '@/components/waiting-list/FeaturesSection';
import WhoItsForSection from '@/components/waiting-list/WhoItsForSection';
import ValidationMattersSection from '@/components/waiting-list/ValidationMattersSection';
import RoadmapSection from '@/components/waiting-list/RoadmapSection';
import FAQSection from '@/components/waiting-list/FAQSection';
import FooterCTA from '@/components/waiting-list/FooterCTA';
import Footer from '@/components/Footer';

const WaitingList = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <WaitingListHeader />
      <main className="flex flex-col w-full">
        <HeroSection />
        <WhyStartupsFail />
        <SolutionSteps />
        <FeaturesSection />
        <AutomationSection />
        <WhoItsForSection />
        <ValidationMattersSection />
        <RoadmapSection />
        <FAQSection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WaitingList;
