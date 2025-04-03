
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import ContentColumn from '@/components/waiting-list/ContentColumn';
import VideoColumn from '@/components/waiting-list/VideoColumn';

const WaitingList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <WaitingListHeader />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12 md:gap-20">
        <ContentColumn />
        <VideoColumn />
      </main>
    </div>
  );
};

export default WaitingList;
