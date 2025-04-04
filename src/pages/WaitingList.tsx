
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import ContentColumn from '@/components/waiting-list/ContentColumn';
import VideoColumn from '@/components/waiting-list/VideoColumn';

const WaitingList = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <WaitingListHeader />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12 overflow-hidden">
        <ContentColumn />
        <VideoColumn />
      </main>
    </div>
  );
};

export default WaitingList;
