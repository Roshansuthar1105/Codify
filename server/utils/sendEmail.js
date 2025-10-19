// server/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html, text = "" ) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const info = await transporter.sendMail({
      from: `"Codify Team 🚀" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text, //fallback for email clients that do not support HTML
    });

    console.log("Email sent successfully");
    return info;
  } catch (error) {
    console.error(" Email send failed:", error);
    throw error;
  }
};
