import User from "../models/userSchema.js";
import Feedback from "../models/feedbackSchema.js";
import Course from "../models/courseSchema.js";
import Visitor from "../models/visitorCounterSchema.js"; 
import bcryptjs from "bcryptjs";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import { otpEmailTemplate } from "../utils/OTPemailTemplates.js";
import { feedbackEmailTemplate } from "../utils/feedbackEmailTemplate.js";
const otpStore = {}; // temporary in-memory store
import passport from "passport";

const homePage = async (req, res) => {
  try {
    let counter = await Visitor.findOne({ name: "visitors"});

    if (!counter) {
      // Try to create the counter; if permission denied, fall back to 0
      try {
        counter = await Visitor.create({ name: "visitors", count: 1});
        return res.status(200).json({ visitorCount: counter.count });
      } catch (e) {
        console.warn("Visitor create failed (likely read-only DB):", e?.codeName || e?.message);
        return res.status(200).json({ visitorCount: 0 });
      }
    }

    // Try to increment; if permission denied, return existing count
    try {
      counter.count += 1;
      await counter.save();
      return res.status(200).json({ visitorCount: counter.count });
    } catch (e) {
      console.warn("Visitor increment failed (likely read-only DB):", e?.codeName || e?.message);
      return res.status(200).json({ visitorCount: counter.count || 0 });
    }
  } catch (error) {
    // Final fallback: never throw 5xx for this endpoint
    console.warn("Visitor handler unexpected error:", error?.message || error);
    return res.status(200).json({ visitorCount: 0 });
  }
};

const regPage = async (req, res) => {
  try {
    const { email, password, phone, username } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const userCreated = await User.create({ email, password, phone, username });
    res.status(201).json({
      message: "User created successfully",
      user: userCreated,
      userId: userCreated._id.toString(),
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isCorrectPassword = await userExist.comparePassword(password);
    if (isCorrectPassword) {
      res.status(200).json({
        message: "Logged in successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;

    if (!email || !username || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save feedback to DB
    const newMessage = await Feedback.create({ email, username, message });
    // Build email content
    const { subject, html } = feedbackEmailTemplate(username, message);

    // Send confirmation email
    await sendEmail(
      email,
      subject,
      html,
      `Hi ${username}, thanks for your feedback: ${message}`
    );

    // frontend response
    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedbackId: newMessage._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send feedback" });
  }
};

const user = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const courses = async (req, res) => {
  try {
    const response = await Course.find({});
    if (!response) {
      return res.status(400).json({ message: "Fetching courses error" });
    }
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: `Fetching courses error: ${error}` });
  }
};

const defcontroller = async (req, res) => {
  try {
    res.status(200).json({ message: "hello from def controller" });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
    const { subject, html } = otpEmailTemplate(otp);

    await sendEmail(email, subject, html);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOTP:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP Controller
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const record = otpStore[email];
    if (!record)
      return res
        .status(400)
        .json({ message: "OTP not found. Please request again." });
    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }
    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    delete otpStore[email];
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};
// Check if email exists in DB before forgot password reset
const forgotPasswordCheck = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "Email does not exist" });
    }
    return res.status(200).json({ message: "Email exists" });
  } catch (error) {
    console.error("Error in forgotPasswordCheck:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = newPassword; // plain text
    await user.save(); // hash will happen here

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleLogin = async (req, res, next) => {
  try {
    passport.authenticate("google-login", (err, data, info) => {
      if (err) {
        console.error("❌ Google Login Passport Error:", err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=server_error`
        );
      }
      if (!data) {
        const errorMsg = encodeURIComponent(
          info?.message || "Authentication failed"
        );
        console.error("❌ Google Login No Data:", info);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=${errorMsg}`
        );
      }
      
      console.log("✅ Google Login Success:", { userId: data.user._id, email: data.user.email });
      
      // Upon Successful Login, Redirect URL with token to frontend
      const { token } = data;
      console.log("🔑 Redirecting with token:", token ? "Token present" : "No token");
      res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
    })(req, res, next);
  } catch (error) {
    console.error("❌ Google Login Error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};
//Google Signup
const googleSignup = async (req, res, next) => {
  try {
    passport.authenticate("google-signup", async (err, data, info) => {
      if (err) {
        console.error("❌ Google Signup Passport Error:", err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/signup?error=server_error`
        );
      }
      if (!data) {
        const errorMsg = encodeURIComponent(
          info?.message || "Authentication failed"
        );
        console.error("❌ Google Signup No Data:", info);
        return res.redirect(
          `${process.env.FRONTEND_URL}/signup?error=${errorMsg}`
        );
      }
      
      console.log("✅ Google Signup Success:", { userId: data.user._id, email: data.user.email });
      
      // Send email reminder to set password (optional - don't fail if email fails)
      try {
        const userEmail = data.user.email;
        const forgotPasswordLink = `${process.env.FRONTEND_URL}/forgot-password`;

        await sendEmail(
          userEmail,
          "Welcome to Codify - Set Your Password",
          `Hi ${data.user.username || "there"},\n\n
          Welcome to Codify! 🎉\n\n
          Since you signed up using Google, you don't have a password yet.  
          You can set one anytime by clicking the link below:\n\n
          ${forgotPasswordLink}\n\n
          This will let you log in directly using your email & password as well as Google.\n\n
          Cheers,  
          Codify Team`
        );
        console.log("✅ Welcome email sent successfully");
      } catch (emailError) {
        console.error("❌ Failed to send welcome email (non-blocking):", emailError.message);
        // Don't throw - email failure shouldn't block OAuth
      }
      
      // Upon Successful Signup, Redirect URL with token to frontend
      const { token } = data;
      console.log("🔑 Redirecting with token:", token ? "Token present" : "No token");
      res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
    })(req, res, next);
  } catch (error) {
    console.error("❌ Google Signup Error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/signup?error=server_error`
    );
  }
};

// GitHub Auth (Merged Login + Signup)
const githubAuth = (req, res, next) => {
  passport.authenticate("github", async (err, data, info) => {
    try {
      if (err) {
        console.error("GitHub Auth Error:", err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
      }

      if (!data) {
        const errorMsg = encodeURIComponent(info?.message || "Authentication failed");
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=${errorMsg}`);
      }

      const { user, token, isNewUser } = data;

      // Send welcome email for new users
      if (isNewUser) {
        try {
          const forgotPasswordLink = `${process.env.FRONTEND_URL}/forgot-password`;
          const githubUsername = user.username || "there";

          await sendEmail(
            user.email,
            "Welcome to Codify - Set Your Password",
            `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                  }
                  .container {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  }
                  .content {
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                    margin-top: 20px;
                  }
                  .header {
                    color: white;
                    text-align: center;
                    margin-bottom: 20px;
                  }
                  .header h1 {
                    margin: 0;
                    font-size: 28px;
                  }
                  .welcome-text {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 20px;
                  }
                  .button {
                    display: inline-block;
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                  }
                  .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 14px;
                    color: white;
                  }
                  .features {
                    background: #f8f9fa;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 20px 0;
                  }
                  .features ul {
                    margin: 10px 0;
                    padding-left: 20px;
                  }
                  .features li {
                    margin: 8px 0;
                  }
                  .github-icon {
                    width: 50px;
                    height: 50px;
                    margin: 10px auto;
                    display: block;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🎉 Welcome to Codify!</h1>
                  </div>
                  
                  <div class="content">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                         alt="GitHub" class="github-icon">
                    
                    <p class="welcome-text">
                      Hi <strong>${githubUsername}</strong>,
                    </p>
                    
                    <p class="welcome-text">
                      Welcome to <strong>Codify</strong>! 🚀 We're excited to have you join our community 
                      of learners and developers.
                    </p>
                    
                    <div class="features">
                      <p><strong>You now have access to:</strong></p>
                      <ul>
                        <li>📚 Comprehensive coding courses</li>
                        <li>🗺️ Interactive learning roadmaps</li>
                        <li>🔖 Bookmark your favorite content</li>
                        <li>📝 Track your learning progress</li>
                      </ul>
                    </div>
                    
                    <p class="welcome-text">
                      <strong>Important:</strong> Since you signed up using GitHub, you don't have a 
                      password yet. You can set one anytime to enable login with email & password:
                    </p>
                    
                    <center>
                      <a href="${forgotPasswordLink}" class="button">
                        Set Your Password
                      </a>
                    </center>
                    
                    <p class="welcome-text" style="font-size: 14px; color: #777; margin-top: 20px;">
                      This will allow you to log in using either GitHub or your email & password.
                    </p>
                  </div>
                  
                  <div class="footer">
                    <p>Happy Learning! 💻</p>
                    <p><strong>— The Codify Team</strong></p>
                  </div>
                </div>
              </body>
              </html>
            `,
            `Hi ${githubUsername}, welcome to Codify! You can set a password anytime at: ${forgotPasswordLink}`
          );

          console.log(`✅ Welcome email sent to ${user.email}`);
        } catch (emailError) {
          console.error("❌ Failed to send GitHub welcome email:", emailError);
          // Don't block the auth flow if email fails
        }
      }

      // Redirect with token
      return res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
    } catch (error) {
      console.error("Error in githubAuth:", error);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
    }
  })(req, res, next);
};

export {
  homePage,
  regPage,
  login,
  contact,
  user,
  courses,
  defcontroller,
  sendOTP,
  verifyOTP,
  resetPassword,
  forgotPasswordCheck,
  googleLogin,
  googleSignup,
  githubAuth
};
