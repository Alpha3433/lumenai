
export const welcomeEmailTemplate = (username: string) => ({
  subject: "Welcome to Our Platform!",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center;">Welcome to Our Platform!</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Dear ${username},
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        We're excited to have you on board! Thank you for joining our platform. 
        We're here to help you make the most of your experience.
      </p>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <a href="https://your-app-url.com/dashboard" 
           style="background-color: #0066cc; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 4px; font-weight: bold;">
          Get Started
        </a>
      </div>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        If you have any questions, feel free to reach out to our support team.
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Best regards,<br>
        The Team
      </p>
    </div>
  `,
});

export const passwordResetEmailTemplate = (resetLink: string) => ({
  subject: "Reset Your Password",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        You recently requested to reset your password. Click the button below to reset it:
      </p>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <a href="${resetLink}" 
           style="background-color: #0066cc; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 4px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        If you didn't request a password reset, you can safely ignore this email.
      </p>
      <p style="color: #666; font-size: 14px;">
        This link will expire in 1 hour for security reasons.
      </p>
    </div>
  `,
});
