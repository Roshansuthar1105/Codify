import mongoose from "mongoose";

// Contributor Schema
const contributorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  prs: { type: Number, default: 0 },
  contributions: { type: Number, default: 0 },
  avatar: { type: String },
  points: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  profileUrl: { type: String }, // ✅ Added field
});

// Cache Schema
const cacheSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  data: { type: Array, default: [] },
  lastUpdated: { type: Date, default: Date.now },
});

// Export models
export const Contributor = mongoose.model("Contributor", contributorSchema);
export const Cache = mongoose.model("Cache", cacheSchema);
