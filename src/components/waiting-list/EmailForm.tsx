
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ConfirmationDialog from './ConfirmationDialog';
import { useEmailService } from '@/utils/emailService';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { sendWelcomeEmail } = useEmailService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Special handling for testing email
      const isTestEmail = email.toLowerCase() === 'lumenaihelp@gmail.com';
      
      if (isTestEmail) {
        // For test email, just attempt to send the welcome email and show success
        console.log('Test email detected, bypassing duplicate check');
        await sendWelcomeEmail(email, email.split('@')[0]);
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setEmail('');
        setShowDialog(true);
        toast.success('Test email has been sent!');
        return;
      }
      
      // Normal flow for non-test emails
      // Insert the email into the waiting_list table
      const { error } = await supabase
        .from('waiting_list')
        .insert([{ email, is_test: isTestEmail }]);
      
      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already on our waiting list');
        } else {
          console.error('Error submitting email:', error);
          toast.error('Failed to join waiting list. Please try again later.');
        }
        setIsSubmitting(false);
        return;
      }
      
      // Send welcome email
      await sendWelcomeEmail(email, email.split('@')[0]);
      
      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      setShowDialog(true);
      toast.success('You\'ve been added to our waiting list!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">You're on the list!</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Thank you for your interest! We'll notify you when we launch.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 pr-4 pl-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            <>
              <span>Join Waitlist</span>
              <motion.div
                animate={{ 
                  x: [0, 4, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  repeatType: "reverse" 
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </>
          )}
        </Button>
      </form>

      <div className="mt-3 flex">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Sparkles className="h-3 w-3 text-blue-500" />
          <span>Exclusive early access to premium features</span>
        </div>
      </div>

      <ConfirmationDialog open={showDialog} onClose={closeDialog} />
    </>
  );
};

export default EmailForm;
