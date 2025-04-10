
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

export default function SwitchAccount() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
      <div className="container max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Switch Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border border-blue-100 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md hover:shadow-xl transition-all relative">
            <div className="absolute top-0 right-0 m-2">
              <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 py-1 px-2 rounded-full">Current</span>
            </div>
            <CardHeader>
              <CardTitle>Personal Account</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free Plan</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
                Access Dashboard
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm flex flex-col items-center justify-center p-8">
            <PlusCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Add New Account</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              Create or connect another business account
            </p>
            <Button variant="outline">Add Account</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
