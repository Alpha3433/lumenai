
import { useEmail } from '@/hooks/useEmail';
import { welcomeEmailTemplate, passwordResetEmailTemplate } from './emailTemplates';

export const useEmailService = () => {
  const { sendEmail } = useEmail();

  const sendWelcomeEmail = async (email: string, username: string) => {
    const template = welcomeEmailTemplate(username);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  };

  const sendPasswordResetEmail = async (email: string, resetLink: string) => {
    const template = passwordResetEmailTemplate(resetLink);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  };

  return {
    sendWelcomeEmail,
    sendPasswordResetEmail,
  };
};
