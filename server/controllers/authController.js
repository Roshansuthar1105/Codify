import User from "../models/userSchema.js";
import Feedback from "../models/feedbackSchema.js";
import Course from "../models/courseSchema.js";
import Visitor from "../models/visitorCounterSchema.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import { otpEmailTemplate } from "../utils/OTPemailTemplates.js";
import { feedbackEmailTemplate } from "../utils/feedbackEmailTemplate.js";
import passport from "passport";

const otpStore = {}; // Temporary in-memory OTP store

// -------------------- Visitor --------------------
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

// -------------------- User Auth --------------------
const regPage = async (req, res) => {
  try {
    const { email, password, phone, username } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Logged in successfully",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- Feedback --------------------
const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;
    if (!email || !username || !message)
      return res.status(400).json({ message: "All fields are required" });

    const newMessage = await Feedback.create({ email, username, message });
    const { subject, html } = feedbackEmailTemplate(username, message);
    await sendEmail(email, subject, html);

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedbackId: newMessage._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send feedback" });
  }
};

// -------------------- General --------------------
const user = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const courses = async (req, res) => {
  try {
    const data = await Course.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: `Fetching courses error: ${error}` });
  }
};

const defcontroller = async (req, res) => {
  res.status(200).json({ message: "hello from def controller" });
};

// -------------------- OTP --------------------
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
    const { subject, html } = otpEmailTemplate(otp);

    await sendEmail(email, subject, html);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

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
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

// -------------------- Password --------------------
const forgotPasswordCheck = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.status(404).json({ message: "Email does not exist" });

    res.status(200).json({ message: "Email exists" });
  } catch (error) {
    console.error("Error in forgotPasswordCheck:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = newPassword; // hash handled in schema pre-save
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- Social Auth --------------------
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

const googleSignup = async (req, res, next) => {
  try {
    passport.authenticate("google-signup", async (err, data, info) => {
      if (err) {
        console.error("❌ Google Signup Passport Error:", err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=server_error`
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

      if (isNewUser) {
        try {
          const forgotPasswordLink = `${process.env.FRONTEND_URL}/forgot-password`;
          await sendEmail(
            user.email,
            "Welcome to Codify - Set Your Password",
            `Hi ${
              user.username || "there"
            }, set your password here: ${forgotPasswordLink}`
          );
        } catch (emailError) {
          console.error("Failed to send GitHub welcome email:", emailError);
        }
      }

      res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
    } catch (error) {
      console.error("Error in githubAuth:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
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
  githubAuth,
};
