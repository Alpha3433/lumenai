
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  LayoutDashboard, 
  Settings, 
  DollarSign, 
  MessageCircle, 
  Users, 
  LogOut,
  Calendar,
  ChartBar,
  HelpCircle,
  CreditCard,
  Mail,
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationCenter from './NotificationCenter';
import SubscriptionBadge from './SubscriptionBadge';
import { useUserSubscription } from '@/hooks/useUserSubscription';

const UserAuthSection: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [showSwitchAccountDialog, setShowSwitchAccountDialog] = useState(false);
  const { subscriptionTier } = useUserSubscription();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <div className="flex items-center gap-3">
          <NotificationCenter />
          <SubscriptionBadge tier={subscriptionTier} />
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button 
                className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {user.email?.substring(0, 2).toUpperCase() || 'JD'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/home')} className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Dashboard</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View your business overview</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/create')} className="cursor-pointer">
                <ChartBar className="mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Create a Report</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Generate a new business plan or report
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Settings</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage your preferences</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/schedule-meeting')} className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4 text-green-500" />
                <div>
                  <span className="font-medium">Schedule a Meeting</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Book time with an expert</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowUpgradeDialog(true)} className="cursor-pointer">
                <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                <div>
                  <span className="font-medium">Upgrade Plan</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get access to premium features</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSupportDialog(true)} className="cursor-pointer">
                <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                <div>
                  <span className="font-medium">Contact Support</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get help with your account</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowSwitchAccountDialog(true)} className="cursor-pointer">
                <Users className="mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Switch Account</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Change to another workspace</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Log Out</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  Upgrade Your Plan
                </DialogTitle>
                <DialogDescription>
                  Choose the perfect plan for your business needs
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/20">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Premium Plan</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Unlock advanced features, priority support, and unlimited reports</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">$29</span>
                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowUpgradeDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate('/home#pricing')}
                >
                  View All Plans
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  Contact Support
                </DialogTitle>
                <DialogDescription>
                  Get help with your account or business plan
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <a 
                    href="mailto:support@example.com" 
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">support@example.com</p>
                    </div>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Chat with our support team</p>
                    </div>
                  </a>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSupportDialog(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showSwitchAccountDialog} onOpenChange={setShowSwitchAccountDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  Switch Account
                </DialogTitle>
                <DialogDescription>
                  Select an account to switch to or create a new one
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Personal Account</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">Current Account</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/switch-account')}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <Users className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">Add New Account</h4>
                      <p className="text-sm text-gray-500">Create or connect another workspace</p>
                    </div>
                  </button>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSwitchAccountDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => navigate('/switch-account')}
                >
                  Manage Accounts
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              Sign In
            </Button>
          </Link>
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Get Started
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserAuthSection;

