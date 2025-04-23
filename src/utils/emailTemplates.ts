
export const welcomeEmailTemplate = (username: string) => ({
  subject: "🎉 Welcome to Our Platform!",
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 16px;">Welcome aboard, ${username}! 🚀</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          We're thrilled to have you join our community! Your journey to success starts here.
        </p>
      </div>

      <div style="background-color: #f8f9fa; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
        <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 16px;">🎯 Quick Start Guide</h2>
        <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 12px;">Complete your profile</li>
          <li style="margin-bottom: 12px;">Explore our features</li>
          <li style="margin-bottom: 12px;">Connect with other members</li>
        </ul>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="https://your-app-url.com/dashboard" 
           style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 32px; 
                  text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;
                  transition: background-color 0.3s ease;">
          Get Started →
        </a>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
        <p style="color: #4a4a4a; font-size: 14px; margin-bottom: 16px;">
          Need help? Our support team is here for you 24/7.
        </p>
        <div style="margin-bottom: 16px;">
          <a href="https://your-app-url.com/help" style="color: #0066cc; text-decoration: none; margin: 0 12px;">Help Center</a>
          <a href="https://your-app-url.com/contact" style="color: #0066cc; text-decoration: none; margin: 0 12px;">Contact Us</a>
        </div>
        <p style="color: #718096; font-size: 14px;">
          Best regards,<br>
          The Team
        </p>
      </div>
    </div>
  `,
});

export const passwordResetEmailTemplate = (resetLink: string) => ({
  subject: "🔐 Reset Your Password",
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 16px;">Password Reset Request</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset your password. Don't worry, we've got you covered!
        </p>
      </div>

      <div style="background-color: #fff8f3; border-left: 4px solid #ff6b35; padding: 24px; border-radius: 4px; margin-bottom: 32px;">
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0;">
          Click the button below to reset your password. For security reasons, this link will expire in 1 hour.
        </p>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${resetLink}" 
           style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 32px; 
                  text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;
                  transition: background-color 0.3s ease;">
          Reset Password →
        </a>
      </div>

      <div style="background-color: #f8f9fa; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
        <h2 style="color: #2c3e50; font-size: 18px; margin-bottom: 16px;">🔒 Security Tips</h2>
        <ul style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Choose a strong, unique password</li>
          <li style="margin-bottom: 8px;">Never share your password with others</li>
          <li style="margin-bottom: 8px;">Enable two-factor authentication for extra security</li>
        </ul>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
        <p style="color: #718096; font-size: 14px; margin-bottom: 16px;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>
        <p style="color: #718096; font-size: 14px;">
          Need help? <a href="https://your-app-url.com/help" style="color: #0066cc; text-decoration: none;">Contact Support</a>
        </p>
      </div>
    </div>
  `,
});

