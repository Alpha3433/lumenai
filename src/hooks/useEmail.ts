
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const useEmail = () => {
  const sendEmail = async ({ to, subject, html, from }: SendEmailParams) => {
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: { to, subject, html, from },
      });

      if (error) throw error;

      toast.success('Email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
      return false;
    }
  };

  return { sendEmail };
};
