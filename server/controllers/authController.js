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
    let counter = await Visitor.findOne({ name: "visitors" });
    if (!counter) {
      counter = await Visitor.create({ name: "visitors", count: 1 });
    } else {
      counter.count += 1;
      await counter.save();
    }
    res.status(200).json({ visitorCount: counter.count });
  } catch (error) {
    res.status(404).json({ error });
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
  passport.authenticate("google-login", (err, data, info) => {
    if (err)
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=server_error`
      );
    if (!data) {
      const errorMsg = encodeURIComponent(
        info?.message || "Authentication failed"
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=${errorMsg}`
      );
    }
    const { token } = data;
    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
  })(req, res, next);
};

const googleSignup = async (req, res, next) => {
  passport.authenticate("google-signup", async (err, data, info) => {
    if (err)
      return res.redirect(
        `${process.env.FRONTEND_URL}/signup?error=server_error`
      );
    if (!data) {
      const errorMsg = encodeURIComponent(
        info?.message || "Authentication failed"
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/signup?error=${errorMsg}`
      );
    }

    try {
      const userEmail = data.user.email;
      const forgotPasswordLink = `${process.env.FRONTEND_URL}/forgot-password`;
      await sendEmail(
        userEmail,
        "Welcome to Codify - Set Your Password",
        `Hi ${
          data.user.username || "there"
        }, set your password here: ${forgotPasswordLink}`
      );
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    const { token } = data;
    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`);
  })(req, res, next);
};

const githubAuth = (req, res, next) => {
  passport.authenticate("github", async (err, data, info) => {
    try {
      if (err)
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=server_error`
        );
      if (!data) {
        const errorMsg = encodeURIComponent(
          info?.message || "Authentication failed"
        );
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=${errorMsg}`
        );
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
