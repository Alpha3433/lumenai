
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, HelpCircle } from 'lucide-react';
import ProfileTab from './ProfileTab';
import NotificationsTab from './NotificationsTab';
import PrivacyTab from './PrivacyTab';
import HelpTab from './HelpTab';

const SettingsTabs: React.FC = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Privacy</span>
        </TabsTrigger>
        <TabsTrigger value="help" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>Help</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
      
      <TabsContent value="help">
        <HelpTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
