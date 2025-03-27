
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleDot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const UserAuthSection: React.FC = () => {
  const { user, signOut, subscriptionPlan } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getPlanDisplay = () => {
    switch (subscriptionPlan) {
      case 'entrepreneur':
        return {
          text: 'Entrepreneur Plan',
          bgClass: 'bg-green-50 dark:bg-green-900/30',
          borderClass: 'border-green-100 dark:border-green-800',
          textClass: 'text-green-700 dark:text-green-300',
          dotClass: 'text-green-500'
        };
      case 'strategist':
        return {
          text: 'Strategist Plan',
          bgClass: 'bg-purple-50 dark:bg-purple-900/30',
          borderClass: 'border-purple-100 dark:border-purple-800',
          textClass: 'text-purple-700 dark:text-purple-300',
          dotClass: 'text-purple-500'
        };
      default:
        return {
          text: 'Free Plan',
          bgClass: 'bg-blue-50 dark:bg-blue-900/30',
          borderClass: 'border-blue-100 dark:border-blue-800',
          textClass: 'text-blue-700 dark:text-blue-300',
          dotClass: 'text-blue-500'
        };
    }
  };

  const planDisplay = getPlanDisplay();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${planDisplay.bgClass} px-3 py-1 rounded-full border ${planDisplay.borderClass}`}>
            <CircleDot className={`h-3 w-3 ${planDisplay.dotClass}`} />
            <span className={`text-xs font-medium ${planDisplay.textClass}`}>{planDisplay.text}</span>
          </div>
          <div className="relative">
            <button 
              onClick={handleSignOut}
              className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {user.email?.substring(0, 2).toUpperCase() || 'JD'}
            </button>
          </div>
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
