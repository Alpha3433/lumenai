
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const EmailForm = () => {
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

  if (isSubmitted) {
    return (
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
    );
  }

  return (
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
  );
};

export default EmailForm;
