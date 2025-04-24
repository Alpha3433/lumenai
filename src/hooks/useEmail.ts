
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
      console.log("Sending email to:", to);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { to, subject, html, from },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Email function response:", data);

      // Check if there was an API error in the response
      if (data.error) {
        console.error("Email API error:", data.error);
        toast.error(`Failed to send email: ${data.error.message || "Unknown error"}`);
        return false;
      }

      toast.success('Email sent successfully');
      return true;
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast.error(`Failed to send email: ${error.message || "Unknown error"}`);
      return false;
    }
  };

  const testEmailConnection = async (email: string) => {
    try {
      console.log("Testing email connection with:", email);
      const result = await sendEmail({
        to: email,
        subject: "🧪 Email Test Connection",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">Email Connection Test</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              This is a test email to verify your email connection is working properly.
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              Time sent: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });
      return result;
    } catch (error) {
      console.error("Test email failed:", error);
      return false;
    }
  };

  return { sendEmail, testEmailConnection };
};
