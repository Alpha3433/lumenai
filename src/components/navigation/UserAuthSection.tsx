
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  CircleDot, 
  Home, 
  LayoutDashboard, 
  Settings, 
  DollarSign, 
  MessageCircle, 
  Users, 
  LogOut,
  Calendar,
  ChartBar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationCenter from './NotificationCenter';

const UserAuthSection: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
            <CircleDot className="h-3 w-3 text-blue-500" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Free Plan</span>
          </div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button 
                className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {user.email?.substring(0, 2).toUpperCase() || 'JD'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/home')} className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer">
                <ChartBar className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/schedule-meeting')} className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Schedule a Meeting</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/home#pricing')} className="cursor-pointer">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open('mailto:support@example.com', '_blank')} className="cursor-pointer">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Contact Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/switch-account')} className="cursor-pointer">
                <Users className="mr-2 h-4 w-4" />
                <span>Switch Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
