
import React, { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the email into the waiting_list table
      const { error } = await supabase
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
                  Thank you for your interest! We'll notify you at {email} when we launch.
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
              <img
                src="/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png"
                alt="Business Plan Builder Interface"
                className="w-full h-auto"
              />
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
