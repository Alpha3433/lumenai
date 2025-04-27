
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
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
        <div>
          <h3 className="font-medium text-green-800 dark:text-green-400">You're on the list!</h3>
          <p className="text-sm text-green-700 dark:text-green-500">
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
          className="h-12 text-base"
          required
        />
        <Button 
          type="submit" 
          className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
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
