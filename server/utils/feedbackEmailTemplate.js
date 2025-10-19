export const feedbackEmailTemplate = (username, message) => {
  const subject = "We’ve Received Your Feedback – Codify";

  const html = `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f4f6f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #4f46e5, #3b82f6); color: white; text-align: center; padding: 18px;">
        <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Codify</h2>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px; color: #333; line-height: 1.7; text-align: left;">
        <h3 style="margin-bottom: 18px; font-size: 22px; color: #111;">Thank You, ${username}!</h3>
        <p style="margin-bottom: 15px; font-size: 16px;">
          We’ve received your feedback and truly appreciate you taking the time to share your thoughts with us.
        </p>

        <p style="font-size: 16px; margin-bottom: 25px;">
          Our team will review your message and get back to you soon if necessary.  
          Your input helps us improve and build a better experience at <b>Codify</b>.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin-top: 25px;">
          <a href="https://codifylearn.netlify.app/" 
             style="background: #4f46e5; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 500; display: inline-block;">
            Visit Codify
          </a>
        </div>
      </div>
      
      <!-- Divider -->
      <div style="border-top: 1px solid #e5e7eb; margin: 0 30px;"></div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 18px; text-align: center; font-size: 13px; color: #6b7280; line-height: 1.5;">
        <p style="margin: 4px 0;">This is an automated message, please do not reply.</p>
        <p style="margin: 4px 0;">
          Need help? <a href="mailto:support@codify.com" style="color: #4f46e5; text-decoration: none;">Contact Support</a>
        </p>
        <p style="margin: 4px 0;">© ${new Date().getFullYear()} Codify. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;

  return { subject, html };
};
