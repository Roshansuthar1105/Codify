import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user ID
      name: { type: String, required: true }, // user name
    },
    text: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
      default: null,
    },
    replyToAuthor: { type: String }, // optional, for showing "in reply to"
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // track who upvoted
    downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // track who downvoted
  },
  { timestamps: true }
);

export default mongoose.model("Reply", ReplySchema);
