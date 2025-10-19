import NewsletterSubscriber from "../models/newsletterSubscriber.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Upsert-like behavior while preserving unique constraint
    const existing = await NewsletterSubscriber.findOne({
      email: normalizedEmail,
    });
    if (existing) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    await NewsletterSubscriber.create({ email: normalizedEmail });
    return res
      .status(201)
      .json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    // Handle unique index race conditions
    if (err?.code === 11000) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }
    return next(err);
  }
};
