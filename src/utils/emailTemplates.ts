
export const welcomeEmailTemplate = (username: string) => ({
  subject: "🎉 Welcome to Our Platform!",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Email</title>
    </head>
    <body>
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 16px;">Welcome aboard! 🚀</h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Thanks for joining our platform! We're excited to have you on board.
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
          <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 16px;">📅 Next Steps</h2>
          <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 12px;">Complete your profile</li>
            <li style="margin-bottom: 12px;">Explore our features</li>
            <li style="margin-bottom: 12px;">Connect with others</li>
          </ul>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
          <p style="color: #718096; font-size: 14px;">
            Best regards,<br>
            The Team
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
});

export const passwordResetEmailTemplate = (resetLink: string) => ({
  subject: "🔐 Reset Your Password",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body>
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 16px;">Password Reset Request</h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            We received a request to reset your password. Click the button below to proceed.
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${resetLink}" 
             style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
            Reset Password
          </a>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
          <p style="color: #718096; font-size: 14px;">
            If you didn't request this password reset, you can safely ignore this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
});

export const notificationEmailTemplate = (message: string, actionUrl?: string) => ({
  subject: "📬 New Notification",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notification</title>
    </head>
    <body>
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="margin-bottom: 32px;">
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">${message}</p>
        </div>
        ${actionUrl ? `
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${actionUrl}" 
               style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 32px; 
                      text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
              View Details
            </a>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `,
});
