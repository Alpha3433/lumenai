
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleDot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const UserAuthSection: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
            <CircleDot className="h-3 w-3 text-blue-500" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Free Plan</span>
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
