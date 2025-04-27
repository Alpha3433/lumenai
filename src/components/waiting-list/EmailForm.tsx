
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ConfirmationDialog from './ConfirmationDialog';
import { useEmailService } from '@/utils/emailService';
import { ArrowRight } from 'lucide-react';

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
      <div className="bg-emerald-800/50 border border-emerald-300/20 rounded-lg p-4 flex items-center gap-3">
        <div className="flex-shrink-0 bg-emerald-500 rounded-full p-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white">You're on the list!</h3>
          <p className="text-sm text-emerald-100">
            Thank you for your interest! We'll notify you when we launch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-base bg-white text-gray-900 border-gray-200"
          required
        />
        <Button 
          type="submit" 
          className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 text-white flex items-center gap-2"
          disabled={isSubmitting}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <ConfirmationDialog open={showDialog} onClose={closeDialog} />
    </>
  );
};

export default EmailForm;
