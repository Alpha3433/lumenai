
import React from 'react';
import AdminTestAccounts from '@/components/AdminTestAccounts';
import { useAuth } from '@/components/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function AdminTest() {
  const { user } = useAuth();

  // A simple check to see if the user is authorized
  // In a real app, you'd want more robust authorization
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin Test Panel</h1>
      <div className="flex flex-col items-center">
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg text-center">
          Create test accounts with different subscription plans to test your application.
        </p>
        <AdminTestAccounts />
      </div>
    </div>
  );
}
