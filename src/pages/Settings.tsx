
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import ManageSubscriptionDialog from '@/components/subscription/ManageSubscriptionDialog';
import SettingsTabs from '@/components/settings/SettingsTabs';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  
  // Listen for the custom event to open the subscription dialog
  useEffect(() => {
    const handleOpenSubscriptionDialog = () => {
      setIsSubscriptionDialogOpen(true);
    };
    
    window.addEventListener('open-subscription-dialog', handleOpenSubscriptionDialog);
    
    return () => {
      window.removeEventListener('open-subscription-dialog', handleOpenSubscriptionDialog);
    };
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Navbar />
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold">Please sign in to access settings</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <div className="mt-24 mb-16">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <SettingsTabs />
      </div>

      <ManageSubscriptionDialog 
        isOpen={isSubscriptionDialogOpen}
        onClose={() => setIsSubscriptionDialogOpen(false)}
      />
    </div>
  );
};

export default Settings;
