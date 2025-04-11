
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { 
  User, 
  Bell, 
  Mail, 
  CreditCard, 
  Wallet, 
  Calendar, 
  Moon, 
  Sun, 
  Globe, 
  Laptop, 
  MailWarning,
  MessageSquare,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function Settings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Profile state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [company, setCompany] = useState('');
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  
  // Preferences state
  const [timezone, setTimezone] = useState('UTC');
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      // Initialize form with user data
      setEmail(user.email || '');
      
      // You could fetch additional profile data from your database here
      // const fetchUserProfile = async () => {
      //   const { data, error } = await supabase
      //     .from('profiles')
      //     .select('*')
      //     .eq('id', user.id)
      //     .single();
      //   
      //   if (data && !error) {
      //     setFullName(data.full_name || '');
      //     setUsername(data.username || '');
      //     setCompany(data.company || '');
      //   }
      // };
      // 
      // fetchUserProfile();
    }
  }, [user, loading, navigate]);

  const handleSaveProfile = async () => {
    setIsUpdating(true);
    
    try {
      // Here you would save the profile data to your database
      // const { error } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: user?.id,
      //     full_name: fullName,
      //     username: username,
      //     company: company,
      //     updated_at: new Date()
      //   });
      
      // if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotifications = () => {
    setIsUpdating(true);
    
    try {
      // Simulate saving notification preferences
      setTimeout(() => {
        toast.success("Notification preferences updated!");
        setIsUpdating(false);
      }, 500);
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast.error("Failed to update notification preferences.");
      setIsUpdating(false);
    }
  };

  const handleSavePreferences = () => {
    setIsUpdating(true);
    
    try {
      // Simulate saving user preferences
      setTimeout(() => {
        toast.success("Preferences updated!");
        setIsUpdating(false);
      }, 500);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error("Failed to update preferences.");
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <Navbar />
        <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Personal Information</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com" 
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      To change your email, please contact support.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Laptop className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Account Information</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input 
                      id="company" 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Enter company name (optional)" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="outline" className="w-full md:w-auto">
                    Change Password
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">All Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive all notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="product-updates">Product Updates</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New features, upgrades, and improvements
                      </p>
                    </div>
                    <Switch 
                      id="product-updates" 
                      checked={productUpdates}
                      onCheckedChange={setProductUpdates}
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="security-alerts">Security Alerts</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Important security notifications and alerts
                      </p>
                    </div>
                    <Switch 
                      id="security-alerts" 
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <MailWarning className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Promotions, surveys, and marketing communications
                      </p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Notification Frequency</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription plans and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Current Plan</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Free Plan</h4>
                      <p className="text-sm text-muted-foreground">Basic features with limited usage</p>
                    </div>
                    <Button variant="outline" className="hover:bg-blue-100 dark:hover:bg-blue-800">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-center text-muted-foreground">No payment methods added yet</p>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Billing History</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="p-4 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-center text-muted-foreground">No billing history available</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Download Invoices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Sun className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Appearance</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Laptop className="h-4 w-4" />
                            <span>System</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Regional Settings</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                        <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                        <SelectItem value="CET">CET (Central European Time)</SelectItem>
                        <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Date & Time Format</h3>
                  </div>
                  <Separator className="mb-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="MM/DD/YYYY">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="MMMM D, YYYY">MMMM D, YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSavePreferences} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
