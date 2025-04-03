
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import BrandLogo from '@/components/navigation/BrandLogo';
import { supabase } from '@/integrations/supabase/client';

const WaitingList = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the email into the waiting_list table
      // Using 'any' type assertion to bypass type checking for the table name
      const { error } = await (supabase as any)
        .from('waiting_list')
        .insert([{ email }]);
      
      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast.error('This email is already on our waiting list');
        } else {
          console.error('Error submitting email:', error);
          toast.error('Failed to join waiting list. Please try again later.');
        }
        setIsSubmitting(false);
        return;
      }
      
      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      toast.success('You\'ve been added to our waiting list!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <header className="w-full pt-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <BrandLogo />
          <Link to="/home">
            <Button variant="ghost" className="text-sm">
              Skip to Website <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12 md:gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 max-w-xl"
        >
          <div className="mb-2 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-md mr-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            AI-Powered Business Plans For Your Next Venture
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our waiting list to be among the first to access our revolutionary AI business plan builder. Get early access and exclusive benefits.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  autoFocus
                  required
                />
                <Button 
                  type="submit" 
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Join Waiting List'}
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll notify you when we launch. No spam, ever.
              </p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 flex items-start gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-300">You're on the list!</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Thank you for your interest! We'll notify you when we launch.
                </p>
              </div>
            </motion.div>
          )}
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">AI-powered insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">Market analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">Investor-ready plans</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">Early access discount</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">Premium templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 max-w-lg"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://videosholder.s3.ap-southeast-2.amazonaws.com/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA26SVGFECLMN6KKYT%2F20250403%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250403T105641Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAIPr6PZ21A0dhAiQR%2B89MGbx0Iu6MRrDXuyLH7DPNhi5AiEA34Rtd%2FuntxbFN5NscGA5AOMWKOtLX5cvH%2BKewEGH%2BAsqogII7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NTI4NzE2ODAyNjAiDErc0ZpgGhMlThjLTyr2Abxuad414EYUWdZBej8zEv4vzNeJSDWSlEbd%2Bk0qRAsttpVsdZROtghBYXJvJ6Wh2E4y94xDgKUGn5VNsdivCfGzVqgGltSaoQRgbXm65kVMNCeFy964RL8Cstag53Ib7hXaNpT2de%2Bt%2FnNtZrE%2B3W25BSMzjqTu82cHfPqT7bvkJ7Fl6J70PwGk%2FWenQ4oenmtVCo2%2FgfxYYY2vGGru1NNCM7Ryexq5g5mNtRiK%2BUTikoQU6amHbviRHIjuekvSjgOwSoS7C067kH6UHh19f7Ng6m%2Fpe%2B1%2B3%2BYgU57M%2BRSbbWutSf6sLUmMrap3Sx5lDgTYSPHo9jCAy7m%2FBjreAaZVwooD013Re%2Fj2d%2B0pk0xIHCu6Wdrcq%2Fm%2FQZDjSxJJNGqqvSS9vPhRa3QNtnmmy82VhYcJoFuKRnQ2uPfDF3nXtDBrZUnf7zSAoQU3MWUwrWG1WukRK76WEHaRxsZNlcrUa%2FkVu4S%2Fvm6BcP0vtugpncsxbGbZkVM1le7Ybzz7PnSa%2BZT1vOE9ILSjfPW9ECo2cl7C2utpneYMvQlxzrRjq0QaS6vBfA0p5GNjtpE5huQyIUjlO%2F2XY%2Bub2X%2BxoiKl%2FW9nqJMlqbnH%2FAstAdUFXX%2BIW2mlV38V7ISxIQ%3D%3D&X-Amz-Signature=72ef346b3c9e60d6d8e021c942b369cc4d8a017ae5f452d8e22411dbda4cb588&X-Amz-SignedHeaders=host&response-content-disposition=inline" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              Coming Soon
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default WaitingList;
