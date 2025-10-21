import NewsletterSubscriber from "../models/newsletterSubscriber.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body || {};

    // ✅ Validate email format
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ✅ Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({
      email: normalizedEmail,
    });
    if (existingSubscriber) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    // ✅ Create new subscriber
    await NewsletterSubscriber.create({ email: normalizedEmail });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    // ✅ Handle duplicate key (unique index) race conditions gracefully
    if (error?.code === 11000) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    return next(error);
  }
};
