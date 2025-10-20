import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    term: { type: String, required: true },
    definition: { type: String, required: true },
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Flashcard", flashcardSchema);
