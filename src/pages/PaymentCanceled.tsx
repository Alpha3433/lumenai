
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto py-20 px-4">
        <Card className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Payment Canceled</CardTitle>
            <CardDescription>
              Your payment process has been canceled.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                No worries! You can try again whenever you're ready or explore our other plans that might better fit your needs.
              </p>
              
              <div className="my-6 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30 text-amber-800 dark:text-amber-300">
                <p>Need help choosing a plan? Contact our support team for assistance.</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/home')}>
              Back to Home
            </Button>
            <Button onClick={() => navigate('/home#pricing')}>
              View Plans
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentCanceled;
