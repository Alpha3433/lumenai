
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import ContentColumn from '@/components/waiting-list/ContentColumn';
import VideoColumn from '@/components/waiting-list/VideoColumn';
import ParallaxBackground from '@/components/waiting-list/ParallaxBackground';
import ToolsShowcase from '@/components/waiting-list/ToolsShowcase';

const WaitingList = () => {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col relative">
      <ParallaxBackground />
      <WaitingListHeader />

      <main className="flex-1 flex flex-col relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12">
          <ContentColumn />
          <VideoColumn />
        </div>
        
        <ToolsShowcase />
      </main>
    </div>
  );
};

export default WaitingList;
