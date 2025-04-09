
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  
  const sessionId = searchParams.get('session_id');
  const planType = searchParams.get('plan');
  
  useEffect(() => {
    // Success notification
    toast.success('Payment successful!');
    
    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  const getPlanName = () => {
    switch (planType) {
      case 'entrepreneur': return 'Entrepreneur';
      case 'founder': return 'Founder';
      case 'partner': return 'Partner';
      default: return 'Premium';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto py-20 px-4">
        <Card className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for your payment. Your {getPlanName()} plan is now active.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Your subscription has been activated and you now have full access to all features included in the {getPlanName()} plan.
              </p>
              
              <div className="my-6 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300">
                <p>Transaction ID: {sessionId?.substring(0, 10)}...</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/home')}>
              Back to Home
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard ({countdown})
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
