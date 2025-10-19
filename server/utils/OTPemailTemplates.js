// C:\Users\Administrator\Codify\server\utils\OTPemailTemplates.js
export const otpEmailTemplate = (otp) => {
  const subject = "Codify Verification Code";

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 8px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #4f46e5, #3b82f6); color: white; padding: 18px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Codify</h2>
      </div>
      
      <!-- Body -->
      <div style="padding: 20px; color: #333; line-height: 1.4; text-align: center;">
        <h3 style="margin-bottom: 12px; font-size: 20px;">Verify Your Email</h3>
        <p style="margin-bottom: 15px; font-size: 16px;">
          To complete your verification on <b>Codify</b>, please use the One-Time Password (OTP) below:
        </p>
        
        <!-- OTP -->
        <div style="font-size: 34px; font-weight: bold; color: #2563eb; background: #f0f9ff; padding: 10px 18px; border-radius: 8px; display: inline-block; letter-spacing: 6px; margin: 0;">
          ${otp}
        </div>
        
        <p style="font-size: 15px; color: #555; margin-top: 12px;">
          This OTP will expire in <b>5 minutes</b>. Please do not share it with anyone.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 13px; color: #6b7280;">
        Best regards,<br>
        <b>Codify Team</b>
      </div>
    </div>
  </div>
  `;
  return { subject, html };
};
