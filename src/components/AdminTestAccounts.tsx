
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { subscriptionService, SubscriptionPlan } from '@/utils/subscriptionService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const AdminTestAccounts = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<SubscriptionPlan>('entrepreneur');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the user account with Entrepreneur plan
      const { user, error: userError } = await subscriptionService.createTestAdmin(email, password);
      
      if (userError) {
        toast.error('Failed to create test account: ' + userError.message);
        setLoading(false);
        return;
      }
      
      // If the selected plan is different from entrepreneur, update it
      if (plan !== 'entrepreneur' && user) {
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({ plan })
          .eq('user_id', user.id);
          
        if (updateError) {
          toast.error('Created user but failed to set plan: ' + updateError.message);
          setLoading(false);
          return;
        }
      }
      
      toast.success('Test account created successfully!');
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Test Account</CardTitle>
        <CardDescription>Create an account with premium subscription for testing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription Plan</Label>
            <Select value={plan} onValueChange={(value: SubscriptionPlan) => setPlan(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="entrepreneur">Entrepreneur ($29/mo)</SelectItem>
                <SelectItem value="strategist">Strategist ($79/mo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCreateAdmin}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Test Account'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminTestAccounts;
