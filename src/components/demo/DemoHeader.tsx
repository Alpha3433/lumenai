
import React from 'react';
import WaitingListHeader from '@/components/waiting-list/WaitingListHeader';

const DemoHeader: React.FC = () => {
  // Using the WaitingListHeader component directly ensures
  // consistent dark mode styling across the site
  return <WaitingListHeader />;
};

export default DemoHeader;
