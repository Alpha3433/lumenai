
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';
import ContentColumn from '@/components/waiting-list/ContentColumn';
import VideoColumn from '@/components/waiting-list/VideoColumn';

const WaitingList = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <WaitingListHeader />
      
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4 md:p-6 overflow-hidden">
        <ContentColumn />
        <VideoColumn />
      </main>
    </div>
  );
};

export default WaitingList;
