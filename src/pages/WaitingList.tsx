
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import HeroSection from '@/components/waiting-list/HeroSection';
import ValidationInsights from '@/components/waiting-list/ValidationInsights';
import FooterCTA from '@/components/waiting-list/FooterCTA';
import Footer from '@/components/Footer';

const WaitingList = () => {
  return (
    <div className="bg-white">
      <WaitingListHeader />
      <main className="flex flex-col w-full">
        <HeroSection />
        <ValidationInsights />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default WaitingList;
