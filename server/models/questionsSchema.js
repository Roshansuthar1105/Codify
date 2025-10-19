import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user ID
      name: { type: String, required: true }, // user name
    },
    title: { type: String, required: true },
    excerpt: { type: String },
    tags: [{ type: String }],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // track who upvoted
    downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // track who downvoted
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // track bookmarks
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }], // store reply IDs
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
