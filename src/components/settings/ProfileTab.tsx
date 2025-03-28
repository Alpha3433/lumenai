
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/components/AuthProvider';
import { getRandomAvatarIcon } from '@/utils/avatarUtils';

const ProfileTab: React.FC = () => {
  const { user, subscriptionPlan } = useAuth();
  const AvatarIcon = user ? getRandomAvatarIcon(user.email || 'user') : null;
  
  const getPlanDisplay = () => {
    switch (subscriptionPlan) {
      case 'entrepreneur':
        return {
          text: 'Entrepreneur Plan',
          bgClass: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
        };
      case 'strategist':
        return {
          text: 'Strategist Plan',
          bgClass: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
        };
      default:
        return {
          text: 'Free Plan',
          bgClass: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
        };
    }
  };

  const planDisplay = getPlanDisplay();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
              {AvatarIcon && <AvatarIcon size={36} />}
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">{user?.email?.split('@')[0]}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-1">
                <Badge variant="outline" className={`${planDisplay.bgClass}`}>
                  {planDisplay.text}
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your name" defaultValue={user?.email?.split('@')[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user?.email} disabled />
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
              <Button 
                variant="outline"
                onClick={() => window.dispatchEvent(new CustomEvent('open-subscription-dialog'))}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
