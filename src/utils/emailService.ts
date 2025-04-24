
import { useEmail } from '@/hooks/useEmail';
import { welcomeEmailTemplate, passwordResetEmailTemplate, notificationEmailTemplate } from './emailTemplates';

export const useEmailService = () => {
  const { sendEmail, testEmailConnection } = useEmail();

  const sendWelcomeEmail = async (email: string, username: string) => {
    console.log(`Sending welcome email to ${email} for username ${username}`);
    const template = welcomeEmailTemplate(username);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  };

  const sendPasswordResetEmail = async (email: string, resetLink: string) => {
    console.log(`Sending password reset email to ${email} with reset link`);
    const template = passwordResetEmailTemplate(resetLink);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  };

  const sendNotification = async (email: string, message: string, actionUrl?: string) => {
    console.log(`Sending notification email to ${email}`);
    const template = notificationEmailTemplate(message, actionUrl);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  };

  const testEmail = async (email: string) => {
    console.log(`Testing email connection with ${email}`);
    return testEmailConnection(email);
  };

  return {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendNotification,
    testEmail,
  };
};
