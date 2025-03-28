
import React from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, HelpCircle, Moon, EyeOff } from 'lucide-react';
import { getRandomAvatarIcon } from '@/utils/avatarUtils';

const Settings: React.FC = () => {
  const { user, subscriptionPlan } = useAuth();
  const AvatarIcon = user ? getRandomAvatarIcon(user.email || 'user') : User;

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
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 bg-gray-200 flex items-center justify-center text-gray-700">
                    <AvatarIcon size={36} />
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-medium">{user.email?.split('@')[0]}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="mt-1">
                      <Badge variant="outline" className={
                        subscriptionPlan === 'entrepreneur' 
                          ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                          : subscriptionPlan === 'strategist'
                            ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
                            : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                      }>
                        {subscriptionPlan === 'entrepreneur' 
                          ? 'Entrepreneur Plan' 
                          : subscriptionPlan === 'strategist' 
                            ? 'Strategist Plan' 
                            : 'Free Plan'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue={user.email?.split('@')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} disabled />
                  </div>
                </div>
                
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Current Plan</h4>
                      <p className="text-muted-foreground text-sm">
                        {subscriptionPlan === 'entrepreneur' 
                          ? 'Entrepreneur Plan' 
                          : subscriptionPlan === 'strategist' 
                            ? 'Strategist Plan' 
                            : 'Free Plan'}
                      </p>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <Switch id="dark-mode" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-privacy">Data Privacy</Label>
                      <p className="text-sm text-muted-foreground">Control how your data is used and shared</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                      <Switch id="data-privacy" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    <p className="font-medium">How do I create a new business plan?</p>
                    <p className="text-muted-foreground">Navigate to the Create page and follow the step-by-step guide to create your business plan.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">How can I export my business plan?</p>
                    <p className="text-muted-foreground">Once your plan is complete, use the export button on the dashboard to download it in PDF format.</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Contact Support</h3>
                    <p className="text-muted-foreground mb-4">Need more help? Our support team is here for you.</p>
                    <Button variant="outline">Contact Support</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
