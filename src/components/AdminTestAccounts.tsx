
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { subscriptionService } from '@/utils/subscriptionService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminTestAccounts = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('entrepreneur');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await subscriptionService.createTestAdmin(email, password);
      
      if (error) {
        toast.error('Failed to create test account: ' + error.message);
      } else {
        toast.success('Test account created successfully!');
        setEmail('');
        setPassword('');
      }
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
            <Select defaultValue="entrepreneur" onValueChange={setPlan}>
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
