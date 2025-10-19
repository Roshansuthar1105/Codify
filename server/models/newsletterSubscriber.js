import mongoose from "mongoose";

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// Ensure unique index exists even if collection already created
// newsletterSubscriberSchema.index({ email: 1 }, { unique: true }); Commented this because the unique:true already creates a unique field on the email field automatically

const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);

export default NewsletterSubscriber;
